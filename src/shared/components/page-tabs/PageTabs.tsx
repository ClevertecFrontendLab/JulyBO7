import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { FC } from 'react';
import { Outlet } from 'react-router';

import { SubMenuItem } from '~/widgets/menu/model/types/filters-types';

type PageTabsProps = {
    onChangeTab: (index: number) => void;
    items: SubMenuItem[];
};

export const PageTabs: FC<PageTabsProps> = (props) => {
    const { onChangeTab, items } = props;

    return (
        <Tabs
            color='lime.800'
            onChange={onChangeTab}
            position='relative'
            variant='unstyled'
            mt='32px'
        >
            <TabList borderBottomWidth='1px' borderBottomColor='gray.200' borderBottomStyle='solid'>
                {items.map((item, idx) => (
                    <Tab _selected={{ color: 'lime.600' }} key={idx}>
                        {item.title}
                    </Tab>
                ))}
            </TabList>
            <TabIndicator mt='-1.5px' height='2px' bg='lime.600' borderRadius='1px' />
            <TabPanels>
                {items.map((_, idx) => (
                    <TabPanel key={idx}>
                        <Outlet />
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
};
