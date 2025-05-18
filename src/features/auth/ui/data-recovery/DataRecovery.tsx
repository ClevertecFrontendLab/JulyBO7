import { Image, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';

import cupImage from '~/shared/assets/loginErrorModal.png';
import otpPasswordModal from '~/shared/assets/otp.png';

import {
    ENTER_IT_BELOW,
    FORGOT_PASSWORD_MODAL_NOTE,
    INPUT_EMAIL_FOR_RECOVERY,
    INVALID_CODE,
    SIX_DIGIT_CODE,
    WE_SENT_YOU_EMAIL,
} from '../../model/constants/dataRecovery';
import { AccountRecoveryForm } from '../account-recovery-form/AccountRecoveryForm';
import { ForgotPasswordForm } from '../forgot-password-form/ForgotPasswordForm';
import { OtpPasswordForm } from '../otp-password-form/OtpPasswordForm';

export const DataRecovery: FC<{ onSuccessAccountRecovery: () => void }> = ({
    onSuccessAccountRecovery,
}) => {
    const [recoveryStep, setRecoveryStep] = useState(1);
    const [email, setEmail] = useState('');
    const [isFailedOtpSubmit, setIsFailedOtpSubmit] = useState(false);

    const handleForgotPasswordFormSubmit = (email: string) => {
        setRecoveryStep((prev) => prev + 1);
        setEmail(email);
    };
    const handleOtpPasswordFormSubmit = () => {
        setRecoveryStep((prev) => prev + 1);
    };
    const handleFailedSubmit = () => {
        setIsFailedOtpSubmit(true);
    };

    return (
        <>
            {recoveryStep === 1 && (
                <>
                    <Image src={cupImage} w={{ base: '108px', lg: '206px' }} mb='32px' />
                    <Text color='gray.400' fontSize='m' textAlign='center' mb='16px'>
                        {INPUT_EMAIL_FOR_RECOVERY}
                    </Text>
                    <ForgotPasswordForm onSuccessSubmit={handleForgotPasswordFormSubmit} />
                    <Text textStyle='xs' textAlign='center' color='gray.100' mt='24px'>
                        {FORGOT_PASSWORD_MODAL_NOTE}
                    </Text>
                </>
            )}
            {recoveryStep === 2 && (
                <>
                    <Image src={otpPasswordModal} w={{ base: '108px', lg: '206px' }} mb='32px' />
                    {isFailedOtpSubmit && (
                        <Text fontSize='24px' fontWeight={700}>
                            {INVALID_CODE}
                        </Text>
                    )}
                    <Text color='gray.400' fontSize='m' mb='16px' textAlign='center'>
                        <Text as='span'>{`${WE_SENT_YOU_EMAIL} `}</Text>
                        <Text as='span' fontWeight={600} fontSize='m'>
                            {`${email} `}
                        </Text>
                        <Text as='span'>{`${SIX_DIGIT_CODE} `}</Text>
                        <Text as='span'>{`${ENTER_IT_BELOW}`}</Text>
                    </Text>
                    <OtpPasswordForm
                        email={email}
                        onSuccessSubmit={handleOtpPasswordFormSubmit}
                        onFailedSubmit={handleFailedSubmit}
                    />
                    <Text textStyle='xs' textAlign='center' color='gray.100' mt='24px'>
                        {FORGOT_PASSWORD_MODAL_NOTE}
                    </Text>
                </>
            )}
            {recoveryStep === 3 && (
                <AccountRecoveryForm onSuccess={onSuccessAccountRecovery} email={email} />
            )}
        </>
    );
};
