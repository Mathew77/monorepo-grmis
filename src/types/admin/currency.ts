import { z } from 'zod';

import { CreateUpdateSchema } from '../create-update-schema';

// Validation schema using Zod
export const CurrencySchema = z.object({
  id: z.string().uuid({ message: 'UID must be a valid UUID.' }).optional(),
  name: z.string().min(1, { message: 'Currency name is required and cannot be empty.' }),
  code: z
    .string()
    .min(1, { message: 'Currency code must have at least 1 character if provided.' })
    .optional(),
  symbol: z
    .string()
    .min(1, { message: 'Currency symbol must have at least 1 character if provided.' })
    .optional(),
  description: z
    .string()
    .optional()
    .refine(
      (value) => !value || value.length >= 10,
      { message: 'Currency description must have at least 10 characters if provided.' }
    ),
  ...CreateUpdateSchema.shape,
});
