import { NavigateFunction } from 'react-router';

import { getMenuItems } from '~/shared/lib/getMenuItems';
import { Category } from '~/shared/types/categories';

import { CrumbState } from '../ui/bread-crumb/BreadCrumb';

type BreadcrumbsState = CrumbState[];

export const getCrumbHandler = (navigate: NavigateFunction, state: BreadcrumbsState) => {
    const crumbHandler = (path: string, title: string, category?: Category) => {
        //category argument for category state
        let newState: BreadcrumbsState;
        if (category) {
            const categoryData = getMenuItems().find((item) => item.category === category)!;
            const defaultSubcategoryTitle = categoryData.items[0].title;
            newState = [
                { title, path, category },
                { title: defaultSubcategoryTitle, path },
            ];
        } else {
            const index = state.findIndex((item: CrumbState) => item.title === title);
            newState = state.slice(0, index + 1);
        }

        navigate(path, { state: newState });
    };

    return crumbHandler;
};
