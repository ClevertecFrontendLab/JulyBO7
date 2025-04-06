import { Box } from '@chakra-ui/react';

import { useGetPostsQuery } from '~/query/services/posts.ts';

function App() {
    const { data: _data, isLoading: _isLoading } = useGetPostsQuery();

    return (
        <Box height='100vh' bg='bgColor'>
            <Box />
            <Box display='flex'>
                <Box />
                <Box />
                <Box />
            </Box>
        </Box>
    );
}

export default App;
