/**
 * MeiliSearch Configuration
 * Setup for fast, typo-tolerant search functionality
 */
import { MeiliSearch } from 'meilisearch';
import { env } from './env';
import { logger } from '../shared/utils/logger';

let meilisearch: MeiliSearch | null = null;

if (env.MEILISEARCH_HOST) {
  meilisearch = new MeiliSearch({
    host: env.MEILISEARCH_HOST,
    apiKey: env.MEILISEARCH_API_KEY,
  });
  logger.info('✅ MeiliSearch configured');
} else {
  logger.warn('⚠️  MeiliSearch host not provided');
}

export { meilisearch };
