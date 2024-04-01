import { z } from "zod";

const itemPayer = z.object({
  payerId: z.number().positive("Payer ID must be a positive number"),
  amount: z.number().positive("Amount must be a positive number"),
});

export const itemSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  price: z.number().min(0, "Price must be a positive number"),
  description: z.string().max(5000).optional(),
  purchaseDate: z.string().optional(),
  payers: z.any(),
  // payers: z.array(itemPayer),
  status: z.string().min(1, "Status").max(15),
});
export const itemPatchSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z.string().max(5000).optional(),
  price: z.number().optional(),
  payers: z.any(),
  status: z.string().min(1, "Status").max(15).optional(),
});
