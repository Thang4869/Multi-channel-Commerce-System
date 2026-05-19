import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { WarehouseModule } from './modules/warehouse/warehouse.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(WarehouseModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const port = process.env.PORT || 3006;
  await app.listen(port);
  console.log(`Warehouse service listening on ${port}`);
}

bootstrap();
