import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useMatch, useNavigate } from 'react-router';

import { useGetCategoriesQuery } from '~/entities/category';
import { useCheckAuthQuery } from '~/features/auth';
import { AppLoader } from '~/shared/components/loader';
import { AppRoutes, routePaths } from '~/shared/config/router';
import { LOCAL_STORAGE_CATEGORIES_KEY } from '~/shared/constants/localStorage';

import { AppRouter } from './providers/routes/ui/AppRouter';
import { setIsAuthAction } from './store/app-slice';
import { useAppDispatch } from './store/hooks';

function App() {
    const navigate = useNavigate();
    const matchMainPage = useMatch(routePaths[AppRoutes.MAIN]);
    const dispatch = useAppDispatch();

    const { data, error, isLoading: isLoadingAuth } = useCheckAuthQuery();
    const { data: categories, isLoading: isLoadingCategories } = useGetCategoriesQuery();

    useEffect(() => {
        if (categories) {
            localStorage.setItem(LOCAL_STORAGE_CATEGORIES_KEY, JSON.stringify(categories));
        }
    }, [categories]);

    useEffect(() => {
        if (error && 'status' in error && error.status === 403) {
            navigate(routePaths[AppRoutes.LOGIN]);
            return;
        }
        if (data) {
            dispatch(setIsAuthAction(true));
        }
    }, [error, navigate, dispatch, data]);

    return (
        <Box bg='bgColor' position='relative' h='100vh'>
            <AppRouter />
            {(isLoadingCategories || isLoadingAuth) && matchMainPage ? <AppLoader /> : null}
        </Box>
    );
}

export default App;
