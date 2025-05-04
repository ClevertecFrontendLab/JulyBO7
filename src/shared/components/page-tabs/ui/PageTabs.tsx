import { Tab, TabList, TabPanel, TabPanels, Tabs, TabsProps, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Outlet, useNavigate } from 'react-router';

import { Category } from '~/shared/types/categories';

// import { SubMenuItem } from '../../../lib/getMenuItems';
import cls from './PageTabs.module.scss';

type PageTabsProps = {
    onChangeTab?: (index: number) => void;
    categoryData?: Category;
    // items: SubCategory[];
    // titleCategory?: string;
    // pathCategory?: string;
    // category?: Category;
    tabIndex?: number;
    style?: TabsProps;
};

export const PageTabs: FC<PageTabsProps> = (props) => {
    const { onChangeTab, tabIndex, style, categoryData } = props;
    // console.log('TAB');
    // const { data: category } = useGetCategoryByIdQuery(categoryId);
    const navigate = useNavigate();

    const tabList = categoryData?.subCategories.map((subcat, idx) => {
        const categoryPath = `/${categoryData.category}/${categoryData.subCategories[0].category}`;
        const subcatPath = `/${categoryData.category}/${subcat.category}`;
        const state = [
            {
                title: categoryData.title,
                path: categoryPath,
                category: categoryData.category,
            },
            { title: subcat.title, path: subcatPath },
        ];

        const handleTab = () => {
            navigate(subcatPath, { state });
        };
        return (
            <Tab
                data-test-id={`tab-${subcat.category}-${idx}`}
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
                <Text textStyle={{ base: 'md', lg: 'm' }}>{subcat.title}</Text>
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
                {categoryData?.subCategories.map((_, idx) => (
                    // const tab = idx === tabIndex ? <Outlet /> : '';
                    <TabPanel key={idx} padding='12px 0 0 0'>
                        <Outlet />
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
};
