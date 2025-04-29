import { mappedCategoryData } from '../mappedCategoriesData';
import { Recipe } from '../types/recipe';

export const getFilteredRecipesByCategory = (recipes: Recipe[], category: string[]) => {
    let filteredRecipes;

    if (category.length > 0) {
        filteredRecipes = recipes.filter((recipe) => {
            let result;
            for (let i = 0; i < category.length; i++) {
                result = recipe.category.find(
                    (item) => mappedCategoryData[item].title === category[i],
                );
                if (result) break;
            }
            if (result) {
                return true;
            } else {
                return false;
            }
        });
    } else {
        filteredRecipes = recipes;
    }
    return filteredRecipes;
};
