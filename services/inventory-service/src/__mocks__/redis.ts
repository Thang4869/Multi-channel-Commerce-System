import { EventEmitter } from 'events';

class MockRedisClient extends EventEmitter {
  private subscriptions: Map<string, (message: string) => void> = new Map();

  async connect() {
    return;
  }
  duplicate() {
    return this;
  }
  on() {
    return this;
  }
  async subscribe(channel: string, cb: (message: string) => void) {
    this.subscriptions.set(channel, cb);
  }
  async publish(channel: string, message: string) {
    const cb = this.subscriptions.get(channel);
    if (cb) {
      // simulate async delivery
      setImmediate(() => cb(message));
    }
  }
  async disconnect() {
    this.subscriptions.clear();
  }
}

export function createClient() {
  return new MockRedisClient();
}

export type RedisClientType = MockRedisClient;
