import { Button, Progress, Text, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { FC, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';

import { Alert } from '~/shared/components/alert';
import { AppLoader } from '~/shared/components/loader';
import { handleServerErrors } from '~/shared/lib/handleServerErrors';

import { STEP_1, STEP_2 } from '../../model/constants/signUpFormText';
import { ValidationMessages } from '../../model/constants/validationMessages';
import { SignUpFormData, signUpFormSchema } from '../../model/schemas/signUpFormSchema';
import { useRegistrationMutation } from '../../model/services/authApi';
import { FormInput } from '../form-input/FormInput';
import { FormModal } from '../form-modal/FormModal';
import cls from './SignUpForm.module.scss';

export const SignUpForm: FC = () => {
    const location = useLocation();

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
    } = useForm<SignUpFormData>({
        defaultValues,
        mode: 'all',
        resolver: zodResolver(signUpFormSchema),
    });
    const [trigger, { isLoading }] = useRegistrationMutation();
    const [progressValue, setProgressValue] = useState<string[]>([]);
    const [step, setStep] = useState(1);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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
            handleServerErrors(error as FetchBaseQueryError, setErrorMessage);
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
        setStep((prev) => prev + 1);
    };
    const handleCloseModal = useCallback(() => {
        setIsOpenModal(false);
    }, []);

    useEffect(() => {
        if (location.state && location.state.isVerified === false) {
            setIsOpenModal(true);
        }
    }, [location.state]);

    return (
        <>
            {isLoading && <AppLoader />}
            {errorMessage && (
                <Alert onClose={() => setErrorMessage('')} title={errorMessage} type='error' />
            )}

            <FormModal
                isOpen={isOpenModal}
                onClose={handleCloseModal}
                email={getValues().email}
                type={
                    location.state && location.state.isVerified === false
                        ? 'verificationError'
                        : 'verification'
                }
            />
            <Text as='label' fontSize='16px' fontWeight='400'>
                {step == 1 ? STEP_1 : STEP_2}
            </Text>
            <Progress
                hasStripe
                max={6}
                value={progressValue.length}
                isAnimated
                bg='gray.300'
                h='8px'
                mb='24px'
                className={cls.progress}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack display={step === 1 ? 'flex' : 'none'} gap='24px'>
                    <FormInput
                        label='Ваше имя'
                        fieldName='firstName'
                        register={register}
                        placeholder='Имя'
                        error={errors.firstName}
                    />
                    <FormInput
                        label='Ваша фамилия'
                        fieldName='lastName'
                        register={register}
                        placeholder='Фамилия'
                        error={errors.lastName}
                    />
                    <FormInput
                        label='Ваш e-mail'
                        fieldName='email'
                        register={register}
                        placeholder='e-mail'
                        error={errors.email}
                    />
                </VStack>

                <VStack display={step === 1 ? 'none' : 'flex'} gap='24px' w='100%'>
                    <FormInput
                        label='Логин для входа на сайт'
                        fieldName='login'
                        register={register}
                        placeholder='Логин'
                        error={errors.login}
                        note={ValidationMessages.LOGIN_MIN_LENGTH_ONLY_LATIN}
                    />
                    <FormInput
                        label='Пароль'
                        fieldName='password'
                        register={register}
                        placeholder='Пароль'
                        error={errors.password}
                        type='password'
                        note={ValidationMessages.PASSWORD_MIN_LENGTH_NUMBER_CAPITAL_LETTER}
                    />
                    <FormInput
                        label='Повторите пароль'
                        fieldName='confirmPassword'
                        register={register}
                        placeholder='Пароль'
                        error={errors.confirmPassword}
                        type='password'
                    />
                    <Button type='submit' w='100%' mt='24px'>
                        Зарегистрироваться
                    </Button>
                </VStack>
            </form>
            <Button
                w='100%'
                onClick={handleNextStep}
                display={step === 1 ? 'block' : 'none'}
                mt='48px'
            >
                Дальше
            </Button>
        </>
    );
};
