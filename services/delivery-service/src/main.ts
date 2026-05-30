import { NestFactory } from '@nestjs/core';
import { DeliveryModule } from './modules/delivery/delivery.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(DeliveryModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const port = process.env.PORT || 3005;
  await app.listen(port);
  console.log(`Delivery service listening on ${port}`);
}

void bootstrap();
