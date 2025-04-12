import { Box } from '@chakra-ui/react';
import { FC } from 'react';

import { Footer } from './footer/Footer';
import cls from './Menu.module.scss';
import { MenuArea } from './menu-area/MenuArea';

export const Menu: FC = () => (
    <Box
        w='256px'
        display={{ base: 'none', lg: 'flex' }}
        flexDirection='column'
        justifyContent='space-between'
        pt='24px'
        className={cls.menu}
        flexShrink={0}
        boxShadow='0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12)'
    >
        <MenuArea />
        <Footer />
    </Box>
);
