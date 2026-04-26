import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Order, OrderItem } from '../../domain/entities/order.entity';
import { IOrderRepository, IInventoryService, INotificationService } from '../interfaces';
import { OrderStatus } from '@commerce/types';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly inventoryService: IInventoryService,
    private readonly notificationService: INotificationService,
  ) {}

  async execute(
    customerId: string,
    items: Array<{ productId: string; quantity: number; price: number }>,
    shippingAddress: string,
    billingAddress?: string,
    notes?: string,
  ): Promise<Order> {
    // Validate all items have stock
    for (const item of items) {
      const available = await this.inventoryService.checkAvailability(item.productId, item.quantity);
      if (!available) {
        throw new BadRequestException(`Product ${item.productId} is not available`);
      }
    }

    // Reserve stock for all items
    for (const item of items) {
      await this.inventoryService.reserveStock(item.productId, item.quantity);
    }

    try {
      // Create order
      const order = new Order({
        id: uuid(),
        orderNumber: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        customerId,
        shippingAddress,
        billingAddress: billingAddress || shippingAddress,
        status: OrderStatus.PENDING,
        notes,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Add items to order
      for (const item of items) {
        const orderItem = new OrderItem({
          id: uuid(),
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.quantity * item.price,
        });
        order.addItem(orderItem);
      }

      order.totalPrice = order.calculateTotal();

      // Save order
      const savedOrder = await this.orderRepository.create(order);

      // Send notification
      await this.notificationService.sendOrderCreated(savedOrder.id, customerId);

      return savedOrder;
    } catch (error) {
      // Release reserved stock
      for (const item of items) {
        await this.inventoryService.releaseStock(item.productId, item.quantity);
      }
      throw error;
    }
  }
}
