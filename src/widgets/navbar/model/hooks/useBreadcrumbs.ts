import { useLocation, useNavigate } from 'react-router';

import { useGetCategoriesQuery } from '~/entities/category';
import { UrlState } from '~/shared/types/url';

export const useBreadcrumbs = () => {
    const location: { state: UrlState } = useLocation();
    const navigate = useNavigate();
    const { data: categories } = useGetCategoriesQuery();

    const crumbHandler = (path: string, title: string, category?: string) => {
        //category argument for category state
        let newState: UrlState;
        if (category && categories) {
            const categoryData = categories
                .filter((category) => !category.rootCategoryId)
                .find((item) => item.category === category)!;

            const defaultSubcategoryTitle = categoryData?.subCategories[0].title;
            newState = {
                breadcrumb: [
                    { title, path, category },
                    { title: defaultSubcategoryTitle, path },
                ],
            };
        } else {
            const index = location.state.breadcrumb.findIndex((item) => item.title === title);
            newState = {
                breadcrumb: location.state.breadcrumb.slice(0, index + 1),
            };
        }

        navigate(path, { state: newState });
    };

    return { state: location.state, crumbHandler, navigate };
};
