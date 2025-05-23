import React, { useState } from 'react';
import { useLocation } from 'react-router';

import { LoginForm } from '~/features/auth';
import { Alert } from '~/shared/components/alert';

import { VERIFICATION_SUCCESS_MESSAGE } from '../../model/constants/signUpPage';

export const LoginPage: React.FC = () => {
    const location = useLocation();
    const [successMessage, setSuccessMessage] = useState('');

    if (location.state && location.state.isVerified && !successMessage) {
        setSuccessMessage(VERIFICATION_SUCCESS_MESSAGE);
    }

    return (
        <>
            <LoginForm />
            {successMessage && (
                <Alert
                    onClose={() => setSuccessMessage('')}
                    title={successMessage}
                    type='success'
                />
            )}
        </>
    );
};
