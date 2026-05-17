import { PrismaClient } from '@prisma/client';

export class InventoryRepository {
  constructor(private prisma: PrismaClient) {}

  async reserveFromWarehouse(productId: string, quantity: number) {
    const stock = await this.prisma.warehouseStock.findFirst({ where: { productId, available: { gte: quantity } } });
    if (!stock) return null;
    await this.prisma.warehouseStock.update({ where: { id: stock.id }, data: { reserved: { increment: quantity }, available: { decrement: quantity } } });
    return stock;
  }

  async releaseToWarehouse(stockId: string, productId: string, quantity: number) {
    await this.prisma.warehouseStock.update({ where: { id: stockId }, data: { reserved: { decrement: quantity }, available: { increment: quantity } } });
  }
}
