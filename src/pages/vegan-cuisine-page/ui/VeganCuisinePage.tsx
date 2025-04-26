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
import { removeAllAllergensAction } from '~/widgets/drawer/model/slice/filtersSlice';

import { veganPageData } from '../model/mockData';

export const VeganCuisinePage: FC = () => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    const categoryData = useMemo(
        () => getMenuItems().find((item) => item.category === 'vegan')!,
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
            dispatch(removeAllAllergensAction());
        };
    }, [pathname, dispatch]);

    return (
        <Page>
            <VStack align='center'>
                <PageHeader
                    title={veganPageData.headerPage.title}
                    text={veganPageData.headerPage.text}
                />

                <PageTabs
                    onChangeTab={onChangeTab}
                    items={categoryData.items}
                    tabIndex={currentTabIndex}
                    titleCategory={categoryData.title}
                    category='vegan'
                    pathCategory={categoryData.routePath}
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
