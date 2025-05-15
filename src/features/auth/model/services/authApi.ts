import { apiSlice } from '~/shared/api';
import { ApiEndpoints } from '~/shared/api/constants/api';
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '~/shared/constants/localStorage';

import { LoginFormData } from '../schemas/loginFormSchema';
import { SignUpFormData } from '../schemas/signUpFormSchema';

type AuthResponse = {
    statusText: string;
    message: string;
    error?: string;
    statusCode?: number;
};
export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registration: builder.mutation<AuthResponse, Omit<SignUpFormData, 'confirmPassword'>>({
            query: (body) => ({
                body,
                method: 'POST',
                url: ApiEndpoints.SIGN_UP,
            }),
        }),
        login: builder.mutation<AuthResponse, LoginFormData>({
            query: (body) => ({
                body,
                method: 'POST',
                url: ApiEndpoints.LOGIN,
            }),
            transformResponse: (response, meta) => {
                const headers = meta?.response?.headers;
                const customHeader = headers?.get('Authentication-Access');
                if (customHeader) {
                    localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, customHeader);
                }

                return { response, customHeader };
            },
        }),
    }),
});

export const { useRegistrationMutation, useLoginMutation } = authApi;
