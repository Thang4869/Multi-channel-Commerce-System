// ============================================
// INFRASTRUCTURE - ORDER REPOSITORY
// ============================================

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Order, OrderItem } from '../../domain/entities/order.entity';
import { IOrderRepository } from '../../application/interfaces';
import { OrderStatus } from '@commerce/types';
import { v4 as uuid } from 'uuid';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(order: Order): Promise<Order> {
    const created = await this.prisma.order.create({
      data: {
        id: order.id,
        orderNumber: order.orderNumber,
        customerId: order.customerId,
        shippingAddress: order.shippingAddress,
        billingAddress: order.billingAddress,
        totalPrice: order.totalPrice,
        status: order.status,
        notes: order.notes,
        items: {
          create: order.items.map(item => ({
            id: item.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.subtotal,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return this.mapToEntity(created);
  }

  async findById(orderId: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true,
      },
    });

    return order ? this.mapToEntity(order) : null;
  }

  async findByOrderNumber(orderNumber: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: { orderNumber },
      include: {
        items: true,
      },
    });

    return order ? this.mapToEntity(order) : null;
  }

  async findByCustomerId(
    customerId: string,
    page: number,
    limit: number,
  ): Promise<{ items: Order[]; total: number }> {
    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where: { customerId },
        include: { items: true },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.order.count({ where: { customerId } }),
    ]);

    return {
      items: orders.map((o: any) => this.mapToEntity(o)),
      total,
    };
  }

  async findAll(
    page: number,
    limit: number,
    status?: OrderStatus,
  ): Promise<{ items: Order[]; total: number }> {
    const where = status ? { status } : {};

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        include: { items: true },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.order.count({ where }),
    ]);

    return {
      items: orders.map((o: any) => this.mapToEntity(o)),
      total,
    };
  }

  async update(orderId: string, data: Partial<Order>): Promise<Order> {
    const updated = await this.prisma.order.update({
      where: { id: orderId },
      data,
      include: { items: true },
    });

    return this.mapToEntity(updated);
  }

  async updateStatus(orderId: string, status: OrderStatus): Promise<Order> {
    const updated = await this.prisma.order.update({
      where: { id: orderId },
      data: { status },
      include: { items: true },
    });

    return this.mapToEntity(updated);
  }

  async delete(orderId: string): Promise<void> {
    await this.prisma.order.delete({
      where: { id: orderId },
    });
  }

  private mapToEntity(data: any): Order {
    const order = new Order({
      id: data.id,
      orderNumber: data.orderNumber,
      customerId: data.customerId,
      shippingAddress: data.shippingAddress,
      billingAddress: data.billingAddress,
      totalPrice: Number(data.totalPrice),
      status: data.status as OrderStatus,
      notes: data.notes,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });

    if (data.items && Array.isArray(data.items)) {
      order.items = data.items.map((item: any) =>
        new OrderItem({
          id: item.id,
          orderId: item.orderId,
          productId: item.productId,
          quantity: item.quantity,
          price: Number(item.price),
          subtotal: Number(item.subtotal),
        })
      );
    }

    return order;
  }
}
