import { Box } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

type PageProps = {
    children: ReactNode;
};

export const Page: FC<PageProps> = ({ children }) => (
    <Box
        as='main'
        height='100%'
        // pl={{ base: '16px', md: '20px', lg: '24px' }}
        // pr={{ base: '16px', md: '20px', lg: '72px' }}
        mt={{ base: '64px', lg: '80px' }}
        mb={{ base: '84px', lg: 0 }}
        pl={{ base: '16px', md: '20px', lg: '280px' }}
        pr={{ base: '16px', md: '20px', lg: '280px' }}
        width={{ base: '360px', md: '768px', lg: '1440px', '2xl': '1920px' }}
    >
        {children}
    </Box>
);
