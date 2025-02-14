import { z } from 'zod';

export type IFund = {
  id: string;
  fundName: string;
  country: string;
  fundType: string;
  description: string;
  sector: string;
  budget: string;
  status: string;
};

export type IFundBudget = {
  rowId?: string;
  id?: string;
  currency?: string;
  budgetAmount?: number;
  description?: string;
  createDate?: string;
  updateDate?: string;
};



// export const DocumentSchema = z.object({
//   id: z.string().uuid({ message: "Document ID must be a valid UUID." }).optional(),
//   documentName: z.string().min(1, { message: "Document name is required." }),
//   documentType: z.string().min(1, { message: "Document name is required." }),
//   size: z.string().min(1, { message: "Document name is required." }).optional(),
//   dateUploaded:z.string().min(1, { message: "Document name is required." }).optional(),
//   filePath: z.string().min(1, { message: "File path is required." }).optional()
// });

// export const BudgetDetailSchema = z.object({
//   id: z.string().uuid({ message: "Budget detail ID must be a valid UUID." }).optional(),
//   currency: z.string().min(1, { message: "Currency is required." }).optional(),
//   budgetAmount: z.string().min(1, { message: "Budget amount is required." }),
//   description: z.string().min(1, { message: "Description is required." }),
//   documents: z.array(DocumentSchema).min(1,{ message: "Upload at least one document." }),
// });


export type IFundBudgetDetails = {
  id?: string;
  currency?: string;
  budget?: number;
  description?: string;
  dateCreated?: string;
  lastUpdate?: string;
};


// Validation schema using Zod
export const DocumentSchema = z.object({
  id: z.string().optional(),
  documentName: z.string().min(1, { message: 'Document name is required.' }),
  documentType: z.string().min(1, { message: 'Document name is required.' }).optional(),
  size: z.string().min(1, { message: 'Document name is required.' }).optional(),
  dateUploaded: z.string().min(1, { message: 'Document name is required.' }).optional(),
  filePath: z.string().min(1, { message: 'File path is required.' }).optional(),
  dateCreated: z.string().optional(),
  lastUpdate: z.string().optional(),
});

export const BudgetDetailSchema = z.object({
  rowId: z.string().optional(),
  id: z.string().optional(),
  currency: z.string().min(1, { message: 'Currency is required.' }).optional(),
  budgetAmount: z.number().min(1, { message: 'Budget must be greater than 0!' }),
  description: z.string().min(1, { message: 'Description is required!' }),
  documents: z.array(DocumentSchema).default([]).optional(),
  createDate: z.string().optional(),
  updateDate: z.string().optional(),
});

export const FundZodSchema = z
  .object({
    id: z.string().optional(),
    fundID: z.string().min(1, { message: 'Fund ID is required.' }).optional(),
    fundName: z.string().min(1, { message: 'Fund name is required.' }),
    fundType: z.string().min(1, { message: 'Fund type is required.' }),
    currency: z.string().min(1, { message: 'Currency is required.' }).optional(),
    countries: z.array(z.string().min(1, { message: 'Select at least one country.' })).nonempty({ message: 'Select at least one country.' }),
    description: z.string().min(1, { message: 'Description is required.' }),
    sectors: z.array(z.string().min(1, { message: 'Sector must be a non-empty string.' })).nonempty({ message: 'Select at least one sector.' }),
    plannedStartDate: z.string().refine((value) => {
        const parsedDate = new Date(value);
        return !isNaN(parsedDate.getTime()); // Checks if it's a valid date
      },
      {
        message: 'Planned start date must be a valid ISO date.',
      }
    ),
    plannedEndDate: z.string().refine(
        (value) => {
          const parsedDate = new Date(value);
          return !isNaN(parsedDate.getTime()); // Checks if it's a valid date
        },
        {
          message: 'Planned end date must be a valid ISO date.',
        }
      )
      .optional(),
    actualStartDate: z.string().refine(
        (value) => {
          const parsedDate = new Date(value);
          return !isNaN(parsedDate.getTime()); // Checks if it's a valid date
        },
        {
          message: 'Actual start date must be a valid ISO date.',
        }
      )
      .optional(),
    actualEndDate: z.string().refine( (value) => {
          const parsedDate = new Date(value);
          return !isNaN(parsedDate.getTime()); // Checks if it's a valid date
        },
        {
          message: 'Actual end date must be a valid ISO date.',
        }
      )
      .optional(),
    fiscalYearStart: z.string().min(1, { message: 'Fiscal year start is required.' }),
    dateApproved: z.string().refine( (value) => {const parsedDate = new Date(value);
          return !isNaN(parsedDate.getTime()); // Checks if it's a valid date
        },
        {
          message: 'Date of fund approved must be a valid ISO date.',
        }
      )
      .optional(),
    budgetDetails: z.array(BudgetDetailSchema).nonempty({ message: 'Add at least one budget.' }),
  })
  .superRefine((data, ctx) => {
    const plannedStartDate = new Date(data.plannedStartDate);
    const plannedEndDate = data.plannedEndDate ? new Date(data.plannedEndDate) : null;

    if (plannedEndDate && plannedStartDate > plannedEndDate) {
      ctx.addIssue({
        code: 'custom', // Specifies a custom validation error
        path: ['plannedEndDate'], // Points to the field with the issue
        message: 'Planned end date must be greater than planned start date.',
      });
    }
  });
