import { Button, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { FC, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Alert } from '~/shared/components/alert';
import { AppLoader } from '~/shared/components/loader';
import {
    CONFIRM_PASSWORD_INPUT,
    LOGIN_INPUT,
    PASSWORD_INPUT,
    SUBMIT_BUTTON,
} from '~/shared/constants/tests';

import { ValidationMessages } from '../../model/constants/validationMessages';
import { AuthFormName, errorMessages } from '../../model/lib/errorMessages';
import {
    AccountRecoveryFormData,
    accountRecoveryFormSchema,
} from '../../model/schemas/accountRecoveryFormSchema';
import { useResetPasswordMutation } from '../../model/services/authApi';
import { FormInput } from '../form-input/FormInput';

type AccountRecoveryFormProps = {
    onSuccess: () => void;
    email: string;
};

export const AccountRecoveryForm: FC<AccountRecoveryFormProps> = (props) => {
    const { onSuccess, email } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
    } = useForm<AccountRecoveryFormData>({
        defaultValues: {
            login: '',
            password: '',
            passwordConfirm: '',
        },
        mode: 'all',
        resolver: zodResolver(accountRecoveryFormSchema),
    });
    const [trigger, { isLoading, error: resetPasswordError }] = useResetPasswordMutation();
    const errorMessage = useRef({ title: '', description: '' });

    const onSubmit: SubmitHandler<AccountRecoveryFormData> = async ({
        login,
        password,
        passwordConfirm,
    }) => {
        try {
            await trigger({ login, password, passwordConfirm, email }).unwrap();
            onSuccess();
        } catch (error) {
            const dataError = error as FetchBaseQueryError;

            errorMessage.current.title =
                errorMessages[AuthFormName.ACCOUNT_RECOVERY][Number(dataError.status)].title;
            errorMessage.current.description =
                errorMessages[AuthFormName.ACCOUNT_RECOVERY][Number(dataError.status)].description;
        }
    };

    const handleInputBlur = () => {
        const valueWithoutSpaces = getValues('login').trim();
        setValue('login', valueWithoutSpaces);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack gap='24px' w='100%'>
                    <FormInput
                        dataTestId={LOGIN_INPUT}
                        label='Логин для входа на сайт'
                        fieldName='login'
                        register={register}
                        placeholder='Логин'
                        error={errors.login}
                        note={ValidationMessages.LOGIN_MIN_LENGTH_ONLY_LATIN}
                        onBlur={handleInputBlur}
                    />
                    <FormInput
                        passwordDataTestId={PASSWORD_INPUT}
                        label='Пароль'
                        fieldName='password'
                        register={register}
                        placeholder='Пароль'
                        error={errors.password}
                        type='password'
                        note={ValidationMessages.PASSWORD_MIN_LENGTH_NUMBER_CAPITAL_LETTER}
                    />
                    <FormInput
                        passwordDataTestId={CONFIRM_PASSWORD_INPUT}
                        label='Повторите пароль'
                        fieldName='passwordConfirm'
                        register={register}
                        placeholder='Пароль'
                        error={errors.passwordConfirm}
                        type='password'
                    />
                    <Button
                        data-test-id={SUBMIT_BUTTON}
                        type='submit'
                        w='100%'
                        mt='8px'
                        h='48px'
                        fontSize='l'
                        fontWeight={600}
                    >
                        Зарегистрироваться
                    </Button>
                </VStack>
            </form>

            {isLoading && <AppLoader />}
            {resetPasswordError && (
                <Alert
                    onClose={() => {
                        errorMessage.current.description = '';
                        errorMessage.current.title = '';
                    }}
                    title={errorMessage.current.title}
                    text={errorMessage.current.description}
                    type='error'
                />
            )}
        </>
    );
};
