/**
 * Activity Module Types
 */
import { z } from 'zod';

export const createActivitySchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  location: z.string(),
  price: z.number().positive(),
  duration: z.number().positive(),
  imageUrl: z.string().url().optional(),
});

export const updateActivitySchema = createActivitySchema.partial();

export type CreateActivityInput = z.infer<typeof createActivitySchema>;
export type UpdateActivityInput = z.infer<typeof updateActivitySchema>;
