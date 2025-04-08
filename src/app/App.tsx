import { Box } from '@chakra-ui/react';

import { useGetPostsQuery } from '~/query/services/posts.ts';
import { Menu } from '~/widgets/menu';
import { Navbar } from '~/widgets/navbar';

import { AppRouter } from './providers/routes/ui/AppRouter';

function App() {
    const { data: _data, isLoading: _isLoading } = useGetPostsQuery();

    return (
        <Box height='100vh' bg='bgColor'>
            <Navbar />
            <Box display='flex'>
                <Menu />
                <AppRouter />
                <Box />
            </Box>
        </Box>
    );
}

export default App;
