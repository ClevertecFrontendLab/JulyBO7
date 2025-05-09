import { apiSlice } from '~/shared/api';
import { ApiEndpoints } from '~/shared/api/constants/api';
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
                }),
                providesTags: [Tags.CATEGORY],
            }),
            getCategoryById: builder.query<Category, string>({
                query: (id: string) => ({
                    url: `${ApiEndpoints.CATEGORY}/${id}`,
                    method: 'GET',
                }),
                providesTags: [Tags.CATEGORY],
            }),
        }),
    });

export const { useGetCategoriesQuery, useGetCategoryByIdQuery } = categoryApiSlice;
