import { ApiError, AuthErrorMessage } from '../types/errors';
import { AuthFormName, errorMessages } from './errorMessages';

export type Options = Partial<{
    handleError403: () => void;
    handleError401: () => void;
    handleError500: () => void;
}>;

export const handleServerErrors = (
    formName: AuthFormName,
    errorData: ApiError,
    setErrorMessage: (errorMessage: AuthErrorMessage) => void,
    options?: Options,
) => {
    if (errorData.statusCode === 400) {
        const message = errorData.message;
        const title = Array.isArray(message) ? message[0] : message;
        setErrorMessage({ title });
        return;
    }
    if (errorData.statusCode === 403 && options?.handleError403) {
        options.handleError403();
        return;
    }
    if (errorData.statusCode === 500 && options?.handleError500) {
        options.handleError500();
        return;
    }
    if (errorData.statusCode === 401 && options?.handleError401) {
        options.handleError401();
        return;
    }
    if (errorData.statusCode === 403) {
        const { title, description } = errorMessages[formName][403];
        setErrorMessage({ title, description });
        return;
    }
    if (errorData.statusCode === 500) {
        const { title, description } = errorMessages[formName][500];
        setErrorMessage({ title, description });
        return;
    }
    if (errorData.statusCode === 401) {
        const { title, description } = errorMessages[formName][401];
        setErrorMessage({ title, description });
        return;
    }
};
