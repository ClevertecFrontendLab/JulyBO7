import { Tab, TabList, TabPanel, TabPanels, Tabs, TabsProps, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Outlet, useNavigate } from 'react-router';

import { Category } from '~/shared/types/categories';
import { UrlState } from '~/shared/types/url';

import cls from './PageTabs.module.scss';

type PageTabsProps = {
    categoryData: Category;
    tabIndex: number;
    style?: TabsProps;
};

export const PageTabs: FC<PageTabsProps> = (props) => {
    const { tabIndex, style, categoryData } = props;
    const navigate = useNavigate();

    const tabList =
        Array.isArray(categoryData.subCategories) &&
        categoryData.subCategories.map((subcat, idx) => {
            const categoryPath = `/${categoryData.category}/${categoryData.subCategories[0].category}`;
            const subcatPath = `/${categoryData.category}/${subcat.category}`;
            const state: UrlState = {
                breadcrumb: [
                    {
                        title: categoryData.title,
                        path: categoryPath,
                        category: categoryData.category,
                    },
                    { title: subcat.title, path: subcatPath },
                ],
            };

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

    const tabPanels = Array.isArray(categoryData.subCategories)
        ? Array.from({ length: categoryData.subCategories.length }, (_, idx) => (
              <TabPanel key={idx} padding='12px 0 0 0'>
                  {idx === tabIndex ? <Outlet /> : null}
              </TabPanel>
          ))
        : null;

    return (
        <Tabs
            index={tabIndex}
            color='lime.800'
            position='relative'
            variant='unstyled'
            mt='32px'
            w='100%'
            align='center'
            {...style}
        >
            <TabList
                className={cls.tabs}
                w={{ base: '100%', '2xl': '1006px' }}
                mb='12px'
                justifyContent='center'
                flexWrap='wrap'
                borderBottomWidth='1px'
                borderBottomColor='gray.200'
                borderBottomStyle='solid'
            >
                {tabList}
            </TabList>
            <TabPanels>{tabPanels}</TabPanels>
        </Tabs>
    );
};
