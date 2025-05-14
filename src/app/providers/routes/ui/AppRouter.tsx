import { Navigate, Route, Routes } from 'react-router';

import { useGetCategoriesQuery } from '~/entities/category';
import { AuthPage, LoginPage, SignupPage } from '~/pages/auth-page';
import { CategoryPage } from '~/pages/category-page';
import { ErrorPage } from '~/pages/error-page';
import { JuiciestPage } from '~/pages/juiciest-page';
import { MainPage } from '~/pages/main-page';
import { RecipePage } from '~/pages/recipe-page';
import { SubcategoryPage } from '~/pages/subcategory-page';
import { VerificationPage } from '~/pages/verification-page';
import { AppRoutes, routePaths } from '~/shared/config/router';
import { Category } from '~/shared/types/categories';

export const AppRouter = () => {
    const { data } = useGetCategoriesQuery();
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
            <Route path={routePaths[AppRoutes.MAIN]} element={<MainPage />} />
            <Route path={routePaths[AppRoutes.THE_JUICIEST]} element={<JuiciestPage />} />
            <Route path={routePaths[AppRoutes.VERIFICATION]} element={<VerificationPage />} />

            <Route element={<AuthPage />}>
                <Route path={routePaths[AppRoutes.LOGIN]} element={<LoginPage />} />
                <Route path={routePaths[AppRoutes.SIGNUP]} element={<SignupPage />} />
            </Route>

            {categoriesRoutes}
            {recipeRoutes}
            <Route path={routePaths[AppRoutes.NOT_FOUND]} element={<ErrorPage />} />
            <Route path='*' element={<Navigate to={routePaths[AppRoutes.NOT_FOUND]} />} />
        </Routes>
    );
};
