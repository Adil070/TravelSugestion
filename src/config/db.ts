/**
 * Database Configuration
 * Initializes and exports Prisma Client for database operations
 */
import { PrismaClient } from '@prisma/client';
import { logger } from '../shared/utils/logger';

const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

// Test database connection
export const connectDB = async () => {
  try {
    await prisma.$connect();
    logger.info('✅ Database connected successfully');
  } catch (error) {
    logger.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

// Graceful shutdown
export const disconnectDB = async () => {
  await prisma.$disconnect();
  logger.info('Database disconnected');
};

export { prisma };
