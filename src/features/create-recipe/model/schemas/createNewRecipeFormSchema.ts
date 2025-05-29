import { z } from 'zod';

export const createNewRecipeFormSchema = z.object({
    categoriesIds: z.array(z.string()).min(3),
    title: z.string().min(1).max(50),
    description: z.string().min(1).max(500),

    portions: z.number().refine((value) => value > 0),
    time: z
        .number()
        .max(10000)
        .refine((value) => value > 0),
    image: z.string().min(1),
    ingredients: z
        .array(
            z.object({
                title: z.string().min(1).max(50),
                count: z.number().positive(),
                measureUnit: z.string().min(1),
            }),
        )
        .min(1),
    steps: z
        .array(
            z.object({
                stepNumber: z.number().positive(),
                description: z.string().min(1).max(300),
                image: z.string(),
            }),
        )
        .min(1),
});

export type CreateNewRecipeFormData = z.infer<typeof createNewRecipeFormSchema>;
