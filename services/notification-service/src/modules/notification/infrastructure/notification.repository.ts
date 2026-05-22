import { PrismaClient } from '@prisma/client';
import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { UpdateNotificationDto } from '../dtos/update-notification.dto';

const prisma = new PrismaClient();

export class NotificationRepository {
  async create(dto: CreateNotificationDto) {
    return prisma.notification.create({ data: {
      userId: dto.userId,
      type: dto.type,
      title: dto.title,
      message: dto.message,
      data: (dto.data as any) ?? null,
    }});
  }

  async findByUser(userId: string) {
    return prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  }

  async update(id: string, dto: UpdateNotificationDto) {
    return prisma.notification.update({ where: { id }, data: dto });
  }
}
