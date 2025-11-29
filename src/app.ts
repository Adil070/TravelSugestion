/**
 * Express Application Setup
 * Initializes Express app with middleware and routes
 */
import express, { Express } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { setupRoutes } from './routes';
import { errorMiddleware } from './shared/middleware/error.middleware';
import { logger } from './shared/utils/logger';

export const createApp = (): Express => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Request logging
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.path}`);
    next();
  });

  // Setup routes
  setupRoutes(app);

  // Error handling (must be last)
  app.use(errorMiddleware);

  return app;
};
