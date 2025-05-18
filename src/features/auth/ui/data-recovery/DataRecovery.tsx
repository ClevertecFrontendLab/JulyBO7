import { FC, useState } from 'react';

import { AccountRecoveryModal } from '../form-modal/account-recovery-modal/AccountRecoveryModal';
import { EnterEmailModal } from '../form-modal/enter-email-modal/EnterEmailModal';
import { EnterOtpModal } from '../form-modal/enter-otp-modal/EnterOtpModal';

export const DataRecovery: FC<{ onSuccessAccountRecovery: () => void }> = ({
    onSuccessAccountRecovery,
}) => {
    const [recoveryStep, setRecoveryStep] = useState(1);
    const [email, setEmail] = useState('');
    // const [isFailedOtpSubmit, setIsFailedOtpSubmit] = useState(false);

    const handleForgotPasswordFormSubmit = (email: string) => {
        setRecoveryStep((prev) => prev + 1);
        setEmail(email);
    };
    const handleOtpPasswordFormSubmit = () => {
        setRecoveryStep((prev) => prev + 1);
    };

    return (
        <>
            {recoveryStep === 1 && <EnterEmailModal onSubmit={handleForgotPasswordFormSubmit} />}
            {recoveryStep === 2 && (
                <EnterOtpModal email={email} onSubmit={handleOtpPasswordFormSubmit} />
            )}
            {recoveryStep === 3 && (
                <AccountRecoveryModal onSuccess={onSuccessAccountRecovery} email={email} />
            )}
        </>
    );
};
