import { Box } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

import cls from './Page.module.scss';

type PageProps = {
    children: ReactNode;
};

export const Page: FC<PageProps> = ({ children }) => (
    <Box
        as='main'
        w='100%'
        border='1px solid red'
        pl={{ base: '16px', md: '20px', lg: '24px' }}
        pr={{ base: '16px', md: '20px', lg: '72px' }}
        overflowY='auto'
        className={cls.page}
    >
        {children}
    </Box>
);
