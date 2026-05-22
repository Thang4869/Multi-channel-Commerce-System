import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './modules/notification/notification.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const port = process.env.PORT || 3008;
  await app.listen(port);
  console.log(`Notification service listening on ${port}`);
}

bootstrap();
