/**
 * Flight Module Types
 */
import { z } from 'zod';

export const createFlightSchema = z.object({
  airline: z.string(),
  flightNumber: z.string(),
  origin: z.string(),
  destination: z.string(),
  departureTime: z.string().datetime(),
  arrivalTime: z.string().datetime(),
  price: z.number().positive(),
});

export const updateFlightSchema = createFlightSchema.partial();

export type CreateFlightInput = z.infer<typeof createFlightSchema>;
export type UpdateFlightInput = z.infer<typeof updateFlightSchema>;
