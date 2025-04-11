import { Box } from '@chakra-ui/react';

import { useGetPostsQuery } from '~/query/services/posts.ts';
import { Footer } from '~/widgets/footer';
import { Menu } from '~/widgets/menu';
import { Navbar } from '~/widgets/navbar';
import { Sidebar } from '~/widgets/sidebar/ui/Sidebar';

import { AppRouter } from './providers/routes/ui/AppRouter';

function App() {
    const { data: _data, isLoading: _isLoading } = useGetPostsQuery();

    return (
        <Box height='100vh' bg='bgColor'>
            <Navbar />
            <Box display='flex'>
                <Menu />
                <AppRouter />
                <Sidebar />
            </Box>
            <Footer />
        </Box>
    );
}

export default App;
