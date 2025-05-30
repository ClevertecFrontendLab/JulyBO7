import { Box, HStack, Text, useMediaQuery } from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { Link, useMatch } from 'react-router';

import LogoFirst from '~/shared/assets/icons/components/LogoFirst';
import LogoSecond from '~/shared/assets/icons/components/LogoSecond';
import avatar from '~/shared/assets/images/Avatar.png';
import { AppRoutes, routePaths } from '~/shared/config/router';
import { HEADER } from '~/shared/constants/tests';

import { AvatarBlock } from './avatar-block/AvatarBlock';
import { BreadCrumb } from './bread-crumb/BreadCrumb';
import { MobileMenu } from './mobile-menu/MobileMenu';
import cls from './Navbar.module.scss';
import { UserInfoBlock } from './user-info-block/UserInfoBlock';

export const Navbar: FC = () => {
    const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
    const [isSmallerThan768] = useMediaQuery('(max-width: 770px)');

    const notFoundPath = useMatch(routePaths[AppRoutes.NOT_FOUND]);

    const userName = 'Екатерина Константинопольская';
    const userEmail = '@bake_and_pie';

    const bookmarkCount = 185;
    const emojiCount = 587;
    const peopleCount = 589;

    const handleToggleMobileMenu = () => {
        setIsOpenMobileMenu(!isOpenMobileMenu);
    };
    const handleCloseMobileMenu = () => {
        setIsOpenMobileMenu(false);
    };
    useEffect(() => {
        const html = document.documentElement;
        html.className = isOpenMobileMenu ? cls.hiddenDocument : '';
    }, [isOpenMobileMenu]);
    return (
        <>
            <HStack
                data-test-id={HEADER}
                as='header'
                w='100%'
                h={{ base: '64px', lg: '80px' }}
                padding={{ base: '8px 16px', md: '8px 20px', lg: '16px 56px 16px 16px' }}
                bg={isOpenMobileMenu ? 'bgColor' : 'lime.50'}
                justify='space-between'
                position='fixed'
                left='0'
                top='0'
                zIndex='1000'
            >
                <Box as='nav' display='flex' alignItems='center' h='100%'>
                    <ChakraLink
                        as={Link}
                        to={routePaths[AppRoutes.MAIN]}
                        display='flex'
                        alignItems='center'
                        gap='7px'
                        mr={{ base: '0', lg: '128px' }}
                    >
                        <Text as='span'>
                            <LogoFirst />
                        </Text>
                        <Text as='span' display={{ base: 'none', md: 'block' }}>
                            <LogoSecond />
                        </Text>
                    </ChakraLink>
                    {isSmallerThan768 || notFoundPath ? null : (
                        <BreadCrumb display={{ base: 'none', lg: 'block' }} />
                    )}
                </Box>
                {!notFoundPath ? (
                    <AvatarBlock userName={userName} image={avatar} userEmail={userEmail} />
                ) : null}

                <UserInfoBlock
                    bookmarkCount={bookmarkCount}
                    emojiCount={emojiCount}
                    peopleCount={peopleCount}
                    isOpenMobileMenu={isOpenMobileMenu}
                    onClick={handleToggleMobileMenu}
                />
            </HStack>
            {isOpenMobileMenu && (
                <Box
                    position='absolute'
                    top='64px'
                    bottom={0}
                    right={0}
                    left={0}
                    zIndex='1000'
                    backdropFilter='blur(4px)'
                    bg='rgba(0, 0, 0, 0.16)'
                    onClick={handleCloseMobileMenu}
                />
            )}
            {isOpenMobileMenu && <MobileMenu onClose={handleCloseMobileMenu} />}
        </>
    );
};
