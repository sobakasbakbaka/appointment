import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const { email, password } = req.body;
    const { access_token } = await this.authService.login(email, password);

    res.cookie('authToken', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
      sameSite: 'strict',
    });

    return res.status(200).json({ message: 'Logged in successfully' });
  }

  @Post('register')
  async register(
    @Body() { email, password }: { email: string; password: string },
  ) {
    const { access_token } = await this.authService.register(email, password);
    return {
      message: 'User registered successfully',
      access_token,
    };
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('authToken');
    return res.status(200).json({ message: 'Logged out successfully' });
  }

  @Post('check-auth')
  async checkAuth(@Req() req: Request, @Res() res: Response) {
    const token = req.cookies['authToken'];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = await this.authService.verifyToken(token);
      return res.status(200).json({ message: 'Authorized', user: decoded });
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}
