import { Module } from '@nestjs/common';
import { DeliveryController } from './interfaces/http/controllers/delivery.controller';
import { DeliveryRepository } from './infrastructure/repositories/delivery.repository';
import { DeliveryService } from './application/delivery.service';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

@Module({
  providers: [
    PrismaClient,
    {
      provide: 'IDeliveryRepository',
      useValue: new DeliveryRepository(prismaClient),
    },
    {
      provide: DeliveryService,
      useFactory: (repo: DeliveryRepository) => new DeliveryService(repo),
      inject: ['IDeliveryRepository'],
    },
  ],
  controllers: [DeliveryController],
})
export class DeliveryModule {}
