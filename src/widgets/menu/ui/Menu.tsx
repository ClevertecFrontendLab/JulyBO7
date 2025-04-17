import { Box } from '@chakra-ui/react';
import { FC } from 'react';

import { MenuArea } from './menu-area/MenuArea';
import { MenuFooter } from './menu-footer/MenuFooter';

export const Menu: FC = () => (
    <Box
        w='258px'
        maxHeight='872px'
        display={{ base: 'none', lg: 'flex' }}
        flexDirection='column'
        justifyContent='space-between'
        pt='24px'
        flexShrink={0}
        position='fixed'
        left='0'
        top='80px'
    >
        <MenuArea />
        <MenuFooter />
    </Box>
);
