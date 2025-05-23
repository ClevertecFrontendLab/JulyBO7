import { memo } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import { useGetCategoriesQuery } from '~/entities/category';
import { SignUpForm } from '~/features/auth';
import { AuthPage, LoginPage } from '~/pages/auth-page';
import { CategoryPage } from '~/pages/category-page';
import { ErrorPage } from '~/pages/error-page';
import { JuiciestPage } from '~/pages/juiciest-page';
import { MainPage } from '~/pages/main-page';
import { RecipePage } from '~/pages/recipe-page';
import { SubcategoryPage } from '~/pages/subcategory-page';
import { VerificationPage } from '~/pages/verification-page';
import { AppLayout } from '~/shared/components/layouts';
import { AppRoutes, routePaths } from '~/shared/config/router';
import { Category } from '~/shared/types/categories';
import { Footer } from '~/widgets/footer';
import { Menu } from '~/widgets/menu';
import { Navbar } from '~/widgets/navbar';
import { Sidebar } from '~/widgets/sidebar/ui/Sidebar';

export const AppRouter = memo(() => {
    let recipeRoutes;
    let categoriesRoutes;

    const { data: categories } = useGetCategoriesQuery();

    const getRecipeRoutes = (categoryData: Category) => (
        <Route key={categoryData._id} path={`/${categoryData.category}/`}>
            {categoryData.subCategories.map((subcat, idx) => (
                <Route
                    path={`${subcat.category}/:recipeId`}
                    key={idx}
                    element={
                        <AppLayout
                            header={<Navbar />}
                            footer={<Footer />}
                            menu={<Menu />}
                            sidebar={<Sidebar />}
                        >
                            <RecipePage />
                        </AppLayout>
                    }
                ></Route>
            ))}
        </Route>
    );

    const getCategoriesRouteElements = (categoryData: Category) => (
        <Route
            key={categoryData._id}
            path={`/${categoryData.category}/`}
            element={
                <AppLayout
                    header={<Navbar />}
                    footer={<Footer />}
                    menu={<Menu />}
                    sidebar={<Sidebar />}
                >
                    <CategoryPage categoryData={categoryData} />
                </AppLayout>
            }
        >
            {categoryData.subCategories.map((subcat, idx) => (
                <Route
                    path={`${subcat.category}`}
                    key={idx}
                    element={
                        <SubcategoryPage categoryData={categoryData} subcategoryData={subcat} />
                    }
                ></Route>
            ))}
        </Route>
    );

    if (Array.isArray(categories)) {
        categoriesRoutes = categories
            .filter((item) => !item.rootCategoryId)
            .map(getCategoriesRouteElements);

        recipeRoutes = categories.filter((item) => !item.rootCategoryId).map(getRecipeRoutes);
    }

    return (
        <Routes>
            <Route
                path={routePaths[AppRoutes.MAIN]}
                element={
                    <AppLayout
                        header={<Navbar />}
                        footer={<Footer />}
                        menu={<Menu />}
                        sidebar={<Sidebar />}
                    >
                        <MainPage />
                    </AppLayout>
                }
            />
            <Route
                path={routePaths[AppRoutes.THE_JUICIEST]}
                element={
                    <AppLayout
                        header={<Navbar />}
                        footer={<Footer />}
                        menu={<Menu />}
                        sidebar={<Sidebar />}
                    >
                        <JuiciestPage />
                    </AppLayout>
                }
            />
            <Route path={routePaths[AppRoutes.VERIFICATION]} element={<VerificationPage />} />

            {categoriesRoutes}
            {recipeRoutes}

            <Route element={<AuthPage />}>
                <Route path={routePaths[AppRoutes.LOGIN]} element={<LoginPage />} />
                <Route path={routePaths[AppRoutes.SIGNUP]} element={<SignUpForm />} />
            </Route>

            <Route
                path={routePaths[AppRoutes.NOT_FOUND]}
                element={
                    <AppLayout
                        header={<Navbar />}
                        footer={<Footer />}
                        menu={<Menu />}
                        sidebar={<Sidebar />}
                    >
                        <ErrorPage />
                    </AppLayout>
                }
            />
            <Route path='*' element={<Navigate to={routePaths[AppRoutes.NOT_FOUND]} />} />
        </Routes>
    );
});
