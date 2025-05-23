import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { AuthErrorMessage } from '../types/errors';

export const handleNetworkErrors = (
    errorData: FetchBaseQueryError,
    setErrorMessage: (errorMessage: AuthErrorMessage) => void,
    handleNetworkError?: () => void,
) => {
    if (errorData.status === 'FETCH_ERROR') {
        setErrorMessage({ title: 'Проблемы с сетью' });
    }
    if (errorData.status === 'FETCH_ERROR' && handleNetworkError) {
        handleNetworkError();
    }
};
