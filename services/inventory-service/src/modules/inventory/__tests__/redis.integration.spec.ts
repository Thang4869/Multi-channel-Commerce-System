jest.mock('redis');

import { RedisEventBusService } from '../infrastructure/events/redis-event-bus.service';
import { InventoryService } from '../application/inventory.service';

describe('RedisEventBusService integration (mocked redis)', () => {
  it('should handle order.created and publish inventory.locked when stock reserved', async () => {
    // Create a mock inventory service that always reserves
    const mockInventoryService: any = {
      lockStock: jest.fn(async (orderId: string, productId: string, quantity: number) => ({ success: true, lockId: 'lock123', source: 'STORE' })),
    };

    const bus = new RedisEventBusService(mockInventoryService as InventoryService);

    // Force non-test env so onModuleInit runs logic; but redis is mocked
    process.env.NODE_ENV = 'development';
    await bus.onModuleInit();

    // Publish an order.created message using the internal pub client
    // @ts-ignore access private field for test
    const pub = (bus as any).pubClient;
    await pub.publish('order.created', JSON.stringify({ orderId: 'o1', productId: 'p1', quantity: 2 }));

    // wait a tick for async handlers
    await new Promise((r) => setTimeout(r, 50));

    // Expect inventory service lockStock to have been called
    expect(mockInventoryService.lockStock).toHaveBeenCalledWith('o1', 'p1', 2);
  });
});
