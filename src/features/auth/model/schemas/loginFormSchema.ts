import { z } from 'zod';

import { ValidationMessages } from '../constants/validationMessages';

export const loginFormSchema = z.object({
    login: z.string().min(1, ValidationMessages.ENTER_LOGIN).max(50, ValidationMessages.MAX_LENGTH),
    password: z
        .string()
        .min(1, ValidationMessages.ENTER_PASSWORD)
        .max(50, ValidationMessages.MAX_LENGTH),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
