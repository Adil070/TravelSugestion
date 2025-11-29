/**
 * Redis Configuration
 * Initializes Redis client for caching and session management
 */
import Redis from 'ioredis';
import { env } from './env';
import { logger } from '../shared/utils/logger';

const redis = new Redis({
  host: env.REDIS_HOST,
  port: parseInt(env.REDIS_PORT),
  password: env.REDIS_PASSWORD || undefined,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

redis.on('connect', () => {
  logger.info('✅ Redis connected successfully');
});

redis.on('error', (error) => {
  logger.error('❌ Redis connection error:', error);
});

export { redis };
