import { OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { InventoryService } from '../../application/inventory.service';

export class RedisEventBusService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisEventBusService.name);
  private pubClient: RedisClientType | null = null;
  private subClient: RedisClientType | null = null;

  constructor(private readonly inventoryService: InventoryService) {}

  async onModuleInit() {
    if (process.env.NODE_ENV === 'test') {
      this.logger.log('Skipping Redis connections in test environment');
      return;
    }

    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    this.pubClient = createClient({ url: redisUrl });
    this.subClient = this.pubClient.duplicate();

    this.pubClient.on('error', (err) => this.logger.error('Redis pub error: ' + err));
    this.subClient.on('error', (err) => this.logger.error('Redis sub error: ' + err));

    await this.pubClient.connect();
    await this.subClient.connect();

    await this.subClient.subscribe('order.created', async (message) => {
      try {
        const payload = JSON.parse(message);
        const { orderId, productId, quantity } = payload;
        this.logger.log(`Received order.created event for order ${orderId}`);
        const result = await this.inventoryService.lockStock(orderId, productId, quantity);
        if (result && result.success) {
          await this.publish('inventory.locked', JSON.stringify({ orderId, lockId: result.lockId, source: result.source }));
        } else {
          await this.publish('inventory.failed', JSON.stringify({ orderId, reason: result?.reason || 'unknown' }));
        }
      } catch (err: any) {
        this.logger.error('Failed handling order.created event: ' + err?.message);
      }
    });

    this.logger.log('Subscribed to order.created channel');
  }

  async publish(channel: string, message: string) {
    if (!this.pubClient) return;
    try {
      await this.pubClient.publish(channel, message);
    } catch (err: any) {
      this.logger.warn(`Failed to publish ${channel}: ${err?.message}`);
    }
  }

  async onModuleDestroy() {
    try {
      await this.subClient?.disconnect();
      await this.pubClient?.disconnect();
    } catch (err) {
      // ignore
    }
  }
}
