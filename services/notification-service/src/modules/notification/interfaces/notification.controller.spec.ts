import { NotificationController } from './notification.controller';

describe('NotificationController', () => {
  it('delegates create to the service', async () => {
    const service = {
      create: jest.fn().mockResolvedValue({ id: 'ntf_1' }),
      findByUser: jest.fn(),
      update: jest.fn(),
    } as never;

    const controller = new NotificationController(service);
    const payload = {
      userId: 'user_1',
      type: 'delivery_status',
      title: 'Delivery updated',
      message: 'Your package is out for delivery',
    };

    await expect(controller.create(payload)).resolves.toEqual({ id: 'ntf_1' });
    expect((service as { create: jest.Mock }).create).toHaveBeenCalledWith(payload);
  });

  it('delegates findByUser to the service', async () => {
    const service = {
      create: jest.fn(),
      findByUser: jest.fn().mockResolvedValue([{ id: 'ntf_2' }]),
      update: jest.fn(),
    } as never;

    const controller = new NotificationController(service);

    await expect(controller.findByUser('user_1')).resolves.toEqual([{ id: 'ntf_2' }]);
    expect((service as { findByUser: jest.Mock }).findByUser).toHaveBeenCalledWith('user_1');
  });
});
