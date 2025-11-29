/**
 * Hotel Module Types
 */
import { z } from 'zod';

export const createHotelSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  location: z.string(),
  price: z.number().positive(),
  rating: z.number().min(0).max(5).optional(),
  imageUrl: z.string().url().optional(),
});

export const updateHotelSchema = createHotelSchema.partial();

export type CreateHotelInput = z.infer<typeof createHotelSchema>;
export type UpdateHotelInput = z.infer<typeof updateHotelSchema>;
