import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnApplicationBootstrap {
  private redisClient: Redis;

  constructor() {
    const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;
    this.redisClient = new Redis({
      host: REDIS_HOST,
      port: Number.parseInt(REDIS_PORT) || 6379,
      password: REDIS_PASSWORD,
    });
  }

  async onApplicationBootstrap() {
    await this.flushCurrentDatabase();
  }

  async flushCurrentDatabase(): Promise<void> {
    await this.redisClient.flushdb();
  }

  async saveToken(token: string): Promise<void> {
    await this.redisClient.select(0);
    await this.redisClient.set(token, Date.now());
  }

  async deleteToken(token: string): Promise<number> {
    await this.redisClient.select(0);
    return this.redisClient.del(token);
  }

  async findToken(token: string): Promise<string | null> {
    await this.redisClient.select(0);
    return this.redisClient.get(token);
  }
}
