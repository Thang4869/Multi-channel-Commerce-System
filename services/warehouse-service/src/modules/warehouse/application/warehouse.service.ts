import { Injectable, Logger } from '@nestjs/common';
import { WarehouseRepository } from '../infrastructure/repositories/warehouse.repository';
import axios from 'axios';

@Injectable()
export class WarehouseService {
  private readonly logger = new Logger(WarehouseService.name);

  constructor(private readonly repo: WarehouseRepository) {}

  async createWarehouse(data: { name: string; location: string; capacity: number; managerId?: string }) {
    return this.repo.createWarehouse({
      ...data,
      currentLoad: 0,
    });
  }

  async listWarehouses(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const warehouses = await this.repo.listWarehouses(skip, limit);
    return { success: true, warehouses, page, limit };
  }

  async getWarehouse(warehouseId: string) {
    const warehouse = await this.repo.findWarehouseById(warehouseId);
    if (!warehouse) {
      return { success: false, reason: 'warehouse_not_found' };
    }
    const transactions = await this.repo.listTransactions(warehouseId);
    const distributions = await this.repo.listDistributions(warehouseId);
    return { success: true, warehouse, transactions, distributions };
  }

  async updateWarehouse(warehouseId: string, data: Partial<{ name: string; location: string; capacity: number; managerId?: string }>) {
    const warehouse = await this.repo.findWarehouseById(warehouseId);
    if (!warehouse) {
      return { success: false, reason: 'warehouse_not_found' };
    }
    const updated = await this.repo.updateWarehouse(warehouseId, data);
    return { success: true, warehouse: updated };
  }

  async recordTransaction(data: { warehouseId: string; productId: string; quantity: number; type: string; referenceId?: string; notes?: string }) {
    const warehouse = await this.repo.findWarehouseById(data.warehouseId);
    if (!warehouse) {
      return { success: false, reason: 'warehouse_not_found' };
    }

    const transaction = await this.repo.createTransaction(data);
    return { success: true, transaction };
  }

  async createDistribution(data: { warehouseId: string; storeId: string; productId: string; quantity: number; estimatedDelivery?: string; notes?: string }) {
    const warehouse = await this.repo.findWarehouseById(data.warehouseId);
    if (!warehouse) {
      return { success: false, reason: 'warehouse_not_found' };
    }

    const distribution = await this.repo.createDistribution({
      ...data,
      status: 'PENDING',
      estimatedDelivery: data.estimatedDelivery ? new Date(data.estimatedDelivery) : null,
    });

    return { success: true, distribution };
  }

  async updateDistributionStatus(distributionId: string, status: string, notes?: string) {
    const distribution = await this.repo.updateDistribution(distributionId, { status, notes, updatedAt: new Date() });
    if (status === 'COMPLETED' || status === 'FAILED') {
      await this.notifyInventory(distribution.warehouseId, distribution.productId, distribution.quantity, status);
    }
    return { success: true, distribution };
  }

  async listDistributions(warehouseId?: string) {
    const distributions = await this.repo.listDistributions(warehouseId);
    return { success: true, distributions };
  }

  private async notifyInventory(warehouseId: string, productId: string, quantity: number, status: string) {
    const url = process.env.INVENTORY_SERVICE_URL;
    if (!url) return;
    try {
      await axios.post(`${url}/internal/warehouse/distribution-callback`, {
        warehouseId,
        productId,
        quantity,
        status,
      });
    } catch (err: any) {
      this.logger.warn(`Failed to notify inventory service: ${err?.message ?? String(err)}`);
    }
  }
}
