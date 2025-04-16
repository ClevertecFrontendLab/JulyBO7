import { routePaths } from '~/shared/config/route-config/router';
import { getMenuItems } from '~/shared/lib/getMenuItems';

import { BreadCrumbItem } from '../ui/bread-crumb/BreadCrumb';

const menuItems = getMenuItems();

const mapPathTitle = [
    ...menuItems,
    {
        routePath: `${routePaths.juiciest}`,
        title: 'Самое сочное',
        items: [],
    },
];

export const getBreadCrimbers = (path: string) => {
    const breadCrimbers: BreadCrumbItem[] = [{ text: 'Главная', path: '/' }];

    const currentPathSegments = path.split('/');

    const currentMenuItem = mapPathTitle.find(
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
