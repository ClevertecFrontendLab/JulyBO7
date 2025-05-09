import { ApiEndpoints } from '~/shared/api/constants/api';
import { ApiGroupNames } from '~/shared/api/constants/api-group-names';
import { EndpointNames } from '~/shared/api/constants/endpoint-names';
import { Tags } from '~/shared/api/constants/tags';
import { apiSlice } from '~/shared/api/createApi';

export const postsApiSlice = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.POSTS],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getPosts: builder.query<void, void>({
                query: () => ({
                    url: ApiEndpoints.POSTS,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.POSTS,
                    name: EndpointNames.GET_POSTS,
                }),
                providesTags: [Tags.POSTS],
            }),
        }),
    });

export const { useGetPostsQuery } = postsApiSlice;
