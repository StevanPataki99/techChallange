import * as dotenv from 'dotenv';
dotenv.config(); // must be executed before any other imports

import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import appConfig from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  app.connectMicroservice({
    transport: Transport.TCP,
    options: { host: appConfig.baseUrl, port: appConfig.port },
  });

  await app.startAllMicroservices();
  await app.listen(appConfig.port);
}
bootstrap();
