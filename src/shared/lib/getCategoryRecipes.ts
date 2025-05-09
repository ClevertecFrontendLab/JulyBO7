import { Recipe } from '~/entities/recipe';

import { Category } from '../types/categories';

export const getCategoryRecipes = (recipes: Recipe[], category: Category) =>
    recipes.filter((recipe) => recipe.category.find((item) => item === category));
