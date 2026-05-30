import { Injectable, Logger } from '@nestjs/common';
import { InventoryRepository } from '../infrastructure/repositories/inventory.repository';
import axios from 'axios';

type WarehouseCandidate = {
  id: string;
  warehouseId: string;
  available: number;
};

type InventoryLock = {
  id: string;
  productId: string;
  stockId?: string;
  orderId: string;
  quantity: number;
};

type StoreCandidate = {
  id: string;
  storeId: string;
  available: number;
};

@Injectable()
export class InventoryService {
  private readonly logger = new Logger(InventoryService.name);
  constructor(private readonly repo: InventoryRepository) {}

  async lockStock(orderId: string, productId: string, quantity: number) {
    const lock = await this.repo.createInventoryLock({ orderId, productId, quantity, status: 'PENDING' }) as InventoryLock;

    // Try store first
    const store = await this.repo.findStoreWithAvailable(productId, quantity);
    if (store) {
      await this.repo.reserveFromStore(store.id, quantity);
      await this.repo.updateInventoryLock(lock.id, { status: 'RESERVED' });
      await this.repo.createTransaction({ warehouseId: store.storeId, productId, quantity, type: 'RESERVE', referenceId: orderId });
      await this.notifyOrder(orderId, lock.id, 'RESERVED');
      return { success: true, lockId: lock.id, source: 'STORE', stockId: store.id };
    }

    // Warehouse: pick candidate with max available
    const candidates = (await this.repo.findWarehouseCandidates(productId, quantity)) as WarehouseCandidate[];
    if (!candidates || candidates.length === 0) {
      await this.repo.updateInventoryLock(lock.id, { status: 'FAILED' });
      await this.notifyOrder(orderId, lock.id, 'FAILED');
      return { success: false, reason: 'insufficient_stock' };
    }

    const chosen = candidates.reduce((a, b) => (a.available > b.available ? a : b));
    await this.repo.reserveFromWarehouse(chosen.id, quantity);
    await this.repo.updateInventoryLock(lock.id, { status: 'RESERVED' });
    await this.repo.createTransaction({ warehouseId: chosen.warehouseId, productId, quantity, type: 'RESERVE', referenceId: orderId });
    await this.notifyOrder(orderId, lock.id, 'RESERVED');
    return { success: true, lockId: lock.id, source: 'WAREHOUSE', stockId: chosen.id };
  }

  async releaseLock(lockId: string) {
    let lock: InventoryLock | null = null;
    try {
      lock = await this.repo.updateInventoryLock(lockId, { status: 'RELEASING' }) as InventoryLock;
    } catch (e) {
      // not found or error
      return { success: false, reason: 'not_found' };
    }

    if (!lock) return { success: false, reason: 'not_found' };

    const warehouseCandidates = (await this.repo.findWarehouseCandidates(lock.productId, 0)) as WarehouseCandidate[];
    const stock = warehouseCandidates?.find((s) => s.id === lock.stockId) ?? null;
    if (stock) {
      await this.repo.releaseToWarehouse(stock.id, lock.quantity);
      await this.repo.updateInventoryLock(lockId, { status: 'RELEASED', releasedAt: new Date() });
      await this.repo.createTransaction({ warehouseId: stock.warehouseId, productId: lock.productId, quantity: lock.quantity, type: 'RELEASE', referenceId: lock.orderId });
      await this.notifyOrder(lock.orderId, lockId, 'RELEASED');
      return { success: true };
    }

    const store = (await this.repo.findStoreWithAvailable(lock.productId, 0)) as StoreCandidate | null;
    if (store) {
      await this.repo.releaseToStore(store.id, lock.quantity);
      await this.repo.updateInventoryLock(lockId, { status: 'RELEASED', releasedAt: new Date() });
      await this.repo.createTransaction({ warehouseId: store.storeId, productId: lock.productId, quantity: lock.quantity, type: 'RELEASE', referenceId: lock.orderId });
      await this.notifyOrder(lock.orderId, lockId, 'RELEASED');
      return { success: true };
    }

    await this.repo.updateInventoryLock(lockId, { status: 'RELEASED', releasedAt: new Date() });
    await this.notifyOrder(lock.orderId, lockId, 'RELEASED');
    return { success: true };
  }

  private async notifyOrder(orderId: string, lockId: string, status: string) {
    const url = process.env.ORDER_SERVICE_URL;
    if (!url) return;
    try {
      await axios.post(`${url}/internal/orders/${orderId}/inventory-callback`, { lockId, status });
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.logger.warn(`Failed to notify: ${err.message}`);
      } else {
        this.logger.warn(`Failed to notify: ${String(err)}`);
      }
    }
  }
}
