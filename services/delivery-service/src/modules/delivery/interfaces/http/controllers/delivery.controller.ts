import { Controller, Post, Get, Put, Body, Param, Query } from '@nestjs/common';
import { DeliveryService } from '../../application/delivery.service';
import { CreateDeliveryDto } from '../../dtos/create-delivery.dto';
import { UpdateDeliveryStatusDto } from '../../dtos/update-delivery-status.dto';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post('create')
  async createDelivery(@Body() dto: CreateDeliveryDto) {
    return this.deliveryService.createDelivery(
      dto.orderId,
      dto.destLocationAddress,
      Number(dto.destLocationLat),
      Number(dto.destLocationLng),
      dto.estimatedDeliveryTime,
      dto.notes,
    );
  }

  @Put('status')
  async updateStatus(@Body() dto: UpdateDeliveryStatusDto) {
    return this.deliveryService.updateDeliveryStatus(
      dto.deliveryId,
      dto.status,
      dto.latitude ? Number(dto.latitude) : undefined,
      dto.longitude ? Number(dto.longitude) : undefined,
      dto.address,
      dto.notes,
    );
  }

  @Get('track/:deliveryId')
  async trackDelivery(@Param('deliveryId') deliveryId: string) {
    return this.deliveryService.getDeliveryTracking(deliveryId);
  }

  @Get('list')
  async listDeliveries(@Query('page') page: string = '1', @Query('limit') limit: string = '10') {
    return this.deliveryService.listDeliveries(Number(page), Number(limit));
  }
}
