import {z} from 'zod';

export const processPaymentSchema = z.object({
  amount: z
    .number({
      required_error: 'Amount is required',
      invalid_type_error: 'Amount must be a number',
    })
    .min(0.01, 'Amount must be at least 0.01'),
});
