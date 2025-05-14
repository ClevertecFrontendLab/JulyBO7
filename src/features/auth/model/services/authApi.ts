import { apiSlice } from '~/shared/api';
import { ApiEndpoints } from '~/shared/api/constants/api';
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '~/shared/constants/localStorage';

// import { Tags } from '~/shared/api/constants/tags';
import { FormFields } from '../types/signUp';

type RegistrationResponse = {
    statusText: string;
    message: string;
    error?: string;
    statusCode?: number;
};
export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registration: builder.mutation<RegistrationResponse, FormFields>({
            query: (body) => ({
                body,
                method: 'POST',
                url: ApiEndpoints.SIGN_UP,
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

export const { useRegistrationMutation } = authApi;
