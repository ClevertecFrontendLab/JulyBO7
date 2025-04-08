import { getMenuItems } from '~/widgets/menu/model/getMenuItems';

import { BreadCrumbItem } from '../ui/bread-crumb/BreadCrumb';

export const getBreadCrimbers = (path: string) => {
    const breadCrimbers: BreadCrumbItem[] = [{ text: 'Главная', path: '/' }];

    const currentPathSegments = path.split('/');
    const menuItems = getMenuItems();
    const currentMenuItem = menuItems.find(
        (item) => item.routePath.split('/')[1] === currentPathSegments[1],
    );

    if (currentMenuItem) {
        breadCrimbers.push({ text: currentMenuItem.title, path: currentMenuItem.routePath });
        const currentSubItemMenu = currentMenuItem.items.find(
            (item) => item.routePath.split('/')[2] === currentPathSegments[2],
        );
        if (currentSubItemMenu) {
            breadCrimbers.push({
                text: currentSubItemMenu.title,
                path: currentSubItemMenu.routePath,
            });
        }
    }
    return breadCrimbers;
};
