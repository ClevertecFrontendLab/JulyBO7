import { ReactElement } from 'react';

import { FilteredRecipesPage } from '~/pages/filtered-resipes';
import { JuiciestPage } from '~/pages/juiciest-page';
import { MainPage } from '~/pages/main-page';
import { RecipePage } from '~/pages/recipe-page/ui/RecipePage';
import {
    DumplingsPage,
    FishPage,
    FlourSideDishesPage,
    MashroomPage,
    MeetPage,
    OffalPage,
    PizzaPage,
    PoultryDishesPage,
    SecondDishesPage,
    SteamedDishesPage,
    SushiPage,
    VegetableGarnishPage,
    VegetablesPage,
} from '~/pages/second-dishes-page';
import {
    BakeryPage,
    FirstDishesPage,
    SnacksPage,
    VeganCuisinePage,
} from '~/pages/vegan-cuisine-page';
import { SecondDishPage } from '~/pages/vegan-cuisine-page';
import { DesertsPage } from '~/pages/vegan-cuisine-page';
import { DrinksPage } from '~/pages/vegan-cuisine-page';
import { RawFoodDishesPage } from '~/pages/vegan-cuisine-page';
import { SideDishesPage } from '~/pages/vegan-cuisine-page';
import { Category } from '~/shared/types/categories';

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
    childrenRoutes?: {
        path: string;
        element: ReactElement;

        childrenRoute?: {
            path: string;
            element: ReactElement;
        };
    }[];
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
        path: `${routePaths.juiciest}:recipeId`,
        element: <RecipePage />,
    },
    {
        path: '/filtered-recipes',
        element: <FilteredRecipesPage />,
    },
    //vegan category:
    {
        path: `${routePaths.vegan}snacks/:recipeId`,
        element: <RecipePage />,
    },
    {
        path: `${routePaths.vegan}first-dish/:recipeId`,
        element: <RecipePage />,
    },
    {
        path: `${routePaths.vegan}second-dish/:recipeId`,
        element: <RecipePage />,
    },
    {
        path: `${routePaths.vegan}side-dishes/:recipeId`,
        element: <RecipePage />,
    },
    {
        path: `${routePaths.vegan}deserts/:recipeId`,
        element: <RecipePage />,
    },
    {
        path: `${routePaths.vegan}bakery/:recipeId`,
        element: <RecipePage />,
    },
    {
        path: `${routePaths.vegan}vegetables/:recipeId`,
        element: <RecipePage />,
    },
    {
        path: `${routePaths.vegan}drinks/:recipeId`,
        element: <RecipePage />,
    },

    {
        path: `${routePaths.vegan}`,
        element: <VeganCuisinePage />,
        childrenRoutes: [
            { path: 'snacks', element: <SnacksPage /> },
            { path: 'first-dish', element: <FirstDishesPage /> },
            { path: 'second-dish', element: <SecondDishPage /> },
            { path: 'side-dishes', element: <SideDishesPage /> },
            { path: 'deserts', element: <DesertsPage /> },
            { path: 'bakery', element: <BakeryPage /> },
            { path: 'vegetables', element: <RawFoodDishesPage /> },
            { path: 'drinks', element: <DrinksPage /> },
        ],
    },
    //second-dish category:
    {
        path: `${routePaths['second-dish']}`,
        element: <SecondDishesPage />,
        childrenRoutes: [
            { path: 'meet', element: <MeetPage /> },
            { path: 'fish', element: <FishPage /> },
            { path: 'vegetables', element: <VegetablesPage /> },
            { path: 'poultry-dish', element: <PoultryDishesPage /> },
            { path: 'mashroom', element: <MashroomPage /> },
            { path: 'offal', element: <OffalPage /> },
            { path: 'steamed-dishes', element: <SteamedDishesPage /> },
            { path: 'dumplings', element: <DumplingsPage /> },
            { path: 'flour-side-dishes', element: <FlourSideDishesPage /> },
            { path: 'vegetable-garnish', element: <VegetableGarnishPage /> },
            { path: 'pizza', element: <PizzaPage /> },
            { path: 'sushi', element: <SushiPage /> },
        ],
    },
    {
        path: `${routePaths['second-dish']}meet/:recipeId`,
        element: <RecipePage />,
    },
    {
        path: `${routePaths['second-dish']}fish/:recipeId`,
        element: <RecipePage />,
    },
    {
        path: `${routePaths['second-dish']}vegetables/:recipeId`,
        element: <RecipePage />,
    },
    {
        path: `${routePaths['second-dish']}poultry-dish/:recipeId`,
        element: <RecipePage />,
    },
    {
        path: `${routePaths['second-dish']}mashroom/:recipeId`,
        element: <RecipePage />,
    },
    {
        path: `${routePaths['second-dish']}offal/:recipeId`,
        element: <RecipePage />,
    },
    {
        path: `${routePaths['second-dish']}steamed-dishes/:recipeId`,
        element: <RecipePage />,
    },
    {
        path: `${routePaths['second-dish']}dumplings/:recipeId`,
        element: <RecipePage />,
    },
    {
        path: `${routePaths['second-dish']}flour-side-dishes/:recipeId`,
        element: <RecipePage />,
    },
    {
        path: `${routePaths['second-dish']}vegetable-garnish/:recipeId`,
        element: <RecipePage />,
    },
    {
        path: `${routePaths['second-dish']}pizza/:recipeId`,
        element: <RecipePage />,
    },
    {
        path: `${routePaths['second-dish']}sushi/:recipeId`,
        element: <RecipePage />,
    },

    //children dishes category:
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
