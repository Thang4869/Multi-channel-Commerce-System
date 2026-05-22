import { Module } from '@nestjs/common';
import { NotificationController } from './interfaces/notification.controller';
import { NotificationService } from './application/notification.service';
import { NotificationRepository } from './infrastructure/notification.repository';
import { RedisSubscriber } from './infrastructure/redis.subscriber';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, NotificationRepository, RedisSubscriber],
  exports: [NotificationService],
})
export class NotificationModule {}
