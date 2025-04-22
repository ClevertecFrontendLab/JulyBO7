import { Tab, TabList, TabPanel, TabPanels, Tabs, TabsProps, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Outlet, useNavigate } from 'react-router';

import { SubMenuItem } from '../../../lib/getMenuItems';
import cls from './PageTabs.module.scss';

type PageTabsProps = {
    onChangeTab: (index: number) => void;
    items: SubMenuItem[];
    titleCategory: string;
    pathCategory: string;
    tabIndex?: number;
    style?: TabsProps;
};

export const PageTabs: FC<PageTabsProps> = (props) => {
    const navigate = useNavigate();
    const { onChangeTab, items, tabIndex, style, titleCategory, pathCategory } = props;

    const tabList = items.map((item, idx) => {
        const state = [
            { title: titleCategory, path: pathCategory },
            { title: item.title, path: item.routePath },
        ];

        const handleTab = () => {
            navigate(item.routePath, { state });
        };
        return (
            <Tab
                data-test-id={`tab-${item.subCategory}-${idx}`}
                onClick={handleTab}
                _selected={{
                    color: 'lime.600',
                    borderBottomWidth: '2px',
                    borderBottomStyle: 'solid',
                    borderBottomColor: 'lime.600',
                }}
                flexShrink={0}
                padding={{ base: '4px 16px', lg: '8px 16px' }}
                key={idx}
            >
                <Text textStyle={{ base: 'md', lg: 'm' }}>{item.title}</Text>
            </Tab>
        );
    });

    return (
        <Tabs
            index={tabIndex}
            color='lime.800'
            onChange={onChangeTab}
            position='relative'
            variant='unstyled'
            mt='32px'
            w='100%'
            align='center'
            {...style}
        >
            <TabList
                className={cls.tabs}
                h={{ base: '30px', lg: '42px' }}
                w={{ base: '100%', '2xl': '1006px' }}
                overflowX='auto'
                mb='12px'
                justifyContent='start'
                borderBottomWidth='1px'
                borderBottomColor='gray.200'
                borderBottomStyle='solid'
            >
                {tabList}
            </TabList>
            <TabPanels>
                {items.map((_, idx) => (
                    <TabPanel key={idx} padding='12px 0 0 0'>
                        <Outlet />
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
};
