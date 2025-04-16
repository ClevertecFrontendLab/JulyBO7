import { ReactElement } from 'react';
import { RouteProps } from 'react-router';

import { JuiciestPage } from '~/pages/juiciest-page';
import { MainPage } from '~/pages/main-page';
import {
    BakeryPage,
    FirstDishesPage,
    SnacksPage,
    VeganCuisinePage,
} from '~/pages/vegan-cuisine-page';
import { DesertsPage } from '~/pages/vegan-cuisine-page/ui/deserts-page/DesertsPage';
import { DrinksPage } from '~/pages/vegan-cuisine-page/ui/drinks-page/DrinksPage';
import { RawFoodDishesPage } from '~/pages/vegan-cuisine-page/ui/raw-food-dishes-page/RawFoodDishesPage';
import { SecondDishesPage } from '~/pages/vegan-cuisine-page/ui/second-dishes-page/SecondDishesPage';
import { SideDishesPage } from '~/pages/vegan-cuisine-page/ui/side-dishes-page/SideDishesPage';
import { Category, SubCategory } from '~/shared/types/categories';

type AppRoutes = Category | 'main' | 'juiciest' | 'not-page';

export type RoutePaths = {
    [name in AppRoutes]: string;
};

export const routePaths: RoutePaths = {
    main: '/',
    juiciest: '/juiciest',
    vegan: '/vegan/',
    'children-dish': '/children-dish/',
    'desert-bakery': '/desert-bakery/',
    drinks: '/drinks/',
    'first-dish': '/first-dish/',
    grill: '/grill/',
    'medical-nutrition': '/medical-nutrition/',
    national: '/national/',
    provisions: '/provisions/',
    snacks: '/snacks/',
    'second-dish': '/second-dish/',
    sauces: '/sauces/',
    salads: '/salads/',
    'not-page': '/*',
};

export type RouteConfig = {
    path: string;
    element: ReactElement;
    childrenRoutes?: (Omit<RouteProps, 'path'> & { path: SubCategory })[];
};
export const routeConfig: RouteConfig[] = [
    {
        path: routePaths.main,
        element: <MainPage />,
    },
    {
        path: routePaths.juiciest,
        element: <JuiciestPage />,
    },

    {
        path: `${routePaths.vegan}`,
        element: <VeganCuisinePage />,
        childrenRoutes: [
            { path: 'snacks', element: <SnacksPage />, index: true },
            { path: 'first-dish', element: <FirstDishesPage /> },
            { path: 'second-dish', element: <SecondDishesPage /> },
            { path: 'side-dishes', element: <SideDishesPage /> },
            { path: 'deserts', element: <DesertsPage /> },
            { path: 'bakery', element: <BakeryPage /> },
            { path: 'raw-food-dishes', element: <RawFoodDishesPage /> },
            { path: 'drinks', element: <DrinksPage /> },
        ],
    },
    {
        path: `${routePaths['children-dish']}:item`,
        element: <VeganCuisinePage />,
    },
    {
        path: `${routePaths.drinks}:item`,
        element: <VeganCuisinePage />,
    },
    {
        path: `${routePaths['first-dish']}:item`,
        element: <VeganCuisinePage />,
    },
    {
        path: `${routePaths.grill}:item`,
        element: <VeganCuisinePage />,
    },
    {
        path: `${routePaths['medical-nutrition']}:item`,
        element: <VeganCuisinePage />,
    },
    {
        path: `${routePaths.national}:item`,
        element: <VeganCuisinePage />,
    },
    {
        path: `${routePaths.provisions}:item`,
        element: <VeganCuisinePage />,
    },
    {
        path: `${routePaths.salads}:item`,
        element: <VeganCuisinePage />,
    },
    {
        path: `${routePaths.sauces}:item`,
        element: <VeganCuisinePage />,
    },
    {
        path: `${routePaths['second-dish']}:item`,
        element: <VeganCuisinePage />,
    },
    {
        path: `${routePaths.snacks}:item`,
        element: <VeganCuisinePage />,
    },
];

// export enum AppRoutes {
//     MAIN = 'main',
//     JUICIEST = 'juiciest',
//     VEGAN = 'vegan',
//     SALADS = 'salads',
//     SNACKS = 'snacks',
//     FIRST_DISH = 'first-dishes',
//     SECOND_DISH = 'second-dishes',
//     DESERTS_BAKERY = 'deserts-bakery',
//     GRILL = 'grill-dishes',
//     CHILDREN_DISH = 'children-dishes',
//     MEDICAL_NUTRITION = 'medical-nutrition',
//     NATIONAL = 'national',
//     SAUCES = 'sauces',
//     PROVISIONS = 'provisions',
//     DRINKS = 'drinks',
//     NOT_PAGE = 'not-page',
// }
// export const routePaths: RoutePaths = {
//     [AppRoutes.MAIN]: '/',
//     [AppRoutes.JUICIEST]: '/juiciest',
//     [AppRoutes.VEGAN]: '/vegan/',
//     [AppRoutes.CHILDREN_DISHES]: '/children-dish/',
//     [AppRoutes.DESERTS]: '/desert-bakery/',
//     [AppRoutes.DRINKS]: '/drinks/',
//     [AppRoutes.FIRST_DISHES]: '/first-dish/',
//     [AppRoutes.GRILL]: '/grill/',
//     [AppRoutes.MEDICAL_NUTRITION]: '/medical-nutrition/',
//     [AppRoutes.NATIONAL_DISHES]: '/national/',
//     [AppRoutes.PROVISIONS]: '/provisions/',
//     [AppRoutes.SNACKS]: '/snacks/',
//     [AppRoutes.SECONDARY_DISHES]: '/second-dish/',
//     [AppRoutes.SAUCES]: '/sauces/',
//     [AppRoutes.SALADS]: '/salads/',

//     [AppRoutes.NOT_PAGE]: '/*',
// };
