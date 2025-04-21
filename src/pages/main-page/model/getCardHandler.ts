import { NavigateFunction } from 'react-router';

import { getCategoryAndSubcatFromRecipe } from '~/shared/lib/getCategoryAndSubcategoryFromRecipe';
import { Recipe } from '~/shared/types/recipe';

export const getCardHandler = (data: Recipe, navigate: NavigateFunction) => {
    const { currentCategory, currentSubcategory } = getCategoryAndSubcatFromRecipe(data);

    const handleCard = () => {
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
    return handleCard;
};
