import { Module } from '@nestjs/common';
import { InventoryController } from './interfaces/http/controllers/inventory.controller';
import { InventoryRepository } from './infrastructure/repositories/inventory.repository';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

@Module({
  providers: [
    PrismaClient,
    {
      provide: 'IInventoryRepository',
      useValue: new InventoryRepository(prismaClient),
    },
  ],
  controllers: [InventoryController],
})
export class InventoryModule {}
