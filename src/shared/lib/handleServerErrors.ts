import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

type ApiError = {
    message: string | string[];
    error: string;
    statusCode: number;
};
export const handleServerErrors = (
    errorData: FetchBaseQueryError,
    setErrorMessage: (error: string) => void,
    handleNetworkError?: () => void,
    handleError403?: () => void,
) => {
    if (errorData.data) {
        const apiError = errorData.data as ApiError;

        if (apiError.statusCode === 403 && handleError403) {
            handleError403();
            return;
        }
        if (Array.isArray(apiError.message)) {
            setErrorMessage(apiError.message[0]);
        } else {
            setErrorMessage(apiError.message);
        }
    } else {
        if ('error' in errorData) {
            setErrorMessage(errorData.error);
            handleNetworkError?.();
        }
    }
};
