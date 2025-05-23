import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import { ApiError, AuthErrorMessage } from '../types/errors';
import { AuthFormName } from './errorMessages';
import { handleNetworkErrors } from './handleNetworkErrors';
import { handleServerErrors, Options } from './handleServerErrors';

export const handleErrors = (
    formName: AuthFormName,
    error: unknown,
    setErrorMessage: (errorMessage: AuthErrorMessage) => void,
    options?: Options,
) => {
    const serverError = error as FetchBaseQueryError;
    serverError.data
        ? handleServerErrors(formName, serverError.data as ApiError, setErrorMessage, options)
        : handleNetworkErrors(serverError, setErrorMessage);
};
