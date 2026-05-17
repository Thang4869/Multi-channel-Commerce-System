// This test uses a real Redis instance. Ensure CI starts a Redis service.
jest.unmock('redis');

import { createClient } from 'redis';
import { RedisEventBusService } from '../infrastructure/events/redis-event-bus.service';

describe('RedisEventBusService integration (real redis)', () => {
  let pub: any;
  let bus: RedisEventBusService;
  const mockInventoryService: any = {
    lockStock: jest.fn(async (orderId: string, productId: string, quantity: number) => ({ success: true, lockId: 'lock-real', source: 'WAREHOUSE' })),
  };

  beforeAll(async () => {
    process.env.NODE_ENV = 'ci';
    process.env.REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

    // create publisher client
    pub = createClient({ url: process.env.REDIS_URL });
    await pub.connect();

    bus = new RedisEventBusService(mockInventoryService as any);
    await bus.onModuleInit();
  }, 20000);

  afterAll(async () => {
    await pub.disconnect();
    await bus.onModuleDestroy();
  });

  it('processes order.created and calls inventory.lockStock', async () => {
    await pub.publish('order.created', JSON.stringify({ orderId: 'o-real', productId: 'p-real', quantity: 1 }));
    // wait for handler
    await new Promise((r) => setTimeout(r, 200));
    expect(mockInventoryService.lockStock).toHaveBeenCalledWith('o-real', 'p-real', 1);
  }, 10000);
});
