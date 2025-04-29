import { getMenuItems } from './getMenuItems';

export const getCurrentCategoryByPath = (path: string) => {
    const menuItems = getMenuItems();
    const pathSegments = path.split('/');
    const currentMenuItem = menuItems.find((item) => item.category === pathSegments[1]);
    let index;
    if (currentMenuItem) {
        index = currentMenuItem.items.findIndex((item) => item.subCategory === pathSegments[2]);
        if (index === -1) {
            return;
        }
    }

    return index;
};
