import { Category } from '~/shared/types/categories';

export const getCurrentCategoryByPath = (path: string, data: Category[] | Category) => {
    let currentMenuItem: Category;
    let index;

    const pathSegments = path.split('/');

    if (Array.isArray(data)) {
        currentMenuItem = data.find((item) => item.category === pathSegments[1])!;
    } else {
        currentMenuItem = data;
    }

    if (currentMenuItem && Array.isArray(currentMenuItem.subCategories)) {
        index = currentMenuItem.subCategories.findIndex(
            (item) => item.category === pathSegments[2],
        );
        if (index === -1) {
            return;
        }
    }

    return index;
};
