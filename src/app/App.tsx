import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router';

import { useGetCategoriesQuery } from '~/entities/category';
import { useCheckAuthQuery } from '~/features/auth';
import { AppLoader } from '~/shared/components/loader';
import { LOCAL_STORAGE_CATEGORIES_KEY } from '~/shared/constants/localStorage';

import { router } from './providers/routes/ui/router';
import { setIsAuthAction, setIsInitAction } from './store/app-slice';
import { useAppDispatch } from './store/hooks';

function App() {
    // const matchMainPage = useMatch(routePaths[AppRoutes.MAIN]);
    const dispatch = useAppDispatch();

    const { data: categories, isLoading: isLoadingCategories } = useGetCategoriesQuery();
    const {
        data: authData,
        isLoading: isLoadingAuth,
        isError: isErrorAuth,
        isSuccess: isSuccessAuth,
    } = useCheckAuthQuery();

    useEffect(() => {
        if (categories) {
            localStorage.setItem(LOCAL_STORAGE_CATEGORIES_KEY, JSON.stringify(categories));
        }
    }, [categories]);

    useEffect(() => {
        if (authData) {
            dispatch(setIsAuthAction(true));
        }
        if (isSuccessAuth || isErrorAuth) {
            dispatch(setIsInitAction(true));
        }
    }, [authData, dispatch, isErrorAuth, isSuccessAuth]);

    return (
        <Box bg='bgColor' position='relative' h='100vh'>
            {/* <AppRouter /> */}
            <RouterProvider router={router} />

            {isLoadingCategories || isLoadingAuth ? <AppLoader /> : null}
        </Box>
    );
}

export default App;
