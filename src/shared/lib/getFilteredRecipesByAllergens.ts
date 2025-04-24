import { Recipe } from '../types/recipe';

export const getFilteredRecipesByAllergens = (recipes: Recipe[], allergens: string[]) => {
    const filteredRecipes = recipes.filter((recipe) => {
        let result;
        for (let i = 0; i < allergens.length; i++) {
            result = recipe.ingredients.find((ingred) => {
                const currentAllergen = allergens[i];
                const reg = new RegExp(currentAllergen, 'i');
                return ingred.title.match(reg);
            });
            if (result) break;
        }
        if (result) {
            return false;
        } else {
            return true;
        }
    });
    return filteredRecipes;
};
