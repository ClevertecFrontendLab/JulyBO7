import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '../constants/localStorage';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://marathon-api.clevertec.ru',
        prepareHeaders: (headers: Headers) => {
            const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);

            if (accessToken) {
                headers.set('authorization', `Bearer ${accessToken}`);
            }
            return headers;
        },
    }),
    endpoints: () => ({}),
});
