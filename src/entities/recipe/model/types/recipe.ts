export type Step = {
    stepNumber: number;
    description: string;
    image: string;
};
export type NutritionValue = {
    calories: number;
    protein: number;
    fats: number;
    carbohydrates: number;
};
export type Ingredient = {
    title: string;
    count: number;
    measureUnit: string;
};
export type Recipe = {
    title: string;
    description: string;
    time: number;
    image: string;
    meat: string;
    garnish: string;
    portions: number;
    authorId: string;
    categoriesIds: string[];
    steps: Step[];
    nutritionValue: NutritionValue;
    ingredients: Ingredient[];
    likes: number;
    views: number;
    bookmarks: number;
    createdAt: string;
    _id: string;
};
