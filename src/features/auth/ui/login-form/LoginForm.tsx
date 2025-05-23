import { Button, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { setIsAuthAction } from '~/app/store/app-slice';
import { useAppDispatch } from '~/app/store/hooks';
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

import { SUCCESS_DATA_RECOVERY } from '../../model/constants/loginFormText';
import { AuthFormName, errorMessages } from '../../model/lib/errorMessages';
import { LoginFormData, loginFormSchema } from '../../model/schemas/loginFormSchema';
import { useLoginMutation } from '../../model/services/authApi';
import { FormInput } from '../form-input/FormInput';
import { FormModal } from '../form-modal/FormModal';

export const LoginForm: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
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
    const [successMessage, setSuccessMessage] = useState('');

    const errorMessage = useRef({ title: '', description: '', showAlert: false });

    const onSubmit: SubmitHandler<LoginFormData> = async ({ login, password }) => {
        try {
            await trigger({ login, password }).unwrap();
            dispatch(setIsAuthAction(true));
            navigate(routePaths[AppRoutes.MAIN]);
        } catch (error) {
            const dataError = error as FetchBaseQueryError;
            if (dataError.status !== 500) {
                errorMessage.current.title =
                    errorMessages[AuthFormName.LOGIN][Number(dataError.status)].title;
                errorMessage.current.description =
                    errorMessages[AuthFormName.LOGIN][Number(dataError.status)].description;
                errorMessage.current.showAlert = true;
            }
        }
    };

    const handleCloseModal = useCallback(() => {
        setIsOpenModal(false);
    }, []);

    const handleRelogin = () => {
        onSubmit({ login: getValues().login, password: getValues().password });
    };

    const handleInputBlur = () => {
        const valueWithoutSpaces = getValues('login').trim();
        setValue('login', valueWithoutSpaces);
    };

    const handleErrorAlertClose = () => {
        errorMessage.current.description = '';
        errorMessage.current.title = '';
        errorMessage.current.showAlert = false;
    };

    useEffect(() => {
        if (logInError) {
            const dataError = logInError as FetchBaseQueryError;

            if (dataError.status === 500) {
                setIsOpenModal(true);
            }
        }
    }, [logInError]);

    return (
        <VStack justify='center' position='relative'>
            <form data-test-id={SIGN_IN_FORM} onSubmit={handleSubmit(onSubmit)}>
                <VStack gap='24px' w='100%'>
                    <FormInput
                        dataTestId={LOGIN_INPUT}
                        label='Логин для входа на сайт'
                        fieldName='login'
                        register={register}
                        placeholder='Логин'
                        error={errors.login}
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
            {logInError && errorMessage.current.showAlert && (
                <Alert
                    title={errorMessage.current.title}
                    type='error'
                    text={errorMessage.current.description}
                    onClose={handleErrorAlertClose}
                />
            )}
            {successMessage && (
                <Alert
                    onClose={() => setSuccessMessage('')}
                    title={successMessage}
                    type='success'
                />
            )}
            {logInError && 'status' in logInError && logInError.status === 500 && isOpenModal && (
                <FormModal
                    isOpen={isOpenModal}
                    onClose={handleCloseModal}
                    type='loginError'
                    onRelogin={handleRelogin}
                />
            )}
            {!logInError && isOpenModal && (
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
