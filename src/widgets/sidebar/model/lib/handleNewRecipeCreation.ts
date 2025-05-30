import { NavigateFunction } from 'react-router';

import { AppRoutes, routePaths } from '~/shared/config/router';

export const handleNewRecipeCreation = (navigate: NavigateFunction) => {
    const state = {
        breadcrumb: [
            {
                title: 'Новый рецепт',
                path: routePaths[AppRoutes.NEW_RECIPE],
            },
        ],
    };
    navigate(routePaths[AppRoutes.NEW_RECIPE], { state });
};
