import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useMatch } from 'react-router';

import { useGetCategoriesQuery } from '~/entities/category';
import { ErrorAlert } from '~/shared/components/alert/ui/ErrorAlert';
import { AppLoader } from '~/shared/components/loader';
import { AppRoutes, routePaths } from '~/shared/config/router';
import { LOCAL_STORAGE_CATEGORIES_KEY } from '~/shared/constants/localStorage';
import { Footer } from '~/widgets/footer';
import { Menu } from '~/widgets/menu';
import { Navbar } from '~/widgets/navbar';
import { Sidebar } from '~/widgets/sidebar/ui/Sidebar';

import cls from './App.module.scss';
import { AppRouter } from './providers/routes/ui/AppRouter';
import { removeAppError } from './store/app-slice';
import { useAppDispatch, useAppSelector } from './store/hooks';

function App() {
    const { data, isLoading } = useGetCategoriesQuery();
    const dispatch = useAppDispatch();
    const notFoundPath = useMatch(routePaths[AppRoutes.NOT_FOUND]);
    const matchMainPage = useMatch(routePaths[AppRoutes.MAIN]);
    const error = useAppSelector((state) => state.app.error);

    const handleClose = () => {
        dispatch(removeAppError());
    };

    useEffect(() => {
        if (data) {
            localStorage.setItem(LOCAL_STORAGE_CATEGORIES_KEY, JSON.stringify(data));
        }
    }, [data]);

    return (
        <Box bg='bgColor' position='relative' h='100vh'>
            {isLoading && matchMainPage ? <AppLoader /> : null}
            <Navbar />
            {notFoundPath ? (
                <>
                    <Box className={cls.wrapper}>
                        <AppRouter />
                    </Box>
                    <Footer />
                </>
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
            {error && <ErrorAlert onClose={handleClose} />}
        </Box>
    );
}

export default App;
