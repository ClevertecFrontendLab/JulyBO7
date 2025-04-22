import { VStack } from '@chakra-ui/react';
import { FC, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';

import { Page } from '~/shared/components/page/ui/Page';
import { PageFooter } from '~/shared/components/page-footer/PageFooter';
import { PageHeader } from '~/shared/components/page-header/PageHeader';
import { PageTabs } from '~/shared/components/page-tabs/ui/PageTabs';
import { getCurrentCategoryByPath } from '~/shared/lib/getCurrentCategoryByPath';
import { getMenuItems } from '~/shared/lib/getMenuItems';

import { secondDishesPageData } from '../model/mockData';

export const SecondDishesPage: FC = () => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const { pathname } = useLocation();

    const categoryData = useMemo(
        () => getMenuItems().find((item) => item.category === 'second-dish')!,
        [],
    );
    const secondDishesSubcategory = categoryData.items;

    const pathCategory = categoryData.routePath;
    const titleCategory = categoryData.title;

    const onChangeTab = (ind: number) => {
        setCurrentTabIndex(ind);
    };

    useEffect(() => {
        const tabIndex = getCurrentCategoryByPath(pathname);
        if (tabIndex !== undefined) {
            setCurrentTabIndex(tabIndex);
        }
    }, [pathname]);

    return (
        <Page>
            <VStack align='center'>
                <PageHeader
                    title={secondDishesPageData.headerPage.title}
                    text={secondDishesPageData.headerPage.text}
                />

                <PageTabs
                    onChangeTab={onChangeTab}
                    items={secondDishesSubcategory}
                    tabIndex={currentTabIndex}
                    titleCategory={titleCategory}
                    pathCategory={pathCategory}
                    category='second-dish'
                />
            </VStack>
            <PageFooter
                title={secondDishesPageData.footerPage.title}
                text={secondDishesPageData.footerPage.text}
                withoutImageCardData={secondDishesPageData.footerPage.withoutImageCards}
                withoutTextCardData={secondDishesPageData.footerPage.withoutTextCards}
            />
        </Page>
    );
};
