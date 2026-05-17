import { NestFactory } from '@nestjs/core';
import { InventoryModule } from './modules/inventory/inventory.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(InventoryModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const port = process.env.PORT || 4003;
  await app.listen(port);
  console.log(`Inventory service listening on ${port}`);
}

bootstrap();
