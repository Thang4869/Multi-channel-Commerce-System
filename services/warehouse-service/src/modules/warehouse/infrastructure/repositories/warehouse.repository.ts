import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class WarehouseRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createWarehouse(data: any) {
    return this.prisma.warehouse.create({ data });
  }

  async findWarehouseById(id: string) {
    return this.prisma.warehouse.findUnique({ where: { id } });
  }

  async listWarehouses(skip: number = 0, take: number = 10) {
    return this.prisma.warehouse.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateWarehouse(id: string, data: any) {
    return this.prisma.warehouse.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  async createTransaction(data: any) {
    return this.prisma.warehouseTransaction.create({ data });
  }

  async listTransactions(warehouseId: string) {
    return this.prisma.warehouseTransaction.findMany({
      where: { warehouseId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createDistribution(data: any) {
    return this.prisma.warehouseDistribution.create({ data });
  }

  async updateDistribution(id: string, data: any) {
    return this.prisma.warehouseDistribution.update({
      where: { id },
      data,
    });
  }

  async listDistributions(warehouseId?: string) {
    return this.prisma.warehouseDistribution.findMany({
      where: warehouseId ? { warehouseId } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }
}
