import { z } from 'zod';

import { ValidationMessages } from '../constants/validationMessages';

export const signUpSchema = z
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
            .regex(new RegExp(/^[A-Z0-9!@#$&_+-.]+$/i), {
                message: ValidationMessages.NOT_MATCH_FORMAT,
            }),
        // .regex(new RegExp(/^(?=.*[A-Z])(?=.*d)[A-Za-zd!@#$&_+-.]+$/), {
        //     message: ValidationMessages.NOT_MATCH_FORMAT,
        // }),

        confirmPassword: z.string().min(1, ValidationMessages.REPLICATE_PASSWORD),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: ValidationMessages.PASSWORDS_MUST_MATCH,
        path: ['confirmPassword'],
    });

export type SignUpFormData = z.infer<typeof signUpSchema>;

// export const createEditProfileSchema = (t: LocaleType['Profile']) => {
//   return z
//     .object({
//       aboutMe: z.string().max(200, t.editProfileError.maxLengthAboutMe).optional(),
//       city: z.string().optional(),
//       country: z.string().optional(),
//       dateOfBirth: z.date({ message: t.editProfileError.requiredError }),

//       firstName: z
//         .string()
//         .min(1, t.editProfileError.requiredError)
//         .max(50, t.editProfileError.maxLengthName)
//         .regex(new RegExp(/^[a-zа-я]+$/, 'i'), { message: t.editProfileError.invalidFirstName }),
//       lastName: z
//         .string()
//         .min(1, t.editProfileError.requiredError)
//         .max(50, t.editProfileError.maxLengthName)
//         .regex(new RegExp(/^[a-zа-я]+$/, 'i'), { message: t.editProfileError.invalidLastName }),
//       userName: z
//         .string()
//         .min(6, t.editProfileError.minLengthUserName)
//         .max(30, t.editProfileError.maxLengthUserName)
//         .regex(new RegExp(/^[0-9a-z_-]+$/, 'i'), { message: t.editProfileError.invalidUserName }),
//     })
//     .refine(
//       data => {
//         if (data.dateOfBirth !== null && data.dateOfBirth !== undefined) {
//           return new Date().getFullYear() - data.dateOfBirth.getFullYear() >= 13
//         }

//         return false
//       },
//       {
//         message: t.editProfileError.ageUser,
//         path: ['dateOfBirth'],
//       }
//     )
// }
