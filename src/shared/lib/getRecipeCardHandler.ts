import { NavigateFunction } from 'react-router';

import { mappedCategoryData } from '../mappedCategoriesData';
import { Category, SubCategory } from '../types/categories';
import { Recipe } from '../types/recipe';
import { getCategoryAndSubcatFromRecipe } from './getCategoryAndSubcategoryFromRecipe';

//* возвращает фцнкцию для onCook карточки рецепта (для карточки в слайдере)

export const getRecipeCardHandler = (
    data: Recipe,
    navigate: NavigateFunction,
    category?: Category,
    subcategory?: SubCategory,
) => {
    let handleCard: () => void;

    if (category && subcategory) {
        const currentCategoryData = mappedCategoryData[category];

        handleCard = () => {
            const state = [
                {
                    title: currentCategoryData.title,
                    path: currentCategoryData.defaultPath,
                    category,
                },
                {
                    title: currentCategoryData.subcategoryData[subcategory]?.title,
                    path: `/${category}/${subcategory}`,
                },
                {
                    title: data.title,
                    path: `/${category}/${subcategory}/${data.id}`,
                },
            ];
            navigate(`/${category}/${subcategory}/${data.id}`, { state });
        };
    } else {
        const { currentCategoryData, currentSubcategory, currentCategory } =
            getCategoryAndSubcatFromRecipe(data); //для слайдера и самое вкусное - 1-ая категория и 1ая подходящая под категорию подкатегория

        handleCard = () => {
            const state = [
                {
                    title: currentCategoryData.title,
                    path: currentCategoryData.defaultPath,
                    category: currentCategory,
                },
                {
                    title: currentCategoryData.subcategoryData[currentSubcategory]?.title,
                    path: `/${data.category[0]}/${currentSubcategory}`,
                },
                {
                    title: data.title,
                    path: `/${data.category[0]}/${currentSubcategory}/${data.id}`,
                },
            ];

            navigate(`/${data.category[0]}/${currentSubcategory}/${data.id}`, { state });
        };
    }
    return handleCard;
};
