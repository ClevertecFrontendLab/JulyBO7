import { VStack } from '@chakra-ui/react';
import { FC, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';

import { Page } from '~/shared/components/page/ui/Page';
import { PageFooter } from '~/shared/components/page-footer/PageFooter';
import { PageHeader } from '~/shared/components/page-header/PageHeader';
import { PageTabs } from '~/shared/components/page-tabs/ui/PageTabs';
import { getCurrentCategoryByPath } from '~/shared/lib/getCurrentCategoryByPath';
import { getMenuItems } from '~/shared/lib/getMenuItems';

import { veganPageData } from '../model/mockData';

export const VeganCuisinePage: FC = () => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const { pathname } = useLocation();
    const veganCuisineItems = useMemo(
        () => getMenuItems().find((item) => item.category === 'vegan')!.items,
        [],
    );

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
                    title={veganPageData.headerPage.title}
                    text={veganPageData.headerPage.text}
                />

                <PageTabs
                    onChangeTab={onChangeTab}
                    items={veganCuisineItems}
                    tabIndex={currentTabIndex}
                />
            </VStack>
            <PageFooter
                title={veganPageData.footerPage.title}
                text={veganPageData.footerPage.text}
                withoutImageCardData={veganPageData.footerPage.withoutImageCards}
                withoutTextCardData={veganPageData.footerPage.withoutTextCards}
            />
        </Page>
    );
};
