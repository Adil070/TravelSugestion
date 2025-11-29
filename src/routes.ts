/**
 * Main Routes
 * Aggregates all module routes
 */
import { Express } from 'express';
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/users/user.routes';
import hotelRoutes from './modules/hotels/hotel.routes';
import flightRoutes from './modules/flights/flight.routes';
import activityRoutes from './modules/activities/activity.routes';

export const setupRoutes = (app: Express) => {
  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API routes
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/hotels', hotelRoutes);
  app.use('/api/flights', flightRoutes);
  app.use('/api/activities', activityRoutes);

  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({
      success: false,
      message: 'Route not found',
    });
  });
};
