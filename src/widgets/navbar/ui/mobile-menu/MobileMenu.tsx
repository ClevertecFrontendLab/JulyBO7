import { Box } from '@chakra-ui/react';
import { FC } from 'react';

import { NAV } from '~/shared/constants/tests';
import { MenuArea } from '~/widgets/menu';
import { MenuFooter } from '~/widgets/menu';

import { BreadCrumb } from '../bread-crumb/BreadCrumb';

export const MobileMenu: FC<{ onClose: () => void }> = ({ onClose }) => (
    <Box
        data-test-id={NAV}
        position='fixed'
        zIndex='1000'
        right='8px'
        top='64px'
        w='344px'
        maxH={{ base: '652px', md: '876px' }}
        display='flex'
        flexDirection='column'
        gap='12px'
        borderRadius='0 0 12px 12px'
        bg='bgColor'
        pt='16px'
        flexShrink={0}
        boxShadow='0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    >
        <BreadCrumb padding='0px 20px' onClick={onClose} />
        <MenuArea isMobile padding='8px 16px 10px 10px' forTest={true} />
        <MenuFooter />
    </Box>
);
