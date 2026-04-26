import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Order, OrderItem } from '../../domain/entities/order.entity';
import { IOrderRepository, IInventoryService, INotificationService } from '../interfaces';
import { OrderStatus } from '@commerce/types';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UpdateOrderStatusUseCase {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly notificationService: INotificationService,
  ) {}

  async execute(orderId: string, newStatus: OrderStatus): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Validate status transition
    this.validateStatusTransition(order.status, newStatus);

    const updatedOrder = await this.orderRepository.updateStatus(orderId, newStatus);

    // Send notifications based on status
    if (newStatus === OrderStatus.SHIPPED) {
      await this.notificationService.sendOrderShipped(orderId, order.customerId);
    } else if (newStatus === OrderStatus.DELIVERED) {
      await this.notificationService.sendOrderDelivered(orderId, order.customerId);
    }

    return updatedOrder;
  }

  private validateStatusTransition(currentStatus: OrderStatus, newStatus: OrderStatus): void {
    const validTransitions: Record<OrderStatus, OrderStatus[]> = {
      [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
      [OrderStatus.CONFIRMED]: [OrderStatus.SHIPPED, OrderStatus.CANCELLED],
      [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED],
      [OrderStatus.DELIVERED]: [],
      [OrderStatus.CANCELLED]: [],
    };

    if (!validTransitions[currentStatus].includes(newStatus)) {
      throw new BadRequestException(
        `Cannot transition from ${currentStatus} to ${newStatus}`,
      );
    }
  }
}
