import { Recipe } from '../types/recipe';

export const getFilteredRecipesByMeet = (recipes: Recipe[], meat: string[]) => {
    let filteredRecipes;
    if (meat.length > 0) {
        filteredRecipes = recipes.filter((recipe) => {
            const meetItem = mappedMeat.find((item) => item.name === recipe.meat);
            const result = meat.find((item) => item === meetItem?.value);

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

//[картошка] - potatous
const mappedMeat = [
    { name: 'chicken', value: 'Курица' },
    { name: 'pork', value: 'Свинина' },
    { name: 'beef', value: 'Говядина' },
    { name: 'turkey', value: 'Индейка' },
    { name: 'duck', value: 'Утка' },
];
