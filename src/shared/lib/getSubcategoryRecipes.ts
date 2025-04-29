import { Category, SubCategory } from '../types/categories';
import { Recipe } from '../types/recipe';

export const getSubcategoryRecipes = (
    recipes: Recipe[],
    category: Category,
    subcat: SubCategory,
): Recipe[] =>
    recipes.filter(
        (recipe) =>
            recipe.category.find((item) => item === category) &&
            recipe.subcategory.find((item) => item === subcat),
    );
