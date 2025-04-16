import { Box, HStack, Text } from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { FC } from 'react';
import { Link, useLocation } from 'react-router';

import LogoFirst from '~/shared/assets/icons/components/LogoFirst';
import LogoSecond from '~/shared/assets/icons/components/LogoSecond';
import avatar from '~/shared/assets/images/Avatar.png';
import { routePaths } from '~/shared/config/route-config/router';

import { getBreadCrimbers } from '../model/getBreadCrimbers';
import { AvatarBlock } from './avatar-block/AvatarBlock';
import { BreadCrumb } from './bread-crumb/BreadCrumb';
import { UserInfoBlock } from './user-info-block/UserInfoBlock';

export const Navbar: FC = () => {
    const { pathname } = useLocation();
    const userName = 'Екатерина Константинопольская';
    const userEmail = '@bake_and_pie';

    const bookmarkCount = 185;
    const emojiCount = 587;
    const peopleCount = 589;
    const breadCrimbers = getBreadCrimbers(pathname);

    return (
        <HStack
            data-test-id='header'
            as='header'
            w='100%'
            h={{ base: '64px', lg: '80px' }}
            padding={{ base: '8px 16px', md: '8px 20px', lg: '16px 56px 16px 16px' }}
            bg='lime.50'
            justify='space-between'
            position='fixed'
            left='0'
            top='0'
            zIndex='100'
        >
            <Box as='nav' display='flex' alignItems='center' h='100%'>
                <ChakraLink
                    as={Link}
                    to={routePaths.main}
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
                <BreadCrumb items={breadCrimbers} />
            </Box>
            <AvatarBlock userName={userName} image={avatar} userEmail={userEmail} />
            <UserInfoBlock
                bookmarkCount={bookmarkCount}
                emojiCount={emojiCount}
                peopleCount={peopleCount}
            />
        </HStack>
    );
};
