import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { setupSwagger } from '../swagger';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: '*',
  });
  app.use(cookieParser());

  app.setGlobalPrefix('api');

  setupSwagger(app);

  await app.listen(8080);
}
bootstrap();
