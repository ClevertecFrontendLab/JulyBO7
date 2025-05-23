import { Button, Progress, Text, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';

import { Alert } from '~/shared/components/alert';
import { AppLoader } from '~/shared/components/loader';
import { AppRoutes, routePaths } from '~/shared/config/router';
import {
    CONFIRM_PASSWORD_INPUT,
    EMAIL_INPUT,
    FIRST_NAME_INPUT,
    LAST_NAME_INPUT,
    LOGIN_INPUT,
    PASSWORD_INPUT,
    SIGN_UP_FORM,
    SIGN_UP_PROGRESS,
    SUBMIT_BUTTON,
} from '~/shared/constants/tests';

import { STEP_1, STEP_2 } from '../../model/constants/signUpFormText';
import { ValidationMessages } from '../../model/constants/validationMessages';
import { AuthFormName, errorMessages } from '../../model/lib/errorMessages';
import { SignUpFormData, signUpFormSchema } from '../../model/schemas/signUpFormSchema';
import { useRegistrationMutation } from '../../model/services/authApi';
import { ApiError } from '../../model/types/errors';
import { FormInput } from '../form-input/FormInput';
import { FormModal } from '../form-modal/FormModal';
import cls from './SignUpForm.module.scss';

export const SignUpForm: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const defaultValues: SignUpFormData = {
        firstName: '',
        lastName: '',
        email: '',
        login: '',
        password: '',
        confirmPassword: '',
    };
    const {
        register,
        handleSubmit,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        formState: { errors, dirtyFields },
        getFieldState,
        getValues,
        setValue,
    } = useForm<SignUpFormData>({
        defaultValues,
        mode: 'all',
        resolver: zodResolver(signUpFormSchema),
    });
    const [trigger, { isLoading, error: signUpError }] = useRegistrationMutation();
    const [progressValue, setProgressValue] = useState<string[]>([]);
    const [step, setStep] = useState(1);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const errorMessage = useRef({ title: '', description: '' });

    const onSubmit = async (formData: SignUpFormData) => {
        const body = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            login: formData.login,
            password: formData.password,
        };
        try {
            await trigger(body).unwrap();
            setIsOpenModal(true);
        } catch (error) {
            const dataError = error as FetchBaseQueryError;
            if (dataError.status === 500) {
                const title = errorMessages[AuthFormName.SIGN_UP][dataError.status].title;
                const description =
                    errorMessages[AuthFormName.SIGN_UP][dataError.status].description;
                errorMessage.current = { title, description };
            }
            if (dataError.status === 400 && 'data' in dataError) {
                const apiError = dataError.data as ApiError;
                const title = Array.isArray(apiError.message)
                    ? apiError.message[0]
                    : apiError.message;
                errorMessage.current = { title, description: '' };
            }
        }
    };

    for (const fieldName in defaultValues) {
        const fieldState = getFieldState(fieldName as keyof SignUpFormData);
        if (
            !fieldState.invalid &&
            !fieldState.isValidating &&
            fieldState.isDirty &&
            !progressValue.find((value) => value === fieldName)
        ) {
            setProgressValue([...progressValue, fieldName]);
        } else if (fieldState.invalid && progressValue.find((value) => value === fieldName)) {
            setProgressValue(progressValue.filter((value) => value !== fieldName));
        }
    }

    const handleNextStep = () => {
        const firstNameFieldState = getFieldState('firstName');
        const lastNameFieldState = getFieldState('lastName');
        const emailFieldState = getFieldState('email');

        if (
            !firstNameFieldState.invalid &&
            firstNameFieldState.isDirty &&
            !lastNameFieldState.invalid &&
            lastNameFieldState.isDirty &&
            !emailFieldState.invalid &&
            emailFieldState.isDirty
        ) {
            setStep((prev) => prev + 1);
        }
    };

    const handleCloseVerificationModal = useCallback(() => {
        navigate(routePaths[AppRoutes.LOGIN]);
    }, [navigate]);

    const handleCloseVerificationErrorModal = useCallback(() => {
        setIsOpenModal(false);
    }, []);

    const modalType =
        location.state && location.state.isVerified === false
            ? 'verificationError'
            : 'verification';

    const handleInputBlur = (fieldName: keyof SignUpFormData) => () => {
        const valueWithoutSpaces = getValues(fieldName).trim();
        setValue(fieldName, valueWithoutSpaces, { shouldValidate: true });
    };

    useEffect(() => {
        if (location.state && location.state.isVerified === false) {
            setIsOpenModal(true);
        }
    }, [location.state]);

    return (
        <>
            <FormModal
                isOpen={isOpenModal}
                onClose={
                    modalType === 'verification'
                        ? handleCloseVerificationModal
                        : handleCloseVerificationErrorModal
                }
                email={getValues().email}
                type={modalType}
            />
            <Text as='label' fontSize='16px' fontWeight='400'>
                {step == 1 ? STEP_1 : STEP_2}
            </Text>
            <Progress
                data-test-id={SIGN_UP_PROGRESS}
                hasStripe
                max={100}
                value={(100 / 6) * progressValue.length}
                isAnimated
                bg='gray.300'
                h='8px'
                mb='24px'
                className={cls.progress}
            />
            <form data-test-id={SIGN_UP_FORM} onSubmit={handleSubmit(onSubmit)}>
                <VStack
                    opacity={step === 1 ? 1 : 0}
                    position={step === 1 ? 'static' : 'absolute'}
                    gap='24px'
                >
                    <FormInput
                        dataTestId={FIRST_NAME_INPUT}
                        label='Ваше имя'
                        fieldName='firstName'
                        register={register}
                        placeholder='Имя'
                        error={errors.firstName}
                        onBlur={handleInputBlur('firstName')}
                    />
                    <FormInput
                        dataTestId={LAST_NAME_INPUT}
                        label='Ваша фамилия'
                        fieldName='lastName'
                        register={register}
                        placeholder='Фамилия'
                        error={errors.lastName}
                        onBlur={handleInputBlur('lastName')}
                    />
                    <FormInput
                        dataTestId={EMAIL_INPUT}
                        label='Ваш e-mail'
                        fieldName='email'
                        register={register}
                        placeholder='e-mail'
                        error={errors.email}
                        onBlur={handleInputBlur('email')}
                    />
                    {step === 1 && (
                        <Button
                            data-test-id={SUBMIT_BUTTON}
                            type='submit'
                            w='100%'
                            onClick={handleNextStep}
                            display={step === 1 ? 'block' : 'none'}
                            mt='48px'
                        >
                            Дальше
                        </Button>
                    )}
                </VStack>

                <VStack
                    opacity={step === 1 ? 0 : 1}
                    position={step === 1 ? 'absolute' : 'static'}
                    gap='24px'
                >
                    <FormInput
                        dataTestId={LOGIN_INPUT}
                        label='Логин для входа на сайт'
                        fieldName='login'
                        register={register}
                        placeholder='Логин'
                        error={errors.login}
                        note={ValidationMessages.LOGIN_MIN_LENGTH_ONLY_LATIN}
                        onBlur={handleInputBlur('login')}
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
                        fieldName='confirmPassword'
                        register={register}
                        placeholder='Пароль'
                        error={errors.confirmPassword}
                        type='password'
                    />
                    {step === 2 && (
                        <Button data-test-id={SUBMIT_BUTTON} type='submit' w='100%' mt='24px'>
                            Зарегистрироваться
                        </Button>
                    )}
                </VStack>
            </form>

            {isLoading && <AppLoader />}
            {signUpError && (
                <Alert
                    onClose={() => {
                        errorMessage.current.description = '';
                        errorMessage.current.title = '';
                    }}
                    title={errorMessage.current.title}
                    text={errorMessage.current.description}
                    type='error'
                    bottom={{ base: '100px', lg: '80px' }}
                    left={{ base: '16px', md: '220px', lg: '155px', '2xl': '275px' }}
                    transform='translateX(0)'
                />
            )}
        </>
    );
};
