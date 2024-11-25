import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ClientModule } from './client/client.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { MasterController } from './master/master.controller';
import { MasterModule } from './master/master.module';

@Module({
  imports: [PrismaModule, ClientModule, AuthModule, MasterModule],
  controllers: [AppController, AuthController, MasterController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
