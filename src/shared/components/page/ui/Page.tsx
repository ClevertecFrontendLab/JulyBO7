import { Box } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

import cls from './Page.module.scss';

type PageProps = {
    children: ReactNode;
};

export const Page: FC<PageProps> = ({ children }) => (
    <Box
        as='main'
        height='100%'
        // pl={{ base: '16px', md: '20px', lg: '24px' }}
        // pr={{ base: '16px', md: '20px', lg: '72px' }}
        mt={{ base: '64px', lg: '80px' }} //for test
        mb={{ base: '84px', lg: 0 }} //for tests
        pl={{ base: '16px', md: '20px', lg: '280px' }} //for tests
        pr={{ base: '16px', md: '20px', lg: '280px' }} //for tests
        width={{ base: '360px', md: '768px', lg: '1440px', '2xl': '1920px' }} //for tests
        // overflowY='auto'
        className={cls.page}
    >
        {children}
    </Box>
);
