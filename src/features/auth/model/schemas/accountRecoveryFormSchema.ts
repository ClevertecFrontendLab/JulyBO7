import { z } from 'zod';

import { ValidationMessages } from '../constants/validationMessages';

export const accountRecoveryFormSchema = z
    .object({
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
            .regex(new RegExp(/^[A-Z0-9!@#$&_+-.]+$/i), {
                message: ValidationMessages.NOT_MATCH_FORMAT,
            }),
        // .regex(new RegExp(/^(?=.*[A-Z])(?=.*d)[A-Za-zd!@#$&_+-.]+$/), {
        //     message: ValidationMessages.NOT_MATCH_FORMAT,
        // }),

        passwordConfirm: z.string().min(1, ValidationMessages.REPLICATE_PASSWORD),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: ValidationMessages.PASSWORDS_MUST_MATCH,
        path: ['passwordConfirm'],
    });

export type AccountRecoveryFormData = z.infer<typeof accountRecoveryFormSchema>;
