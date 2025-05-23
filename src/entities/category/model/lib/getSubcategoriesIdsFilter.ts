import { Category } from '~/shared/types/categories';

export const getSubcategoriesIdsFilter = (categoryFilter: string[], categories: Category[]) => {
    const categoriesData = Array.isArray(categories)
        ? categories.filter((cat) => !cat.rootCategoryId)
        : [];
    const subcategoriesIds: string[] = [];

    for (let i = 0; i < categoryFilter.length; i++) {
        const data = categoriesData?.find((data) => data.title === categoryFilter[i]);
        if (data) {
            data.subCategories.forEach((sub) => subcategoriesIds.push(sub._id));
        }
    }
    return subcategoriesIds;
};
