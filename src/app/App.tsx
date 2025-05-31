import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router';

import { setLoginAction } from '~/app/store/app-slice';
import { useGetCategoriesQuery } from '~/entities/category';
import { useCheckAuthQuery } from '~/features/auth';
import { AppLoader } from '~/shared/components/loader';
import {
    LOCAL_STORAGE_CATEGORIES_KEY,
    LOCAL_STORAGE_USER_DATA_KEY,
} from '~/shared/constants/localStorage';

import { router } from './providers/routes/ui/router';
import { setIsAuthAction, setIsInitAction, setUserIdAction } from './store/app-slice';
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
            const userDataLC = localStorage.getItem(LOCAL_STORAGE_USER_DATA_KEY);
            const userData = userDataLC && JSON.parse(userDataLC);
            if (userData) {
                dispatch(setUserIdAction(userData.userId));
                dispatch(setLoginAction(userData.login));
            }
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
