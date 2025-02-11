import { z } from 'zod';

// Create and update schema using Zod
export const CreateUpdateSchema = z.object({
  createDate: z
    .string()
    .refine(
      (value) => {
        const parsedDate = new Date(value);
        return !isNaN(parsedDate.getTime()); // Checks if it's a valid date
      },
      {
        message: 'Invalid date format for createDate.',
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
        message: 'Invalid date format for updateDate.',
      }
    )
    .optional(),
});
