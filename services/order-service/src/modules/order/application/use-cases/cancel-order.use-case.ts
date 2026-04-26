import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Order, OrderItem } from '../../domain/entities/order.entity';
import { IOrderRepository, IInventoryService, INotificationService } from '../interfaces';
import { OrderStatus } from '@commerce/types';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CancelOrderUseCase {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly inventoryService: IInventoryService,
    private readonly notificationService: INotificationService,
  ) {}

  async execute(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (!order.canCancel()) {
      throw new BadRequestException('Order cannot be cancelled');
    }

    // Release reserved stock
    for (const item of order.items) {
      await this.inventoryService.releaseStock(item.productId, item.quantity);
    }

    const updatedOrder = await this.orderRepository.updateStatus(orderId, OrderStatus.CANCELLED);

    // Send notification
    await this.notificationService.sendOrderCancelled(orderId, order.customerId);

    return updatedOrder;
  }
}
