import { apiSlice } from '~/shared/api';
import { ApiEndpoints } from '~/shared/api/constants/api';
import { Tags } from '~/shared/api/constants/tags';

import { GetCategoryRecipesRequest, GetRecipesResponse, RequestParams } from '../types/params';
import { Recipe } from '../types/recipe';

export const recipeApiSlice = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.RECIPE],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getRecipes: builder.query<GetRecipesResponse, RequestParams>({
                query: (params) => ({
                    url: ApiEndpoints.RECIPE,
                    method: 'GET',
                    params,
                }),

                providesTags: [Tags.RECIPE],
            }),
            getRecipeById: builder.query<Recipe, string>({
                query: (id: string) => ({
                    url: `${ApiEndpoints.RECIPE}/${id}`,
                    method: 'GET',
                }),
                providesTags: [Tags.RECIPE],
            }),

            getCategoryRecipes: builder.query<GetRecipesResponse, GetCategoryRecipesRequest>({
                query: ({ categoryId, ...rest }) => ({
                    url: `${ApiEndpoints.CATEGORY_RECIPES}/${categoryId}`,
                    method: 'GET',
                    params: rest,
                }),

                providesTags: [Tags.RECIPE],
            }),
        }),
    });

export const {
    useGetRecipesQuery,
    useGetCategoryRecipesQuery,
    usePrefetch,
    useGetRecipeByIdQuery,
} = recipeApiSlice;
