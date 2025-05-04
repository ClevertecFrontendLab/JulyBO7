import { apiSlice } from '~/shared/api';
import { ApiEndpoints } from '~/shared/api/constants/api';
// import { ApiGroupNames } from '~/shared/api/constants/api-group-names';
// import { EndpointNames } from '~/shared/api/constants/endpoint-names';
import { Tags } from '~/shared/api/constants/tags';
import { Category } from '~/shared/types/categories';

type CategoryResponse = Category[];

export const categoryApiSlice = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.CATEGORY],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getCategories: builder.query<CategoryResponse, void>({
                query: () => ({
                    url: ApiEndpoints.CATEGORY,
                    method: 'GET',
                    // apiGroupName: ApiGroupNames.POSTS,
                    // name: EndpointNames.GET_POSTS,
                }),
                // providesTags: [Tags.CATEGORY],
            }),
            getCategoryById: builder.query<Category, string>({
                query: (id: string) => ({
                    url: `${ApiEndpoints.CATEGORY}/${id}`,
                    method: 'GET',
                    // apiGroupName: ApiGroupNames.POSTS,
                    // name: EndpointNames.GET_POSTS,
                }),
                // providesTags: [Tags.CATEGORY],
            }),
        }),
    });

export const { useGetCategoriesQuery, useGetCategoryByIdQuery } = categoryApiSlice;
