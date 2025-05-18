import { Button, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Alert } from '~/shared/components/alert';
import { AppLoader } from '~/shared/components/loader';
import {
    CONFIRM_PASSWORD_INPUT,
    LOGIN_INPUT,
    PASSWORD_INPUT,
    SUBMIT_BUTTON,
} from '~/shared/constants/tests';
import { handleServerErrors } from '~/shared/lib/handleServerErrors';

import { ValidationMessages } from '../../model/constants/validationMessages';
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
export const AccountRecoveryForm: FC<AccountRecoveryFormProps> = ({ onSuccess, email }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AccountRecoveryFormData>({
        defaultValues: {
            login: '',
            password: '',
            passwordConfirm: '',
        },
        mode: 'all',
        resolver: zodResolver(accountRecoveryFormSchema),
    });
    const [trigger, { isLoading }] = useResetPasswordMutation();
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit: SubmitHandler<AccountRecoveryFormData> = async ({
        login,
        password,
        passwordConfirm,
    }) => {
        try {
            await trigger({ login, password, passwordConfirm, email }).unwrap();
            onSuccess();
        } catch (error) {
            handleServerErrors(error as FetchBaseQueryError, setErrorMessage);
        }
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
                    <Button data-test-id={SUBMIT_BUTTON} type='submit' w='100%' mt='8px'>
                        Зарегистрироваться
                    </Button>
                </VStack>
            </form>

            {isLoading && <AppLoader />}
            {errorMessage && (
                <Alert onClose={() => setErrorMessage('')} title={errorMessage} type='error' />
            )}
        </>
    );
};
