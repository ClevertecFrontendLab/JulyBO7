import { jwtDecode } from 'jwt-decode';

import { apiSlice } from '~/shared/api';
import { ApiEndpoints } from '~/shared/api/constants/api';
import { Tags } from '~/shared/api/constants/tags';
import {
    LOCAL_STORAGE_ACCESS_TOKEN_KEY,
    LOCAL_STORAGE_USER_DATA_KEY,
} from '~/shared/constants/localStorage';

import { OtpPasswordFormData } from '../../ui/otp-password-form/OtpPasswordForm';
import { AccountRecoveryFormData } from '../schemas/accountRecoveryFormSchema';
import { ForgotPasswordFormData } from '../schemas/forgotPasswordFormSchema';
import { LoginFormData } from '../schemas/loginFormSchema';
import { SignUpFormData } from '../schemas/signUpFormSchema';
import { AuthResponse } from '../types/errors';

type ResetPasswordRequest = AccountRecoveryFormData & { email: string };

export const authApi = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.AUTH],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            checkAuth: builder.query<AuthResponse, void>({
                query: () => ({
                    method: 'GET',
                    url: ApiEndpoints.CHECK_AUTH,
                }),
                providesTags: [Tags.AUTH],
            }),
            registration: builder.mutation<AuthResponse, Omit<SignUpFormData, 'confirmPassword'>>({
                query: (body) => ({
                    body,
                    method: 'POST',
                    url: ApiEndpoints.SIGN_UP,
                }),
            }),
            forgotPassword: builder.mutation<AuthResponse, ForgotPasswordFormData>({
                query: (body) => ({
                    body,
                    method: 'POST',
                    url: ApiEndpoints.FORGOT_PASSWORD,
                }),
            }),
            verifyOtp: builder.mutation<AuthResponse, OtpPasswordFormData>({
                query: (body) => ({
                    body,
                    method: 'POST',
                    url: ApiEndpoints.VERIFY_OTP,
                }),
            }),
            resetPassword: builder.mutation<AuthResponse, ResetPasswordRequest>({
                query: (body) => ({
                    body,
                    method: 'POST',
                    url: ApiEndpoints.RESET_PASSWORD,
                }),
            }),
            login: builder.mutation<AuthResponse, LoginFormData>({
                query: (body) => ({
                    body,
                    method: 'POST',
                    url: ApiEndpoints.LOGIN,
                }),
                invalidatesTags: [Tags.AUTH],
                transformResponse: (response, meta) => {
                    const headers = meta?.response?.headers;
                    const customHeader = headers?.get('Authentication-Access');
                    if (customHeader) {
                        const decodedToken = jwtDecode(customHeader);
                        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, customHeader);
                        localStorage.setItem(
                            LOCAL_STORAGE_USER_DATA_KEY,
                            JSON.stringify(decodedToken),
                        );
                    }
                    return { response };
                },
            }),
        }),
    });

export const {
    useRegistrationMutation,
    useLoginMutation,
    useCheckAuthQuery,
    useForgotPasswordMutation,
    useVerifyOtpMutation,
    useResetPasswordMutation,
} = authApi;
