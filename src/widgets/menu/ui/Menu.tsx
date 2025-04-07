import { Box } from '@chakra-ui/react';
import { FC } from 'react';

import { Footer } from './footer/Footer';
import cls from './Menu.module.scss';
import { MenuArea } from './menu-area/MenuArea';

export const Menu: FC = () => (
    <Box
        w='256px'
        display={{ base: 'none', md: 'flex' }}
        flexDirection='column'
        justifyContent='space-between'
        className={cls.menu}
    >
        <MenuArea />
        <Footer />
    </Box>
);
