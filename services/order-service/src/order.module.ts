// ============================================
// ORDER SERVICE MODULE
// ============================================

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { OrderController } from './interfaces/http/controllers/order.controller';
import { JwtStrategy } from './interfaces/http/strategies/jwt.strategy';
import {
  CreateOrderUseCase,
  ConfirmOrderUseCase,
  CancelOrderUseCase,
  UpdateOrderStatusUseCase,
} from './application/use-cases';
import { OrderRepository } from './infrastructure/repositories/order.repository';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
    }),
    PassportModule,
  ],
  providers: [
    PrismaClient,
    {
      provide: 'IOrderRepository',
      useValue: new OrderRepository(prismaClient),
    },
    {
      provide: 'IInventoryService',
      useValue: {
        checkAvailability: async () => true,
        reserveStock: async () => {},
        releaseStock: async () => {},
        confirmStock: async () => {},
      },
    },
    {
      provide: 'INotificationService',
      useValue: {
        sendOrderCreated: async () => {},
        sendOrderConfirmed: async () => {},
        sendOrderShipped: async () => {},
        sendOrderDelivered: async () => {},
        sendOrderCancelled: async () => {},
      },
    },
    CreateOrderUseCase,
    ConfirmOrderUseCase,
    CancelOrderUseCase,
    UpdateOrderStatusUseCase,
    JwtStrategy,
  ],
  controllers: [OrderController],
})
export class OrderModule {}
