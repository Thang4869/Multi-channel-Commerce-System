import { Injectable, Logger } from '@nestjs/common';
import { DeliveryRepository } from '../infrastructure/repositories/delivery.repository';
import { DeliveryStatus } from '@commerce/types';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DeliveryService {
  private readonly logger = new Logger(DeliveryService.name);

  constructor(private readonly repo: DeliveryRepository) {}

  async createDelivery(orderId: string, destAddress: string, destLat: number, destLng: number, estimatedTime: string, notes?: string) {
    const delivery = await this.repo.createDelivery({
      id: uuidv4(),
      orderId,
      destinationLocation: {
        latitude: destLat,
        longitude: destLng,
        address: destAddress,
      },
      estimatedDeliveryTime: new Date(estimatedTime),
      status: DeliveryStatus.PENDING,
      notes: notes || '',
    });

    await this.repo.createTrackingEntry(delivery.id, {
      lat: destLat,
      lng: destLng,
      address: destAddress,
      status: 'PENDING',
      notes: 'Delivery created',
      timestamp: new Date(),
    });

    return delivery;
  }

  async updateDeliveryStatus(deliveryId: string, newStatus: string, lat?: number, lng?: number, address?: string, notes?: string) {
    const delivery = await this.repo.findDeliveryById(deliveryId);
    if (!delivery) {
      return { success: false, reason: 'delivery_not_found' };
    }

    await this.repo.updateDeliveryStatus(deliveryId, newStatus);

    if (lat !== undefined && lng !== undefined) {
      await this.repo.updateDeliveryLocation(deliveryId, lat, lng, address || '');
    }

    await this.repo.createTrackingEntry(deliveryId, {
      lat: lat ?? delivery.currentLocation?.latitude ?? 0,
      lng: lng ?? delivery.currentLocation?.longitude ?? 0,
      address: address ?? delivery.currentLocation?.address ?? '',
      status: newStatus,
      notes,
      timestamp: new Date(),
    });

    if (newStatus === 'DELIVERED' || newStatus === 'FAILED') {
      await this.notifyOrder(delivery.orderId, deliveryId, newStatus);
    }

    return { success: true, deliveryId, status: newStatus };
  }

  async getDeliveryTracking(deliveryId: string) {
    const delivery = await this.repo.findDeliveryById(deliveryId);
    if (!delivery) {
      return { success: false, reason: 'delivery_not_found' };
    }

    const tracking = await this.repo.getTrackingHistory(deliveryId);
    return { success: true, delivery, tracking };
  }

  async listDeliveries(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const deliveries = await this.repo.listDeliveries(skip, limit);
    return { success: true, deliveries, page, limit };
  }

  private async notifyOrder(orderId: string, deliveryId: string, status: string) {
    const url = process.env.ORDER_SERVICE_URL;
    if (!url) return;
    try {
      await axios.post(`${url}/internal/orders/${orderId}/delivery-callback`, { deliveryId, status });
    } catch (err: any) {
      this.logger.warn(`Failed to notify order: ${err?.message ?? String(err)}`);
    }
  }
}
