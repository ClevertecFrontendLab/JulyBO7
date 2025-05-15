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
) => {
    if (errorData.data) {
        const apiErrorMessage = errorData.data as ApiError;

        if (Array.isArray(apiErrorMessage.message)) {
            setErrorMessage(apiErrorMessage.message[0]);
        } else {
            setErrorMessage(apiErrorMessage.message);
        }
    } else {
        if ('error' in errorData) {
            setErrorMessage(errorData.error);
            handleNetworkError?.();
        }
    }
};
