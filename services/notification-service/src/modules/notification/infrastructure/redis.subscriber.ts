import { OnModuleInit, Injectable, Logger } from '@nestjs/common';
import { createClient } from 'redis';
import { NotificationService } from '../application/notification.service';

@Injectable()
export class RedisSubscriber implements OnModuleInit {
  private client: ReturnType<typeof createClient> | null = null;
  private readonly logger = new Logger(RedisSubscriber.name);

  constructor(private readonly notificationService: NotificationService) {}

  async onModuleInit() {
    const url = process.env.REDIS_URL || 'redis://redis:6379';
    this.client = createClient({ url });
    this.client.on('error', (err) => this.logger.error('Redis Client Error', err));
    await this.client.connect();

    // Subscribe to a generic events channel. Expected payload: { type: 'delivery_status', userId, title, message, data }
    const subscriber = this.client.duplicate();
    await subscriber.connect();
    await subscriber.subscribe('events', async (message) => {
      try {
        const payload = JSON.parse(message);
        if (payload && payload.userId) {
          await this.notificationService.create({
            userId: payload.userId,
            type: payload.type || 'event',
            title: payload.title || 'Notification',
            message: payload.message || JSON.stringify(payload.data || {}),
            data: payload.data || null,
          });
          this.logger.log(`Notification created for user=${payload.userId}`);
        }
      } catch (err) {
        this.logger.error('Failed to handle event message', err as Error);
      }
    });
  }
}
