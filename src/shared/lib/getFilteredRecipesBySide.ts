import { Recipe } from '../types/recipe';

export const getFilteredRecipesBySide = (recipes: Recipe[], side: string[]) => {
    let filteredRecipes;
    if (side.length > 0) {
        filteredRecipes = recipes.filter((recipe) => {
            const sideItem = mappedSides.find((item) => item.name === recipe.side);
            const result = side.find((item) => item === sideItem?.value);

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
const mappedSides = [
    { name: 'potatoes', value: 'Картошка' },
    { name: 'buckwheat', value: 'Гречка' },
    { name: 'pasta', value: 'Паста' },
    { name: 'spaghetti', value: 'Спагетти' },
    { name: 'rice', value: 'Рис' },
    { name: 'cabbage', value: 'Капуста' },
    { name: 'beans', value: 'Фасоль' },
];
