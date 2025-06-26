import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { jwtDecode } from 'jwt-decode';

import {
    LOCAL_STORAGE_ACCESS_TOKEN_KEY,
    LOCAL_STORAGE_USER_DATA_KEY,
} from '../constants/localStorage';
import { ApiEndpoints } from './constants/api';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://marathon-api.clevertec.ru',
    credentials: 'include',
    prepareHeaders: (headers: Headers) => {
        const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
        if (accessToken) {
            headers.set('authorization', `Bearer ${accessToken}`);
        }
        return headers;
    },
});

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 403) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshResult = await baseQuery(ApiEndpoints.REFRESH, api, extraOptions);
                if (refreshResult.meta?.response?.headers) {
                    const headers = refreshResult.meta?.response?.headers;
                    const customHeader = headers?.get('Authentication-Access');
                    if (customHeader) {
                        const decodedToken = jwtDecode(customHeader);
                        localStorage.setItem(
                            LOCAL_STORAGE_USER_DATA_KEY,
                            JSON.stringify(decodedToken),
                        );
                        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, customHeader);
                    }

                    result = await baseQuery(args, api, extraOptions);
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
};
