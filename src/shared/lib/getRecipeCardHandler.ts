import { NavigateFunction } from 'react-router';

import { Recipe } from '~/entities/recipe';

import { Category, SubCategory } from '../types/categories';

export const getRecipeCardHandler = (
    recipe: Recipe,
    navigate: NavigateFunction,
    categoryData: Category,
    subcategoryData: SubCategory,
) => {
    const handleCard = () => {
        const state = [
            {
                title: categoryData.title,
                path: `${categoryData.category}/${categoryData.subCategories[0].category}`,
                category: categoryData.category,
            },
            {
                title: subcategoryData.title,
                path: `/${categoryData.category}/${subcategoryData.category}`,
            },
            {
                title: recipe.title,
                path: `/${categoryData.category}/${subcategoryData.category}/${recipe._id}`,
            },
        ];
        navigate(`/${categoryData.category}/${subcategoryData.category}/${recipe._id}`, {
            state,
        });
    };
    return handleCard;
};
