import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { NotificationService } from '../application/notification.service';
import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { UpdateNotificationDto } from '../dtos/update-notification.dto';

@Controller('api/notifications')
export class NotificationController {
  constructor(private readonly service: NotificationService) {}

  @Post()
  async create(@Body() dto: CreateNotificationDto) {
    return this.service.create(dto);
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string) {
    return this.service.findByUser(userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateNotificationDto) {
    return this.service.update(id, dto);
  }
}
