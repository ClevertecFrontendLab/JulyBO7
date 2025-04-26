import { Box, Text } from '@chakra-ui/react';

export const getFoundRecipesTitle = (text: string, index: number, length: number) => {
    const titleStart = text.slice(0, index);

    const searchSubstr = text.slice(index, index + length);

    const titleEnd = text.slice(index + length);

    const newTitle = (
        <Box
            fontSize={{ base: 'm', lg: 'xl' }}
            fontWeight={500}
            mb={{ base: '20px', lg: 0 }}
            textAlign='left'
            noOfLines={{ base: 1, lg: 1 }}
        >
            <Text as='h2' display='inline' style={{ whiteSpace: 'pre' }}>
                {titleStart}
            </Text>
            <Text as='h2' color='lime.600' display='inline' alignSelf='start'>
                {searchSubstr}
            </Text>
            <Text as='h2' display='inline'>
                {titleEnd}
            </Text>
        </Box>
    );

    return newTitle;
};
