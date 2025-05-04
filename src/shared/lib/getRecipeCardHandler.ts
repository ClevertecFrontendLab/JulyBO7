import { NavigateFunction } from 'react-router';

import { Recipe } from '~/entities/recipe';

import { Category, SubCategory } from '../types/categories';

// import { mappedCategoryData } from '../mappedCategoriesData';

//* возвращает фцнкцию для onCook карточки рецепта (для карточки в слайдере) -закидывает нужный стейт для хлебных крошек
// разделить логику - в слайдере будет запрашиваться subcategory по аервому в массиве айдишнику - получу подкатегорию и по ее idRoot запрошу категорию, функуию сократить без блока else
export const getRecipeCardHandler = (
    recipe: Recipe,
    navigate: NavigateFunction,
    categoryData?: Category,
    subcategoryData?: SubCategory,
) => {
    let handleCard: () => void;

    if (categoryData && subcategoryData) {
        // const currentCategoryData = mappedCategoryData[category];

        handleCard = () => {
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
    }

    // else {
    //     const { currentCategoryData, currentSubcategory, currentCategory } =
    //         getCategoryAndSubcatFromRecipe(data); //для слайдера и самое вкусное - 1-ая категория и 1ая подходящая под категорию подкатегория

    //     handleCard = () => {
    //         const state = [
    //             {
    //                 title: currentCategoryData.title,
    //                 path: currentCategoryData.defaultPath,
    //                 category: currentCategory,
    //             },
    //             {
    //                 title: currentCategoryData.subcategoryData[currentSubcategory]?.title,
    //                 path: `/${data.category[0]}/${currentSubcategory}`,
    //             },
    //             {
    //                 title: data.title,
    //                 path: `/${data.category[0]}/${currentSubcategory}/${data.id}`,
    //             },
    //         ];

    //         navigate(`/${data.category[0]}/${currentSubcategory}/${data.id}`, { state });
    //     };
    // }
    return handleCard;
};
