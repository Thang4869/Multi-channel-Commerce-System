// ============================================
// APPLICATION - INTERFACES
// ============================================

import { Order, OrderItem } from '../../domain/entities/order.entity';
import { OrderStatus } from '@commerce/types';

export interface IOrderRepository {
  create(order: Order): Promise<Order>;
  findById(orderId: string): Promise<Order | null>;
  findByOrderNumber(orderNumber: string): Promise<Order | null>;
  findByCustomerId(customerId: string, page: number, limit: number): Promise<{ items: Order[]; total: number }>;
  update(orderId: string, data: Partial<Order>): Promise<Order>;
  updateStatus(orderId: string, status: OrderStatus): Promise<Order>;
  delete(orderId: string): Promise<void>;
  findAll(page: number, limit: number, status?: OrderStatus): Promise<{ items: Order[]; total: number }>;
}

export interface IInventoryService {
  checkAvailability(productId: string, quantity: number): Promise<boolean>;
  reserveStock(productId: string, quantity: number): Promise<void>;
  releaseStock(productId: string, quantity: number): Promise<void>;
  confirmStock(productId: string, quantity: number): Promise<void>;
}

export interface INotificationService {
  sendOrderCreated(orderId: string, customerId: string): Promise<void>;
  sendOrderConfirmed(orderId: string, customerId: string): Promise<void>;
  sendOrderShipped(orderId: string, customerId: string): Promise<void>;
  sendOrderDelivered(orderId: string, customerId: string): Promise<void>;
  sendOrderCancelled(orderId: string, customerId: string): Promise<void>;
}

export interface IOrderService {
  createOrder(dto: any): Promise<Order>;
  getOrder(orderId: string): Promise<Order>;
  updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order>;
  cancelOrder(orderId: string): Promise<Order>;
  getCustomerOrders(customerId: string, page: number, limit: number): Promise<any>;
}
