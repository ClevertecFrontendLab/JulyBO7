import { z } from 'zod';

import { ValidationMessages } from '../constants/validationMessages';

export const forgotPasswordFormSchema = z.object({
    email: z
        .string()
        .min(1, ValidationMessages.ENTER_EMAIL)
        .max(50, ValidationMessages.MAX_LENGTH)
        .email({
            message: ValidationMessages.ENTER_CORRECT_EMAIL,
        }),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>;
