import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useMatch } from 'react-router';

import { useGetCategoriesQuery } from '~/entities/category';
import { AppLoader } from '~/shared/components/loader';
import { AppRoutes, routePaths } from '~/shared/config/router';
import { LOCAL_STORAGE_CATEGORIES_KEY } from '~/shared/constants/localStorage';

import { AppRouter } from './providers/routes/ui/AppRouter';

function App() {
    const matchMainPage = useMatch(routePaths[AppRoutes.MAIN]);

    const { data: categories, isLoading: isLoadingCategories } = useGetCategoriesQuery();

    useEffect(() => {
        if (categories) {
            localStorage.setItem(LOCAL_STORAGE_CATEGORIES_KEY, JSON.stringify(categories));
        }
    }, [categories]);

    return (
        <Box bg='bgColor' position='relative' h='100vh'>
            <AppRouter />
            {isLoadingCategories && matchMainPage ? <AppLoader /> : null}
        </Box>
    );
}

export default App;
