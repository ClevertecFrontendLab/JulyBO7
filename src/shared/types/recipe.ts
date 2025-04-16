import { Category, SubCategory } from './categories';

export type NutritionValue = {
    calories: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
};

type Ingredient = {
    title: string;
    count: string;
    measureUnit: string;
};

type Step = {
    stepNumber: number;
    description: string;
    image: string;
};

export type Recipe = {
    id: string;
    title: string;
    description: string;
    category: Category[];
    subcategory: SubCategory[];
    image: string;
    bookmarks: number;
    likes: number;
    date: string;
    time: string;
    nutritionValue: NutritionValue;
    ingredients: Ingredient[];
    steps: Step[];
    portions?: number;
    meat?: string;
    side?: string;
};
