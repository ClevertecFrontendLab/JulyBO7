import {
    HStack,
    Image,
    Tab,
    TabIndicator,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    VStack,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

import authPageImage from '~/shared/assets/authImage.png';
import Logo from '~/shared/assets/icons/components/Logo';
import { AppRoutes, routePaths } from '~/shared/config/router';

const authPagesData: { title: string; path: string }[] = [
    { title: 'Вход на сайт', path: routePaths[AppRoutes.LOGIN] },
    { title: 'Регистрация', path: routePaths[AppRoutes.SIGNUP] },
];

export const AuthPage: FC = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [currentTabIndex, setCurrentTabIndex] = useState(
        authPagesData.findIndex((item) => item.path === pathname),
    );

    const handleTab = (path: string) => () => {
        navigate(path);
    };
    const handleTabChange = (ind: number) => {
        setCurrentTabIndex(ind);
    };

    return (
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
                    onChange={handleTabChange}
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
                            >
                                {item.title}
                            </Tab>
                        ))}
                    </TabList>
                    <TabIndicator mt='-1.5px' height='2px' bg='lime.700' />

                    <TabPanels mt='40px'>
                        {authPagesData.map((item) => (
                            <TabPanel key={item.path} padding={0}>
                                <Outlet />
                            </TabPanel>
                        ))}
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
    );
};
