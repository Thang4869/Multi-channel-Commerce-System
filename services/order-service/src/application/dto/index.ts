// ============================================
// APPLICATION - ORDER DTOs
// ============================================

import { OrderStatus } from '@commerce/types';

export class CreateOrderItemDto {
  productId!: string;
  quantity!: number;
}

export class CreateOrderDto {
  customerId!: string;
  items!: CreateOrderItemDto[];
  shippingAddress!: string;
  billingAddress?: string;
  notes?: string;
}

export class UpdateOrderStatusDto {
  status!: OrderStatus;
  notes?: string;
}

export class OrderItemResponseDto {
  id!: string;
  orderId!: string;
  productId!: string;
  quantity!: number;
  price!: number;
  subtotal!: number;
}

export class OrderResponseDto {
  id!: string;
  orderNumber!: string;
  customerId!: string;
  shippingAddress!: string;
  billingAddress!: string;
  totalPrice!: number;
  status!: OrderStatus;
  items!: OrderItemResponseDto[];
  notes?: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export class PaginatedOrdersDto {
  items!: OrderResponseDto[];
  total!: number;
  page!: number;
  limit!: number;
  totalPages!: number;
}
