import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DeliveryRepository {
  constructor(private readonly prisma: any) {}

  async createDelivery(data: any) {
    return this.prisma.delivery.create({
      data,
    });
  }

  async findDeliveryById(id: string) {
    return this.prisma.delivery.findUnique({
      where: { id },
      include: { tracking: true },
    });
  }

  async findDeliveryByOrderId(orderId: string) {
    return this.prisma.delivery.findUnique({
      where: { orderId },
      include: { tracking: true },
    });
  }

  async updateDeliveryStatus(deliveryId: string, status: string) {
    return this.prisma.delivery.update({
      where: { id: deliveryId },
      data: { status, updatedAt: new Date() },
    });
  }

  async updateDeliveryLocation(deliveryId: string, latitude: number, longitude: number, address: string) {
    return this.prisma.delivery.update({
      where: { id: deliveryId },
      data: {
        currentLocationLat: latitude,
        currentLocationLng: longitude,
        currentLocationAddress: address,
        updatedAt: new Date(),
      },
    });
  }

  async createTrackingEntry(deliveryId: string, data: any) {
    return this.prisma.deliveryTracking.create({
      data: {
        deliveryId,
        ...data,
      },
    });
  }

  async getTrackingHistory(deliveryId: string) {
    return this.prisma.deliveryTracking.findMany({
      where: { deliveryId },
      orderBy: { timestamp: 'desc' },
    });
  }

  async listDeliveries(skip: number = 0, take: number = 10) {
    return this.prisma.delivery.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });
  }
}
