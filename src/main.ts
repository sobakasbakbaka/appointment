import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    methods: 'GET,HEAD,PUT,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type, Authorization'],
    credentials: true,
  });
  await app.listen(process.env.PORT || '0.0.0.0');
}
bootstrap();
