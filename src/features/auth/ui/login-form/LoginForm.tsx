import { Button, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { FC, useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { Alert } from '~/shared/components/alert';
import { AppLoader } from '~/shared/components/loader';
import { AppRoutes, routePaths } from '~/shared/config/router';
import {
    FORGOT_PASSWORD,
    LOGIN_INPUT,
    PASSWORD_INPUT,
    SIGN_IN_FORM,
    SUBMIT_BUTTON,
} from '~/shared/constants/tests';
import { handleServerErrors } from '~/shared/lib/handleServerErrors';

import { SUCCESS_DATA_RECOVERY } from '../../model/constants/loginFormText';
import { LoginFormData, loginFormSchema } from '../../model/schemas/loginFormSchema';
import { useLoginMutation } from '../../model/services/authApi';
import { FormInput } from '../form-input/FormInput';
import { FormModal } from '../form-modal/FormModal';

export const LoginForm: FC = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<LoginFormData>({
        defaultValues: {
            login: '',
            password: '',
        },
        mode: 'all',
        resolver: zodResolver(loginFormSchema),
    });
    const [trigger, { isLoading, error: logInError }] = useLoginMutation();

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const onSubmit: SubmitHandler<LoginFormData> = useCallback(
        async ({ login, password }) => {
            try {
                await trigger({ login, password }).unwrap();
                navigate(routePaths[AppRoutes.MAIN]);
            } catch (error) {
                const handleNetworkError = () => setIsOpenModal(true);
                handleServerErrors(
                    error as FetchBaseQueryError,
                    setErrorMessage,
                    undefined,
                    undefined,
                    handleNetworkError,
                );
            }
        },
        [navigate, trigger],
    );

    const handleCloseModal = useCallback(() => {
        setIsOpenModal(false);
    }, []);

    const handleRelogin = useCallback(() => {
        onSubmit({ login: getValues().login, password: getValues().password });
    }, [getValues, onSubmit]);

    return (
        <VStack justify='center'>
            <form data-test-id={SIGN_IN_FORM} onSubmit={handleSubmit(onSubmit)}>
                <VStack gap='24px' w='100%'>
                    <FormInput
                        dataTestId={LOGIN_INPUT}
                        label='Логин для входа на сайт'
                        fieldName='login'
                        register={register}
                        placeholder='Логин'
                        error={errors.login}
                    />
                    <FormInput
                        passwordDataTestId={PASSWORD_INPUT}
                        label='Пароль'
                        fieldName='password'
                        register={register}
                        placeholder='Пароль'
                        error={errors.password}
                        type='password'
                    />
                    <Button data-test-id={SUBMIT_BUTTON} type='submit' w='100%' mt='88px'>
                        Войти
                    </Button>
                </VStack>
            </form>
            <Button
                data-test-id={FORGOT_PASSWORD}
                variant='clear'
                onClick={() => setIsOpenModal(true)}
            >
                Забыли логин или пароль?
            </Button>

            {isLoading && <AppLoader />}
            {errorMessage && (
                <Alert onClose={() => setErrorMessage('')} title={errorMessage} type='error' />
            )}
            {successMessage && (
                <Alert
                    onClose={() => setSuccessMessage('')}
                    title={successMessage}
                    type='success'
                />
            )}
            {logInError ? (
                <FormModal
                    isOpen={isOpenModal}
                    onClose={handleCloseModal}
                    type='loginError'
                    onRelogin={handleRelogin}
                />
            ) : (
                <FormModal
                    isOpen={isOpenModal}
                    onClose={handleCloseModal}
                    type='dataRecovery'
                    onSuccessDataRecovery={() => setSuccessMessage(SUCCESS_DATA_RECOVERY)}
                />
            )}
        </VStack>
    );
};
