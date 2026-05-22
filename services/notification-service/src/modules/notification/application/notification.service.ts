import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../infrastructure/notification.repository';
import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { UpdateNotificationDto } from '../dtos/update-notification.dto';

@Injectable()
export class NotificationService {
  constructor(private readonly repo: NotificationRepository) {}

  async create(dto: CreateNotificationDto) {
    return this.repo.create(dto);
  }

  async findByUser(userId: string) {
    return this.repo.findByUser(userId);
  }

  async update(id: string, dto: UpdateNotificationDto) {
    return this.repo.update(id, dto);
  }
}
