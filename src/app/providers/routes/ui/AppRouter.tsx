import { Navigate, Route, Routes } from 'react-router';

import { useAppSelector } from '~/app/store/hooks';
import { useGetCategoriesQuery } from '~/entities/category';
import { AuthPage, LoginPage, SignupPage } from '~/pages/auth-page';
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

export const AppRouter = () => {
    const { data } = useGetCategoriesQuery();
    const isAuth = useAppSelector((state) => state.app.isAuth);

    let recipeRoutes;
    let categoriesRoutes;

    const getRecipeRoutes = (categoryData: Category) => (
        <Route key={categoryData._id} path={`/${categoryData.category}/`}>
            {categoryData.subCategories.map((subcat, idx) => (
                <Route
                    path={`${subcat.category}/:recipeId`}
                    key={idx}
                    element={<RecipePage />}
                ></Route>
            ))}
        </Route>
    );

    const getCategoriesRouteElements = (categoryData: Category) => (
        <Route
            key={categoryData._id}
            path={`/${categoryData.category}/`}
            element={<CategoryPage categoryId={categoryData._id} />}
        >
            {categoryData.subCategories.map((subcat, idx) => (
                <Route
                    path={`${subcat.category}`}
                    key={idx}
                    element={
                        <SubcategoryPage categoryId={categoryData._id} subcatId={subcat._id} />
                    }
                ></Route>
            ))}
        </Route>
    );

    if (data) {
        categoriesRoutes = data
            .filter((item) => !item.rootCategoryId)
            .map(getCategoriesRouteElements);

        recipeRoutes = data.filter((item) => !item.rootCategoryId).map(getRecipeRoutes);
    }

    return (
        <Routes>
            <Route
                element={
                    <AppLayout
                        header={<Navbar />}
                        footer={<Footer />}
                        menu={<Menu />}
                        sidebar={<Sidebar />}
                    />
                }
            >
                <Route path={routePaths[AppRoutes.MAIN]} element={<MainPage />} />
                <Route path={routePaths[AppRoutes.THE_JUICIEST]} element={<JuiciestPage />} />
                <Route path={routePaths[AppRoutes.VERIFICATION]} element={<VerificationPage />} />
                {categoriesRoutes}
                {recipeRoutes}
            </Route>

            <Route
                element={
                    <AppLayout>
                        <AuthPage />
                    </AppLayout>
                }
            >
                <Route path={routePaths[AppRoutes.LOGIN]} element={<LoginPage />} />
                <Route path={routePaths[AppRoutes.SIGNUP]} element={<SignupPage />} />
            </Route>

            <Route
                path={routePaths[AppRoutes.NOT_FOUND]}
                element={
                    isAuth ? (
                        <AppLayout
                            header={<Navbar />}
                            footer={<Footer />}
                            menu={<Menu />}
                            sidebar={<Sidebar />}
                        >
                            <ErrorPage />
                        </AppLayout>
                    ) : (
                        <AppLayout header={<Navbar />}>
                            <ErrorPage />
                        </AppLayout>
                    )
                }
            />
            <Route path='*' element={<Navigate to={routePaths[AppRoutes.NOT_FOUND]} />} />
        </Routes>
    );
};
