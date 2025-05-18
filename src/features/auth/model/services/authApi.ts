import { apiSlice, Tags } from '~/shared/api';
import { ApiEndpoints } from '~/shared/api/constants/api';
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '~/shared/constants/localStorage';

import { OtpPasswordFormData } from '../../ui/otp-password-form/OtpPasswordForm';
import { AccountRecoveryFormData } from '../schemas/accountRecoveryFormSchema';
import { ForgotPasswordFormData } from '../schemas/forgotPasswordFormSchema';
import { LoginFormData } from '../schemas/loginFormSchema';
import { SignUpFormData } from '../schemas/signUpFormSchema';

type AuthResponse = Partial<{
    statusText: string;
    message: string;
    error: string;
    statusCode: number;
}>;
export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        checkAuth: builder.query<AuthResponse, void>({
            query: () => ({
                method: 'GET',
                url: ApiEndpoints.CHECK_AUTH,
            }),
            providesTags: [Tags.API],
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
        resetPassword: builder.mutation<AuthResponse, AccountRecoveryFormData & { email: string }>({
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
            invalidatesTags: [Tags.API],
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

export const {
    useRegistrationMutation,
    useLoginMutation,
    useCheckAuthQuery,
    useForgotPasswordMutation,
    useVerifyOtpMutation,
    useResetPasswordMutation,
} = authApi;
