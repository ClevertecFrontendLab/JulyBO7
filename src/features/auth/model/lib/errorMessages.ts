export enum AuthFormName {
    LOGIN = 'log in',
    SIGN_UP = 'sign up',
    FORGOT_PASSWORD = 'forgot password',
    OTP_PASSWORD = 'otp password',
    ACCOUNT_RECOVERY = 'account recovery',
}

type ErrorMessagesByStatusCode = {
    [key: number]: {
        title: string;
        description: string;
    };
};
type ErrorMessages = {
    [name in AuthFormName]: ErrorMessagesByStatusCode;
};

export const errorMessages: ErrorMessages = {
    [AuthFormName.LOGIN]: {
        [401]: {
            title: 'Неверный логин или пароль.',
            description: 'Попробуйте снова.',
        },
        [403]: {
            title: 'E-mail не верифицирован.',
            description: 'Проверьте почту и перейдите по ссылке.',
        },
    },
    [AuthFormName.SIGN_UP]: {
        [500]: {
            title: 'Ошибка сервера.',
            description: 'Попробуйте немного позже.',
        },
    },
    [AuthFormName.FORGOT_PASSWORD]: {
        [403]: {
            title: 'Такого e-mail нет.',
            description: 'Попробуйте другой e-mail или проверьте правильность его написания.',
        },
        [500]: {
            title: 'Ошибка сервера',
            description: 'Попробуйте немного позже',
        },
    },
    [AuthFormName.OTP_PASSWORD]: {
        [500]: {
            title: 'Ошибка сервера.',
            description: 'Попробуйте немного позже.',
        },
    },
    [AuthFormName.ACCOUNT_RECOVERY]: {
        [500]: {
            title: 'Ошибка сервера.',
            description: 'Попробуйте немного позже.',
        },
    },
};
