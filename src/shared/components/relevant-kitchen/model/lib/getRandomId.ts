import { Category } from '~/shared/types/categories';

export const getRandomId = (categories?: Category[]) => {
    let randomCategoryId = '';
    let randomSubcategoryId = '';

    if (categories && Array.isArray(categories)) {
        const subcategories = categories.filter((category) => category.rootCategoryId);

        const categoryIds = subcategories.map((category) => category._id);
        const randomIndex = Math.floor(Math.random() * categoryIds.length);
        randomSubcategoryId = categoryIds[randomIndex];

        randomCategoryId = categories.find(
            (categ) => categ._id === randomSubcategoryId,
        )!.rootCategoryId!;
    }
    return { randomSubcategoryId, randomCategoryId };
};
