import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useMatch } from 'react-router';

import { setIdsAction, useGetCategoriesQuery } from '~/entities/category';
import { ErrorAlert } from '~/shared/components/alert/ui/ErrorAlert';
import { AppLoader } from '~/shared/components/loader';
import { AppRoutes, routePaths } from '~/shared/config/router';
import { Footer } from '~/widgets/footer';
import { Menu } from '~/widgets/menu';
import { Navbar } from '~/widgets/navbar';
import { Sidebar } from '~/widgets/sidebar/ui/Sidebar';

import cls from './App.module.scss';
import { AppRouter } from './providers/routes/ui/AppRouter';
import { useAppDispatch } from './store/hooks';

function App() {
    const { data, isLoading, isError } = useGetCategoriesQuery();
    const dispatch = useAppDispatch();
    const notFoundPath = useMatch(routePaths[AppRoutes.NOT_FOUND]);

    useEffect(() => {
        if (data) {
            const categoriesData = data.filter((item) => !item.rootCategoryId);
            dispatch(setIdsAction(categoriesData));
        }
    }, [data, dispatch]);

    return (
        <Box bg='bgColor' position='relative' h='100vh'>
            {isLoading ? <AppLoader /> : null}
            <Navbar />
            {notFoundPath ? (
                <Box className={cls.wrapper}>
                    <AppRouter />
                </Box>
            ) : (
                <>
                    <Box display='flex' className={cls.wrapper}>
                        <Menu />
                        <AppRouter />
                        <Sidebar />
                    </Box>
                    <Footer />
                </>
            )}
            {isError && <ErrorAlert />}
        </Box>
    );
}

export default App;
