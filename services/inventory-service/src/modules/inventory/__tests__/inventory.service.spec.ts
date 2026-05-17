import { InventoryService } from '../application/inventory.service';

describe('InventoryService (unit)', () => {
  const mockRepo: any = {
    createInventoryLock: jest.fn(async (d) => ({ id: 'lock123', ...d })),
    findStoreWithAvailable: jest.fn(),
    reserveFromStore: jest.fn(),
    findWarehouseCandidates: jest.fn(),
    reserveFromWarehouse: jest.fn(),
    updateInventoryLock: jest.fn(),
    createTransaction: jest.fn(),
  };

  const service = new InventoryService(mockRepo);

  beforeEach(() => jest.clearAllMocks());

  it('should reserve from store when available', async () => {
    mockRepo.findStoreWithAvailable.mockResolvedValue({ id: 'store1', storeId: 's1' });
    const res = await service.lockStock('order1', 'prod1', 2);
    expect(res.success).toBe(true);
    expect(res.source).toBe('STORE');
    expect(mockRepo.reserveFromStore).toHaveBeenCalledWith('store1', 2);
  });

  it('should reserve from warehouse when store unavailable', async () => {
    mockRepo.findStoreWithAvailable.mockResolvedValue(null);
    mockRepo.findWarehouseCandidates.mockResolvedValue([{ id: 'w1', warehouseId: 'w1', available: 10 }]);
    const res = await service.lockStock('order2', 'prod2', 3);
    expect(res.success).toBe(true);
    expect(res.source).toBe('WAREHOUSE');
    expect(mockRepo.reserveFromWarehouse).toHaveBeenCalledWith('w1', 3);
  });

  it('should fail when no stock available', async () => {
    mockRepo.findStoreWithAvailable.mockResolvedValue(null);
    mockRepo.findWarehouseCandidates.mockResolvedValue([]);
    const res = await service.lockStock('order3', 'prod3', 5);
    expect(res.success).toBe(false);
    expect(res.reason).toBe('insufficient_stock');
  });
});
