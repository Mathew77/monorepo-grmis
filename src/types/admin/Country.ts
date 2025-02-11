import { z } from 'zod';

import { CreateUpdateSchema } from '../create-update-schema';

// Validation schema using Zod
export const CountrySchema = z.object({
  id: z.string().uuid({ message: 'UID must be a valid UUID.' }).optional(),
  name: z.string().min(1, { message: 'Country name is required and cannot be empty.' }),
  code: z
    .string()
    .min(1, { message: 'Country code must have at least 1 character if provided.' })
    .optional(),
  shortName: z
    .string()
    .min(1, { message: 'Country short name must have at least 1 character if provided.' })
    .optional(),
  description: z
    .string()
    .optional()
    .refine(
      (value) => !value || value.length >= 10,
      { message: 'Country description must have at least 10 characters if provided.' }
    ),
  ...CreateUpdateSchema.shape,
});
