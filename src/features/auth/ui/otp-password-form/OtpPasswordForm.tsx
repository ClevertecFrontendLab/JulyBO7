import { HStack, PinInput, PinInputField } from '@chakra-ui/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { FC, useState } from 'react';

import { Alert } from '~/shared/components/alert';
import { AppLoader } from '~/shared/components/loader';
import { handleServerErrors } from '~/shared/lib/handleServerErrors';

import { useVerifyOtpMutation } from '../../model/services/authApi';

export type OtpPasswordFormData = {
    email: string;
    otpToken: string;
};

type OtpPasswordFormProps = {
    email: string;
    onSuccessSubmit: () => void;
    onFailedSubmit: () => void;
};
export const OtpPasswordForm: FC<OtpPasswordFormProps> = ({
    email,
    onSuccessSubmit,
    onFailedSubmit,
}) => {
    const [trigger, { isLoading, error }] = useVerifyOtpMutation();
    const [errorMessage, setErrorMessage] = useState('');
    const [pinInputValue, setPinInputValue] = useState('');

    const otpPasswordLength = 6;

    const handlePinInputChange = (value: string) => {
        setPinInputValue(value);
    };
    const handleOtpComplete = async (otp: string) => {
        try {
            await trigger({ email, otpToken: otp }).unwrap();
            onSuccessSubmit();
        } catch (error) {
            const apiError = error as FetchBaseQueryError;
            handleServerErrors(apiError, setErrorMessage, undefined, onFailedSubmit);
            setPinInputValue('');
        }
    };
    const pinInputFields = Array.from({ length: otpPasswordLength }, () => (
        <PinInputField color='lime.800' />
    ));
    return (
        <HStack>
            <PinInput
                otp
                onComplete={handleOtpComplete}
                onChange={handlePinInputChange}
                value={pinInputValue}
                errorBorderColor='error.100'
                focusBorderColor='lime.150'
                isInvalid={!!error}
                autoFocus={false}
            >
                {pinInputFields}
            </PinInput>

            {isLoading && <AppLoader />}
            {errorMessage && (
                <Alert onClose={() => setErrorMessage('')} title={errorMessage} type='error' />
            )}
        </HStack>
    );
};
