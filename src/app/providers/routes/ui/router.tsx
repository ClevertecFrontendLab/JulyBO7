import { createBrowserRouter, Navigate, RouteObject } from 'react-router';

import { SignUpForm } from '~/features/auth';
import { AuthPage, LoginPage } from '~/pages/auth-page';
import { CategoryPage } from '~/pages/category-page';
import { EditRecipePage } from '~/pages/edit-recipe-page';
import { ErrorPage } from '~/pages/error-page';
import { JuiciestPage } from '~/pages/juiciest-page';
import { MainPage } from '~/pages/main-page';
import { NewRecipePage } from '~/pages/new-recipe-page';
import { RecipePage } from '~/pages/recipe-page';
import { SubcategoryPage } from '~/pages/subcategory-page';
import { VerificationPage } from '~/pages/verification-page';
import { AppLayout } from '~/shared/components/layouts';
import { AppRoutes, routePaths } from '~/shared/config/router';
import { LOCAL_STORAGE_CATEGORIES_KEY } from '~/shared/constants/localStorage';
import { Category } from '~/shared/types/categories';
import { Footer } from '~/widgets/footer';
import { Menu } from '~/widgets/menu';
import { Navbar } from '~/widgets/navbar';
import { Sidebar } from '~/widgets/sidebar/ui/Sidebar';

const categoriesLC = localStorage.getItem(LOCAL_STORAGE_CATEGORIES_KEY);
const categories = categoriesLC ? JSON.parse(categoriesLC) : [];

const getCategoriesRouteElements = (categoryData: Category): RouteObject => ({
    path: `/${categoryData.category}/`,
    element: (
        <AppLayout header={<Navbar />} footer={<Footer />} menu={<Menu />} sidebar={<Sidebar />}>
            <CategoryPage categoryData={categoryData} />
        </AppLayout>
    ),
    children: categoryData.subCategories.map((subcat) => ({
        path: `${subcat.category}`,
        element: <SubcategoryPage categoryData={categoryData} subcategoryData={subcat} />,
    })),
});

const categoriesRoutes = categories
    .filter((item) => !item.rootCategoryId)
    .map(getCategoriesRouteElements);

const getRecipeRoutes = (categoryData: Category): RouteObject => ({
    path: `/${categoryData.category}/`,
    children: categoryData.subCategories.map((subcat) => ({
        path: `${subcat.category}/:recipeId`,
        element: (
            <AppLayout
                header={<Navbar />}
                footer={<Footer />}
                menu={<Menu />}
                sidebar={<Sidebar />}
            >
                <RecipePage />
            </AppLayout>
        ),
    })),
});

const recipeRoutes: RouteObject[] = categories
    .filter((item) => !item.rootCategoryId)
    .map(getRecipeRoutes);

const editRecipeRoutes: RouteObject[] = recipeRoutes.map((recipeRoute) => ({
    path: `/edit-recipe${recipeRoute.path}`,
    children: recipeRoute.children?.map((childrenRoute) => ({
        ...childrenRoute,
        element: (
            <AppLayout
                header={<Navbar />}
                footer={<Footer />}
                menu={<Menu />}
                sidebar={<Sidebar />}
            >
                <EditRecipePage />
            </AppLayout>
        ),
    })),
}));

export const router = createBrowserRouter([
    {
        path: routePaths[AppRoutes.MAIN],
        element: (
            <AppLayout
                header={<Navbar />}
                footer={<Footer />}
                menu={<Menu />}
                sidebar={<Sidebar />}
            >
                <MainPage />
            </AppLayout>
        ),
    },
    ...categoriesRoutes,
    ...recipeRoutes,
    ...editRecipeRoutes,

    {
        path: routePaths[AppRoutes.THE_JUICIEST],
        element: (
            <AppLayout
                header={<Navbar />}
                footer={<Footer />}
                menu={<Menu />}
                sidebar={<Sidebar />}
            >
                <JuiciestPage />
            </AppLayout>
        ),
    },
    {
        path: routePaths[AppRoutes.NEW_RECIPE],
        element: (
            <AppLayout header={<Navbar />} footer={<Footer />} menu={<Menu />}>
                <NewRecipePage />
            </AppLayout>
        ),
    },
    {
        path: routePaths[AppRoutes.VERIFICATION],
        element: <VerificationPage />,
    },
    {
        element: <AuthPage />,
        children: [
            {
                path: routePaths[AppRoutes.LOGIN],
                element: <LoginPage />,
            },
            {
                path: routePaths[AppRoutes.SIGNUP],
                element: <SignUpForm />,
            },
        ],
    },
    {
        path: routePaths[AppRoutes.NOT_FOUND],
        element: (
            <AppLayout
                header={<Navbar />}
                footer={<Footer />}
                menu={<Menu />}
                sidebar={<Sidebar />}
            >
                <ErrorPage />
            </AppLayout>
        ),
    },
    {
        path: '*',
        element: <Navigate to={routePaths[AppRoutes.NOT_FOUND]} />,
    },
]);
