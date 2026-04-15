// ============================================
// APPLICATION - USE CASES
// ============================================

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

@Injectable()
export class ConfirmOrderUseCase {
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

    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException('Only pending orders can be confirmed');
    }

    // Confirm stock for all items
    for (const item of order.items) {
      await this.inventoryService.confirmStock(item.productId, item.quantity);
    }

    const updatedOrder = await this.orderRepository.updateStatus(orderId, OrderStatus.CONFIRMED);

    // Send notification
    await this.notificationService.sendOrderConfirmed(orderId, order.customerId);

    return updatedOrder;
  }
}

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
