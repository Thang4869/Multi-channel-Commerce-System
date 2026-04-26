// ============================================
// DOMAIN - ORDER ENTITIES
// ============================================

import { OrderStatus } from '@commerce/types';

export class OrderItem {
  id!: string;
  orderId!: string;
  productId!: string;
  quantity!: number;
  price!: number;
  subtotal!: number;

  constructor(data: Partial<OrderItem>) {
    Object.assign(this, data);
  }

  calculateSubtotal(): number {
    return this.quantity * this.price;
  }
}

export class Order {
  id!: string;
  orderNumber!: string;
  customerId!: string;
  shippingAddress!: string;
  billingAddress!: string;
  totalPrice!: number;
  status!: OrderStatus;
  items: OrderItem[] = [];
  notes?: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(data: Partial<Order>) {
    Object.assign(this, data);
  }

  calculateTotal(): number {
    return this.items.reduce((sum, item) => sum + item.subtotal, 0);
  }

  addItem(item: OrderItem): void {
    this.items.push(item);
  }

  removeItem(itemId: string): void {
    this.items = this.items.filter(i => i.id !== itemId);
  }

  canCancel(): boolean {
    return [OrderStatus.PENDING, OrderStatus.CONFIRMED].includes(this.status);
  }

  canShip(): boolean {
    return this.status === OrderStatus.CONFIRMED;
  }

  canDeliver(): boolean {
    return this.status === OrderStatus.SHIPPED;
  }
}
