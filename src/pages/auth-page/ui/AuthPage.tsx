import {
    HStack,
    Image,
    Tab,
    TabIndicator,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

import authPageImage from '~/shared/assets/authImage.png';
import Logo from '~/shared/assets/icons/components/Logo';
import { AppRoutes, routePaths } from '~/shared/config/router';

import { COPYRIGHT_TEXT, THE_BEST_SERVICE_FOR_CULINARY } from '../model/constants/authPage';

const authPagesData: { title: string; path: string }[] = [
    { title: 'Вход на сайт', path: routePaths[AppRoutes.LOGIN] },
    { title: 'Регистрация', path: routePaths[AppRoutes.SIGNUP] },
];

export const AuthPage: FC = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const tabIndexFromPath = authPagesData.findIndex((item) => item.path === pathname);

    const [currentTabIndex, setCurrentTabIndex] = useState(tabIndexFromPath);

    const handleTab = (path: string) => () => {
        navigate(path);
    };

    useEffect(() => {
        setCurrentTabIndex(tabIndexFromPath);
    }, [pathname]);

    return (
        <>
            <HStack
                w='100%'
                h='100%'
                justify='space-between'
                bgGradient='linear-gradient(208deg, #eaffc7 0%, #29813f 100%)'
            >
                <VStack
                    w='100%'
                    h='100%'
                    align='center'
                    pt={{ base: '72px', md: '140px', lg: '170px' }}
                    gap={{ base: '40px', md: '56px', lg: '80px' }}
                >
                    <Logo w={{ base: '158px', lg: '271px' }} h={{ base: '38px', lg: '64px' }} />
                    <Tabs
                        w={{ base: '328px', md: '355px', lg: '450px', '2xl': '460px' }}
                        index={currentTabIndex}
                    >
                        <TabList gap='16px'>
                            {authPagesData.map((item) => (
                                <Tab
                                    key={item.path}
                                    onClick={handleTab(item.path)}
                                    _selected={{ color: 'lime.700' }}
                                    p={{ base: '8px 24px', lg: '12px 24px' }}
                                    fontSize={{ base: 'm', lg: 'l' }}
                                    fontWeight={500}
                                    color='lime.800'
                                >
                                    {item.title}
                                </Tab>
                            ))}
                        </TabList>
                        <TabIndicator mt='-1.5px' height='2px' bg='lime.700' />

                        <TabPanels mt='40px'>
                            <TabPanel padding={0}>
                                {pathname === routePaths[AppRoutes.LOGIN] ? <Outlet /> : null}
                            </TabPanel>
                            <TabPanel padding={0}>
                                {pathname === routePaths[AppRoutes.SIGNUP] ? <Outlet /> : null}
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </VStack>

                <Image
                    src={authPageImage}
                    display={{ base: 'none', lg: 'block' }}
                    w={{ lg: '732px', '2xl': '972px' }}
                    h='100%'
                />
            </HStack>
            <HStack
                as='footer'
                h='60px'
                w='100%'
                position='fixed'
                bottom={0}
                justify='space-between'
            >
                <Text fontSize='xs' fontWeight={600} pl='30px' pr={{ base: '30px', md: 0 }}>
                    {COPYRIGHT_TEXT}
                </Text>
                <Text
                    fontSize='xs'
                    fontWeight={600}
                    pr='30px'
                    display={{ base: 'none', lg: 'block' }}
                >
                    {THE_BEST_SERVICE_FOR_CULINARY}
                </Text>
            </HStack>
        </>
    );
};
