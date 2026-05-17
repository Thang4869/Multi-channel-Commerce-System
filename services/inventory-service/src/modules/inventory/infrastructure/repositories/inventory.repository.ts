import { PrismaClient } from '@prisma/client';

export class InventoryRepository {
  constructor(private prisma: PrismaClient) {}

  async findStoreWithAvailable(productId: string, quantity: number) {
    return this.prisma.storeStock.findFirst({ where: { productId, available: { gte: quantity } } });
  }

  async reserveFromStore(stockId: string, quantity: number) {
    return this.prisma.storeStock.update({ where: { id: stockId }, data: { reserved: { increment: quantity }, available: { decrement: quantity } } });
  }

  async releaseToStore(stockId: string, quantity: number) {
    return this.prisma.storeStock.update({ where: { id: stockId }, data: { reserved: { decrement: quantity }, available: { increment: quantity } } });
  }

  async findWarehouseCandidates(productId: string, quantity: number) {
    return this.prisma.warehouseStock.findMany({ where: { productId, available: { gte: quantity } } });
  }

  async reserveFromWarehouse(stockId: string, quantity: number) {
    return this.prisma.warehouseStock.update({ where: { id: stockId }, data: { reserved: { increment: quantity }, available: { decrement: quantity } } });
  }

  async releaseToWarehouse(stockId: string, quantity: number) {
    return this.prisma.warehouseStock.update({ where: { id: stockId }, data: { reserved: { decrement: quantity }, available: { increment: quantity } } });
  }

  async createInventoryLock(data: { orderId: string; productId: string; quantity: number; status?: string }) {
    return this.prisma.inventoryLock.create({ data });
  }

  async updateInventoryLock(id: string, data: any) {
    return this.prisma.inventoryLock.update({ where: { id }, data });
  }

  async createTransaction(data: any) {
    return this.prisma.inventoryTransaction.create({ data });
  }
}
