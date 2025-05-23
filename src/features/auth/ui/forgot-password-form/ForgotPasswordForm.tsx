import { Button } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { FC, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Alert } from '~/shared/components/alert';
import { AppLoader } from '~/shared/components/loader';
import { EMAIL_INPUT, SUBMIT_BUTTON } from '~/shared/constants/tests';

import { AuthFormName, errorMessages } from '../../model/lib/errorMessages';
import {
    ForgotPasswordFormData,
    forgotPasswordFormSchema,
} from '../../model/schemas/forgotPasswordFormSchema';
import { useForgotPasswordMutation } from '../../model/services/authApi';
import { FormInput } from '../form-input/FormInput';

type ForgotPasswordFormProps = {
    onSuccessSubmit: (email: string) => void;
};

export const ForgotPasswordForm: FC<ForgotPasswordFormProps> = (props) => {
    const { onSuccessSubmit } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
        getFieldState,
        resetField,
        getValues,
        setValue,
    } = useForm<ForgotPasswordFormData>({
        defaultValues: { email: '' },
        mode: 'all',
        resolver: zodResolver(forgotPasswordFormSchema),
    });
    const [trigger, { isLoading, error: serverError }] = useForgotPasswordMutation();

    const errorMessage = useRef({ title: '', description: '' });

    const onSubmit: SubmitHandler<ForgotPasswordFormData> = async ({ email }) => {
        try {
            await trigger({ email }).unwrap();
            onSuccessSubmit(email);
        } catch (error) {
            const dataError = error as FetchBaseQueryError;
            const title =
                errorMessages[AuthFormName.FORGOT_PASSWORD][Number(dataError.status)].title;
            const description =
                errorMessages[AuthFormName.FORGOT_PASSWORD][Number(dataError.status)].description;
            errorMessage.current = { title, description };
            resetField('email');
        }
    };

    const handleInputBlur = () => {
        const valueWithoutSpaces = getValues('email').trim();
        setValue('email', valueWithoutSpaces, { shouldValidate: true });
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
                    onBlur={handleInputBlur}
                />
                <Button
                    data-test-id={SUBMIT_BUTTON}
                    w='100%'
                    type='submit'
                    mt='24px'
                    h='48px'
                    fontSize='l'
                    fontWeight={600}
                >
                    Получить код
                </Button>
            </form>

            {isLoading && <AppLoader />}
            {serverError && (
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
