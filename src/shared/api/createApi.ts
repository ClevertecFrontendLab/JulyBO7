import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://marathon-api.clevertec.ru',
        // fetchFn(input, init) {

        // },
        // prepareHeaders: (headers: Headers) => headers.append('Authorization ', ''),
    }),
    endpoints: () => ({}),
    // mode: "cors", ==> enable cors here
});
