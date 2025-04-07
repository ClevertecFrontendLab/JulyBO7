import { RouteProps } from 'react-router';

import { MainPage } from '~/pages/main-page';
import { VeganCuisinePage } from '~/pages/vegan-cuisine-page';

export enum AppRoutes {
    MAIN = 'main',
    VEGAN = 'vegan-dishes',
    SALADS = 'salads',
    SNACKS = 'snacks',
    FIRST_DISHES = 'first-dishes',
    SECONDARY_DISHES = 'secondary-dishes',
    DESERTS = 'deserts-and-bakery',
    GRILL = 'grill-dishes',
    CHILDREN_DISHES = 'children-dishes',
    MEDICAL_NUTRITION = 'medical-nutrition',
    NATIONAL_DISHES = 'national-dishes',
    SAUCES = 'sauces',
    PROVISIONS = 'provisions',
    DRINKS = 'drinks',
    NOT_PAGE = 'not-page',
}

export type RoutePaths = {
    [name in AppRoutes]: string;
};

export const routePaths: RoutePaths = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.VEGAN]: '/vegan-dishes/',
    [AppRoutes.CHILDREN_DISHES]: '/children-dishes/',
    [AppRoutes.DESERTS]: '/deserts-and-bakery/',
    [AppRoutes.DRINKS]: '/drinks/',
    [AppRoutes.FIRST_DISHES]: '/first-dishes/',
    [AppRoutes.GRILL]: '/grill-dishes/',
    [AppRoutes.MEDICAL_NUTRITION]: '/medical-nutrition/',
    [AppRoutes.NATIONAL_DISHES]: '/national-dishes/',
    [AppRoutes.PROVISIONS]: '/provisions/',
    [AppRoutes.SNACKS]: '/snacks/',
    [AppRoutes.SECONDARY_DISHES]: '/secondary-dishes/',
    [AppRoutes.SAUCES]: '/sauces/',
    [AppRoutes.SALADS]: '/salads/',

    [AppRoutes.NOT_PAGE]: '/*',
};

export const routeConfig: RouteProps[] = [
    {
        path: routePaths[AppRoutes.MAIN],
        element: <MainPage />,
    },
    {
        path: `${routePaths[AppRoutes.VEGAN]}:item`,
        element: <VeganCuisinePage />,
    },
    {
        path: `${routePaths[AppRoutes.CHILDREN_DISHES]}:item`,
        element: <VeganCuisinePage />,
    },
    {
        path: `${routePaths[AppRoutes.DRINKS]}:item`,
        element: <VeganCuisinePage />,
    },
    {
        path: `${routePaths[AppRoutes.FIRST_DISHES]}:item`,
        element: <VeganCuisinePage />,
    },
    {
        path: `${routePaths[AppRoutes.GRILL]}:item`,
        element: <VeganCuisinePage />,
    },
    {
        path: `${routePaths[AppRoutes.MEDICAL_NUTRITION]}:item`,
        element: <VeganCuisinePage />,
    },
    {
        path: `${routePaths[AppRoutes.NATIONAL_DISHES]}:item`,
        element: <VeganCuisinePage />,
    },
    {
        path: `${routePaths[AppRoutes.PROVISIONS]}:item`,
        element: <VeganCuisinePage />,
    },
    {
        path: `${routePaths[AppRoutes.SALADS]}:item`,
        element: <VeganCuisinePage />,
    },
    {
        path: `${routePaths[AppRoutes.SAUCES]}:item`,
        element: <VeganCuisinePage />,
    },
    {
        path: `${routePaths[AppRoutes.SECONDARY_DISHES]}:item`,
        element: <VeganCuisinePage />,
    },
    {
        path: `${routePaths[AppRoutes.SNACKS]}:item`,
        element: <VeganCuisinePage />,
    },
];
