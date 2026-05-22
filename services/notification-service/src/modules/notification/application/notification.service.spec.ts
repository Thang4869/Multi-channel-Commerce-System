import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  it('forwards create calls to the repository', async () => {
    const repo = {
      create: jest.fn().mockResolvedValue({ id: 'ntf_1' }),
      findByUser: jest.fn(),
      update: jest.fn(),
    } as never;

    const service = new NotificationService(repo);
    const payload = {
      userId: 'user_1',
      type: 'delivery_status',
      title: 'Delivery updated',
      message: 'Your package is out for delivery',
    };

    await expect(service.create(payload)).resolves.toEqual({ id: 'ntf_1' });
    expect((repo as { create: jest.Mock }).create).toHaveBeenCalledWith(payload);
  });

  it('forwards findByUser calls to the repository', async () => {
    const repo = {
      create: jest.fn(),
      findByUser: jest.fn().mockResolvedValue([{ id: 'ntf_2' }]),
      update: jest.fn(),
    } as never;

    const service = new NotificationService(repo);

    await expect(service.findByUser('user_1')).resolves.toEqual([{ id: 'ntf_2' }]);
    expect((repo as { findByUser: jest.Mock }).findByUser).toHaveBeenCalledWith('user_1');
  });
});
