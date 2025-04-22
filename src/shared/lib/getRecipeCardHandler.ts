import { NavigateFunction } from 'react-router';

import { CategoryData, mappedCategoryData } from '../mappedCategoriesData';
import { Category, SubCategory } from '../types/categories';
import { Recipe } from '../types/recipe';
import { getCategoryAndSubcatFromRecipe } from './getCategoryAndSubcategoryFromRecipe';

export const getRecipeCardHandler = (
    data: Recipe,
    navigate: NavigateFunction,
    category?: Category,
    subcategory?: SubCategory,
) => {
    let currentCategory: Partial<CategoryData>;
    let currentSubcategory: SubCategory;
    let handleCard: () => void;

    if (category && subcategory) {
        currentCategory = mappedCategoryData[category];
        currentSubcategory = subcategory;
        handleCard = () => {
            const state = [
                {
                    title: currentCategory.title,
                    path: currentCategory.defaultPath,
                },
                {
                    title: currentCategory.subcategoryData[currentSubcategory]?.title,
                    path: `/${category}/${currentSubcategory}`,
                },
                {
                    title: data.title,
                    path: `/${category}/${currentSubcategory}/${data.id}`,
                },
            ];
            navigate(`/${category}/${currentSubcategory}/${data.id}`, { state });
        };
    } else {
        currentCategory = getCategoryAndSubcatFromRecipe(data).currentCategory; //для слайдера и самое вкусное - 1-ая категория и 1ая подходящую под категорию подкатегория
        currentSubcategory = getCategoryAndSubcatFromRecipe(data).currentSubcategory;
        handleCard = () => {
            const state = [
                {
                    title: currentCategory.title,
                    path: currentCategory.defaultPath,
                },
                {
                    title: currentCategory.subcategoryData[currentSubcategory]?.title,
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
