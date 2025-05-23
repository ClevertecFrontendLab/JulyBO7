import { z } from 'zod';

import { ValidationMessages } from '../constants/validationMessages';

export const signUpFormSchema = z
    .object({
        firstName: z
            .string()
            .min(1, ValidationMessages.ENTER_NAME)
            .max(50, ValidationMessages.MAX_LENGTH)
            .regex(new RegExp(/^[А-Яа-яЁё]w*/, 'i'), {
                message: ValidationMessages.MUST_START_WITH_CYRILLIC,
            })
            .regex(new RegExp(/^[А-Яа-яЁё-]+$/, 'i'), {
                message: ValidationMessages.ONLY_CYRILLIC_AND_HYPHEN,
            }),

        lastName: z
            .string()
            .min(1, ValidationMessages.ENTER_SIRNAME)
            .max(50, ValidationMessages.MAX_LENGTH)
            .regex(new RegExp(/^[А-Яа-яЁё]w*/), {
                message: ValidationMessages.MUST_START_WITH_CYRILLIC,
            })
            .regex(new RegExp(/^[А-Яа-яЁё-]+$/), {
                message: ValidationMessages.ONLY_CYRILLIC_AND_HYPHEN,
            }),

        email: z
            .string()
            .min(1, ValidationMessages.ENTER_EMAIL)
            .max(50, ValidationMessages.MAX_LENGTH)
            .email({
                message: ValidationMessages.ENTER_CORRECT_EMAIL,
            }),
        login: z
            .string()
            .min(1, ValidationMessages.ENTER_LOGIN)
            .min(5, ValidationMessages.NOT_MATCH_FORMAT)
            .max(50, ValidationMessages.MAX_LENGTH)

            .regex(new RegExp(/^[A-Z0-9!@#$&_+-.]+$/i), {
                message: ValidationMessages.NOT_MATCH_FORMAT,
            }),

        password: z
            .string()
            .min(1, ValidationMessages.ENTER_PASSWORD)
            .min(8, ValidationMessages.NOT_MATCH_FORMAT)
            .max(50, ValidationMessages.MAX_LENGTH)

            .regex(new RegExp(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$&_+-.*]+$/), {
                message: ValidationMessages.NOT_MATCH_FORMAT,
            }),

        confirmPassword: z.string().min(1, ValidationMessages.REPLICATE_PASSWORD),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: ValidationMessages.PASSWORDS_MUST_MATCH,
        path: ['confirmPassword'],
    });

export type SignUpFormData = z.infer<typeof signUpFormSchema>;
