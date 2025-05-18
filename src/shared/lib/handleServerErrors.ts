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
    handleError500?: () => void,
) => {
    if (errorData.data) {
        const apiError = errorData.data as ApiError;
        // const regEx = new RegExp(/^5d{2}$/);

        if (apiError.statusCode === 403 && handleError403) {
            handleError403();
            return;
        }
        // if (regEx.test(String(apiError.statusCode)) && handleError500) {
        //     handleError500();
        //     return;
        // }
        if (apiError.statusCode === 500 && handleError500) {
            handleError500();
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
