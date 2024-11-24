import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  const corsOrigin = process.env.CORS_ORIGIN;
  console.log('CORS_ORIGIN:', corsOrigin);

  app.enableCors({
    origin: corsOrigin,
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
  });
  await app.listen(process.env.PORT || '3000', '0.0.0.0');
}
bootstrap();
