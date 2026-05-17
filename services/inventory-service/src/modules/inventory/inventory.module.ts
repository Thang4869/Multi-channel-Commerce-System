import { Module } from '@nestjs/common';
import { InventoryController } from './interfaces/http/controllers/inventory.controller';
import { InventoryRepository } from './infrastructure/repositories/inventory.repository';
import { PrismaClient } from '@prisma/client';
import { InventoryService } from './application/inventory.service';
import { RedisEventBusService } from './infrastructure/events/redis-event-bus.service';

const prismaClient = new PrismaClient();

@Module({
  providers: [
    PrismaClient,
    {
      provide: 'IInventoryRepository',
      useValue: new InventoryRepository(prismaClient),
    },
    {
      provide: InventoryService,
      useFactory: (repo: InventoryRepository) => new InventoryService(repo),
      inject: ['IInventoryRepository'],
    },
    {
      provide: RedisEventBusService,
      useFactory: (svc: InventoryService) => new RedisEventBusService(svc),
      inject: [InventoryService],
    },
  ],
  controllers: [InventoryController],
})
export class InventoryModule {}
