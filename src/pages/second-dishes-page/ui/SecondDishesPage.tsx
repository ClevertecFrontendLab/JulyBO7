import { VStack } from '@chakra-ui/react';
import { FC, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';

import { useAppDispatch } from '~/app/store/hooks';
import { Page } from '~/shared/components/page/ui/Page';
import { PageFooter } from '~/shared/components/page-footer/PageFooter';
import { PageHeader } from '~/shared/components/page-header/PageHeader';
import { PageTabs } from '~/shared/components/page-tabs/ui/PageTabs';
import { getCurrentCategoryByPath } from '~/shared/lib/getCurrentCategoryByPath';
import { getMenuItems } from '~/shared/lib/getMenuItems';
import { removeAllFiltersAction } from '~/widgets/drawer/model/slice/filtersSlice';

import { secondDishesPageData } from '../model/mockData';

export const SecondDishesPage: FC = () => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();

    const categoryData = useMemo(
        () => getMenuItems().find((item) => item.category === 'second-dish')!,
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
        return () => {
            dispatch(removeAllFiltersAction());
        };
    }, [pathname, dispatch]);

    return (
        <Page>
            <VStack align='center'>
                <PageHeader
                    title={secondDishesPageData.headerPage.title}
                    text={secondDishesPageData.headerPage.text}
                />

                <PageTabs
                    onChangeTab={onChangeTab}
                    items={categoryData.items}
                    tabIndex={currentTabIndex}
                    titleCategory={categoryData.title}
                    pathCategory={categoryData.routePath}
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
