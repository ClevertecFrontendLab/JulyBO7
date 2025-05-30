import { apiSlice } from '~/shared/api';
import { ApiEndpoints } from '~/shared/api/constants/api';
import { Tags } from '~/shared/api/constants/tags';

import {
    CreateDraftRequest,
    CreateNewRecipeRequest,
    GetCategoryRecipesRequest,
    GetMeasureUnitsResponse,
    GetRecipesResponse,
    RequestParams,
    UploadFileResponse,
} from '../types/params';
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
            createRecipe: builder.mutation<Recipe, CreateNewRecipeRequest>({
                query: (body) => ({
                    url: `${ApiEndpoints.RECIPE}`,
                    method: 'POST',
                    body,
                }),

                invalidatesTags: [Tags.RECIPE],
            }),
            getMeasureUnits: builder.query<GetMeasureUnitsResponse, void>({
                query: () => ({
                    url: ApiEndpoints.MEASURE_UNITS,
                    method: 'GET',
                }),
            }),
            uploadFile: builder.mutation<UploadFileResponse, FormData>({
                query: (formData) => ({
                    url: ApiEndpoints.FILE_UPLOAD,
                    method: 'POST',
                    body: formData,
                }),

                invalidatesTags: [Tags.RECIPE],
            }),
            createDraft: builder.mutation<void, CreateDraftRequest>({
                query: (body) => ({
                    url: ApiEndpoints.RECIPE_DRAFT,
                    method: 'POST',
                    body,
                }),
            }),
        }),
    });

export const {
    useGetRecipesQuery,
    useGetCategoryRecipesQuery,
    usePrefetch,
    useGetRecipeByIdQuery,
    useGetMeasureUnitsQuery,
    useCreateRecipeMutation,
    useUploadFileMutation,
    useCreateDraftMutation,
} = recipeApiSlice;
