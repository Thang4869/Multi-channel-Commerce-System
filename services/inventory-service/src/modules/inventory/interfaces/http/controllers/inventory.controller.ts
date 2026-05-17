import { Body, Controller, Post } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

import { LockStockDto } from '../../../dtos/lock-stock.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly prisma: PrismaClient) {}

  @Post('lock')
  async lock(@Body() body: LockStockDto) {
    const { orderId, productId, quantity } = body;
    // Simple implementation using prisma transactions
    const prisma: any = this.prisma;

    const lock = await prisma.inventoryLock.create({
      data: {
        orderId,
        productId,
        quantity,
      },
    });

    // Try to find a stock row with enough available and update
    const stock = await prisma.warehouseStock.findFirst({
      where: { productId, available: { gte: quantity } },
    });

    if (!stock) {
      // mark lock as FAILED
      await prisma.inventoryLock.update({ where: { id: lock.id }, data: { status: 'FAILED' } });
      return { success: false, reason: 'insufficient_stock' };
    }

    await prisma.$transaction([
      prisma.warehouseStock.update({
        where: { id: stock.id },
        data: { reserved: { increment: quantity }, available: { decrement: quantity } },
      }),
      prisma.inventoryLock.update({ where: { id: lock.id }, data: { status: 'RESERVED' } }),
      prisma.inventoryTransaction.create({
        data: {
          warehouseId: stock.warehouseId,
          productId,
          quantity,
          type: 'RESERVE',
          referenceId: orderId,
        },
      }),
    ]);

    return { success: true, lockId: lock.id };
  }

  @Post('release')
  async release(@Body() body: { lockId: string }) {
    const prisma: any = this.prisma;
    const lock = await prisma.inventoryLock.findUnique({ where: { id: body.lockId } });
    if (!lock) return { success: false, reason: 'not_found' };
    if (lock.status !== 'RESERVED') return { success: false, reason: 'not_reserved' };

    // Find the stock row to put back
    const stock = await prisma.warehouseStock.findFirst({ where: { productId: lock.productId } });
    if (!stock) return { success: false, reason: 'stock_row_missing' };

    await prisma.$transaction([
      prisma.warehouseStock.update({
        where: { id: stock.id },
        data: { reserved: { decrement: lock.quantity }, available: { increment: lock.quantity } },
      }),
      prisma.inventoryLock.update({ where: { id: lock.id }, data: { status: 'RELEASED', releasedAt: new Date() } }),
      prisma.inventoryTransaction.create({
        data: {
          warehouseId: stock.warehouseId,
          productId: lock.productId,
          quantity: lock.quantity,
          type: 'RELEASE',
          referenceId: lock.orderId,
        },
      }),
    ]);

    return { success: true };
  }
}
