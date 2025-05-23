import { HStack, PinInput, PinInputField } from '@chakra-ui/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { FC, useRef, useState } from 'react';

import { Alert } from '~/shared/components/alert';
import { AppLoader } from '~/shared/components/loader';
import { VERIFICATION_CODE_INPUT } from '~/shared/constants/tests';

import { AuthFormName, errorMessages } from '../../model/lib/errorMessages';
import { useVerifyOtpMutation } from '../../model/services/authApi';

export type OtpPasswordFormData = {
    email: string;
    otpToken: string;
};

type OtpPasswordFormProps = {
    email: string;
    onSuccessSubmit: () => void;
    onFailedSubmit: (value: boolean) => void;
};

export const OtpPasswordForm: FC<OtpPasswordFormProps> = ({
    email,
    onSuccessSubmit,
    onFailedSubmit,
}) => {
    const [trigger, { isLoading, error: verifyOtpError }] = useVerifyOtpMutation();
    const [pinInputValue, setPinInputValue] = useState('');
    const [isInvalidOtp, setIsInvalidOtp] = useState(false);

    const errorMessage = useRef({ title: '', description: '' });

    const otpPasswordLength = 6;

    const handlePinInputChange = (value: string) => {
        setPinInputValue(value);
    };

    const handleOtpComplete = async (otp: string) => {
        try {
            await trigger({ email, otpToken: otp }).unwrap();
            onSuccessSubmit();
        } catch (error) {
            const dataError = error as FetchBaseQueryError;
            if (dataError.status === 500) {
                errorMessage.current.title =
                    errorMessages[AuthFormName.OTP_PASSWORD][dataError.status].title;
                errorMessage.current.description =
                    errorMessages[AuthFormName.OTP_PASSWORD][dataError.status].description;
            }
            if (dataError.status === 403) {
                onFailedSubmit(true);
            }
            setPinInputValue('');
            setIsInvalidOtp(true);
        }
    };

    const pinInputFields = Array.from({ length: otpPasswordLength }, (_, idx) => {
        const handleFocus = () => {
            setIsInvalidOtp(false);
            onFailedSubmit(false);
        };
        return (
            <PinInputField
                data-test-id={`${VERIFICATION_CODE_INPUT}-${idx + 1}`}
                color='lime.800'
                autoFocus={false}
                onFocus={handleFocus}
                placeholder='o'
                _placeholder={{ color: 'lime.800' }}
            />
        );
    });

    return (
        <HStack>
            <PinInput
                otp
                onComplete={handleOtpComplete}
                onChange={handlePinInputChange}
                value={pinInputValue}
                errorBorderColor='error.100'
                focusBorderColor={isInvalidOtp ? 'error.100' : 'lime.150'}
                isInvalid={isInvalidOtp}
                autoFocus={false}
                manageFocus={false}
            >
                {pinInputFields}
            </PinInput>

            {isLoading && <AppLoader />}
            {verifyOtpError && 'status' in verifyOtpError && verifyOtpError.status === 500 && (
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
        </HStack>
    );
};
