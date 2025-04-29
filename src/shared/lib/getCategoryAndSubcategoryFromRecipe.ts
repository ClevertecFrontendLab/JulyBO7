import { mappedCategoryData } from '../mappedCategoriesData';
import { SubCategory } from '../types/categories';
import { Recipe } from '../types/recipe';

export const getCategoryAndSubcatFromRecipe = (data: Recipe) => {
    const currentCategoryData = mappedCategoryData[data.category[0]];
    const currentCategory = data.category[0];

    let currentSubcategory: SubCategory;

    for (let i = 0; i <= data.subcategory.length; i++) {
        currentSubcategory =
            mappedCategoryData[data.category[0]].subcategory?.find(
                (item) => item === data.subcategory[i],
            ) ?? ('' as SubCategory);
        if (currentSubcategory) break;
    }
    return {
        currentCategoryData,
        currentCategory,
        currentSubcategory,
    };
};
