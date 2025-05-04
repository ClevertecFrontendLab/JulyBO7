import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';

import { setIdsAction, useGetCategoriesQuery } from '~/entities/category';
import { Footer } from '~/widgets/footer';
import { Menu } from '~/widgets/menu';
import { Navbar } from '~/widgets/navbar';
import { Sidebar } from '~/widgets/sidebar/ui/Sidebar';

import { AppRouter } from './providers/routes/ui/AppRouter';
import { useAppDispatch } from './store/hooks';

function App() {
    const { data } = useGetCategoriesQuery();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (data) {
            const categoriesData = data.filter((item) => !item.rootCategoryId);
            dispatch(setIdsAction(categoriesData));
        }
    }, [data, dispatch]);

    return (
        <Box bg='bgColor' position='relative' height='100vh'>
            <Navbar />

            <Box display='flex' height='100%'>
                <Menu />
                <AppRouter />
                <Sidebar />
            </Box>

            <Footer />
        </Box>
    );
}

export default App;
