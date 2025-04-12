import { VStack } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { Page } from '~/shared/components/page/ui/Page';
import { PageFooter } from '~/shared/components/page-footer/PageFooter';
import { PageHeader } from '~/shared/components/page-header/PageHeader';
import { PageTabs } from '~/shared/components/page-tabs/PageTabs';
import { getMenuItems } from '~/widgets/menu/model/getMenuItems';
import { MenuFilter } from '~/widgets/menu/model/types/filters-types';

import { veganPageData } from '../model/mockData';

export const VeganCuisinePage: FC = () => {
    const [activeTabIndex, setcurrentTabIndex] = useState(0);
    const { pathname } = useLocation();
    const menuItems = getMenuItems();
    const veganCuisineItems = menuItems.find((item) => item.title === MenuFilter.VEGAN)!.items;

    const navigate = useNavigate();
    const onChangeTab = (ind: number) => {
        navigate(veganCuisineItems[ind].routePath);
        setcurrentTabIndex(ind);
    };
    useEffect(() => {
        const index = veganCuisineItems.findIndex((item) => item.routePath === pathname);
        if (index !== -1) {
            setcurrentTabIndex(index);
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
                    tabIndex={activeTabIndex}
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
