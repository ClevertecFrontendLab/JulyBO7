import { useLocation, useNavigate } from 'react-router';

import { useGetCategoriesQuery } from '~/entities/category';

import { BreadcrumbsState, CrumbState } from '../types/breadcrumb';

export const useBreadcrumbs = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { data: categories } = useGetCategoriesQuery();

    const crumbHandler = (path: string, title: string, category?: string) => {
        //category argument for category state
        let newState: BreadcrumbsState;
        if (category && categories) {
            const categoryData = categories
                .filter((category) => !category.rootCategoryId)
                .find((item) => item.category === category)!;

            const defaultSubcategoryTitle = categoryData?.subCategories[0].title;
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

    return { state, crumbHandler, navigate };
};
