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
        pl={{ base: '6px', lg: '12px' }}
        pr='72px'
        pt='7px'
        overflowY='auto'
        className={cls.page}
    >
        {children}
    </Box>
);
