import { Recipe } from './recipe';

export type RequestParams = {
    page?: number;
    limit?: number;
    allergens?: string;
    searchString?: string;
    meat?: string;
    garnish?: string;
    subcategoriesIds?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
};
type Meta = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type GetRecipesResponse = {
    data: Recipe[];
    meta: Meta;
};
export type GetCategoryRecipesRequest = {
    categoryId: string;
    allergens?: string;
    searchString?: string;
    page?: number;
    limit?: number;
};
