/**
 * Cloudinary Configuration
 * Setup for image/video upload and management
 */
import { v2 as cloudinary } from 'cloudinary';
import { env } from './env';
import { logger } from '../shared/utils/logger';

if (env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
  });
  logger.info('✅ Cloudinary configured');
} else {
  logger.warn('⚠️  Cloudinary credentials not provided');
}

export { cloudinary };
