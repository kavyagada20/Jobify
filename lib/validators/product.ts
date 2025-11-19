import { z } from 'zod';

export const productStatusValues = ['in-stock', 'backorder', 'discontinued'] as const;

export const productInputSchema = z.object({
  name: z.string().min(2, { message: 'name must be at least 2 characters.' }),
  company: z.string().min(2, { message: 'company must be at least 2 characters.' }),
  description: z
    .string()
    .min(10, { message: 'description must be at least 10 characters.' }),
  price: z.coerce.number().positive({ message: 'price must be positive.' }),
  status: z.enum(productStatusValues),
  category: z.string().min(2, { message: 'category must be at least 2 characters.' }),
  image: z.string().min(2, { message: 'image path must be provided.' }),
});

export type ProductInput = z.infer<typeof productInputSchema>;

export function generateSlugFromName(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

