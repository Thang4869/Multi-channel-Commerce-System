import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { WarehouseController } from './interfaces/http/controllers/warehouse.controller';
import { WarehouseRepository } from './infrastructure/repositories/warehouse.repository';
import { WarehouseService } from './application/warehouse.service';

const prismaClient = new PrismaClient();

@Module({
  providers: [
    PrismaClient,
    {
      provide: 'IWarehouseRepository',
      useValue: new WarehouseRepository(prismaClient),
    },
    {
      provide: WarehouseService,
      useFactory: (repo: WarehouseRepository) => new WarehouseService(repo),
      inject: ['IWarehouseRepository'],
    },
  ],
  controllers: [WarehouseController],
})
export class WarehouseModule {}
