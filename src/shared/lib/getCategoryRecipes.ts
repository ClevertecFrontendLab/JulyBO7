import { Category } from '../types/categories';
import { Recipe } from '../types/recipe';

export const getCategoryRecipes = (recipes: Recipe[], category: Category) =>
    recipes.filter((recipe) => recipe.category.find((item) => item === category));
