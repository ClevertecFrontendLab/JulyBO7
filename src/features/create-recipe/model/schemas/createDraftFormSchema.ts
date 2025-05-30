import { z } from 'zod';

export const createDraftFormSchema = z.object({
    // categoriesIds: z.array(z.string()).optional(),
    categoriesIds: z
        .string()
        .array()
        .optional()
        .refine((arr) => !arr || arr.length === 0 || arr.length >= 3),

    title: z.string().min(1).max(50),
    description: z.string().min(1).max(500).optional(),
    portions: z
        .number()
        .refine((value) => value > 0)
        .optional(),
    time: z
        .number()
        .max(10000)
        .refine((value) => value > 0)
        .optional(),
    image: z.string().optional(),
    ingredients: z
        .array(
            z.object({
                title: z.string().min(1).max(50),
                count: z.number().positive(),
                measureUnit: z.string().min(1),
            }),
        )
        .optional(),
    steps: z
        .array(
            z.object({
                stepNumber: z.number().positive(),
                description: z.string().min(1).max(300),
                image: z.string().optional(),
            }),
        )
        .optional(),
});

export type CreateDraftFormSchema = z.infer<typeof createDraftFormSchema>;
