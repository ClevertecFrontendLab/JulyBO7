import { z } from 'zod';

export const createDraftFormSchema = z.object({
    categoriesIds: z.array(z.string()).optional(),
    title: z.string().min(1).max(50),
    description: z.string().optional(),

    portions: z.number().optional(),
    time: z.number().optional(),
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
