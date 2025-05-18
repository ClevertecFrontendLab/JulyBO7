import { Button } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Alert } from '~/shared/components/alert';
import { AppLoader } from '~/shared/components/loader';
import { EMAIL_INPUT, SUBMIT_BUTTON } from '~/shared/constants/tests';
import { handleServerErrors } from '~/shared/lib/handleServerErrors';

import {
    ForgotPasswordFormData,
    forgotPasswordFormSchema,
} from '../../model/schemas/forgotPasswordFormSchema';
import { useForgotPasswordMutation } from '../../model/services/authApi';
import { FormInput } from '../form-input/FormInput';

type ForgotPasswordFormProps = {
    onSuccessSubmit: (email: string) => void;
};

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSuccessSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getFieldState,
        resetField,
    } = useForm<ForgotPasswordFormData>({
        defaultValues: { email: '' },
        mode: 'all',
        resolver: zodResolver(forgotPasswordFormSchema),
    });
    const [trigger, { isLoading, error: serverError }] = useForgotPasswordMutation();
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit: SubmitHandler<ForgotPasswordFormData> = async ({ email }) => {
        try {
            await trigger({ email }).unwrap();
            onSuccessSubmit(email);
        } catch (error) {
            handleServerErrors(error as FetchBaseQueryError, setErrorMessage);
            resetField('email');
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    dataTestId={EMAIL_INPUT}
                    label='Ваш e-mail'
                    fieldName='email'
                    register={register}
                    placeholder='e-mail'
                    error={errors.email}
                    isErrorBorderColor={!!serverError && !getFieldState('email').isDirty}
                />
                <Button data-test-id={SUBMIT_BUTTON} w='100%' type='submit' mt='24px'>
                    Получить код
                </Button>
            </form>

            {isLoading && <AppLoader />}
            {errorMessage && (
                <Alert onClose={() => setErrorMessage('')} title={errorMessage} type='error' />
            )}
        </>
    );
};
