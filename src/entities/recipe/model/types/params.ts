import { Ingredient, Recipe, Step } from './recipe';

export type RequestParams = Partial<{
    page: number;
    limit: number;
    allergens: string;
    searchString: string;
    meat: string;
    garnish: string;
    subcategoriesIds: string;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
}>;

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

export type CreateNewRecipeRequest = {
    categoriesIds: string[];
    title: string;
    description: string;
    time: number;
    portions: number;
    image: string;
    steps: (Omit<Step, 'image'> & { image?: string })[];
    ingredients: Ingredient[];
};

export type UpdateRecipeRequest = {
    id: string;
    formData: CreateNewRecipeRequest;
};
export type MeasureUnits = {
    _id: string;
    name: string;
};
export type GetMeasureUnitsResponse = MeasureUnits[];

export type UploadFileResponse = {
    name: string;
    url: string;
    _id: string;
};
export type CreateDraftRequest = Partial<Omit<CreateNewRecipeRequest, 'title'>> & { title: string };
