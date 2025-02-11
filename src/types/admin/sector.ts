import { z } from 'zod';

// Validation schema using Zod
export const CurrencySchema = z.object({
  id: z.string().uuid({ message: 'UID must be a valid UUID.' }).optional(),
  Name: z.string().min(1, { message: 'Currency name is required and cannot be empty.' }),
  Code: z.string().min(1, { message: 'Code is required.' }).optional(),
  Symbol: z.string().min(1, { message: 'Symbol is required.' }).optional(),
  Description: z.string().min(1, { message: 'Description is required.' }).optional(),
  createDate: z
    .string()
    .refine(
      (value) => {
        const parsedDate = new Date(value);
        return !isNaN(parsedDate.getTime()); // Checks if it's a valid date
      },
      {
        message: 'Actual start date must be a valid ISO date.',
      }
    )
    .optional(),
  updateDate: z
    .string()
    .refine(
      (value) => {
        const parsedDate = new Date(value);
        return !isNaN(parsedDate.getTime()); // Checks if it's a valid date
      },
      {
        message: 'Actual start date must be a valid ISO date.',
      }
    )
    .optional(),
});
