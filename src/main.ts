import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config();
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: '*',
  });
  app.use(cookieParser());

  await app.listen(8080);
}
bootstrap();
