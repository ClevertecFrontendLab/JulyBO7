import { Box } from '@chakra-ui/react';

import { MainPage } from '~/pages/main-page';
import { useGetPostsQuery } from '~/query/services/posts.ts';
import { Menu } from '~/widgets/menu';

function App() {
    const { data: _data, isLoading: _isLoading } = useGetPostsQuery();

    return (
        <Box height='100vh' bg='bgColor'>
            <Box />
            <Box display='flex'>
                <Menu />
                <MainPage />
                <Box />
            </Box>
        </Box>
    );
}

export default App;
