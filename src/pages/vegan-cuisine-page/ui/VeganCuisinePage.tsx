import { VStack } from '@chakra-ui/react';
import { FC, useState } from 'react';

import { Page } from '~/shared/components/page/ui/Page';
import { PageFooter } from '~/shared/components/page-footer/PageFooter';
import { PageHeader } from '~/shared/components/page-header/PageHeader';
import { PageTabs } from '~/shared/components/page-tabs/PageTabs';
import { getMenuItems } from '~/widgets/menu/model/getMenuItems';
import { MenuFilter } from '~/widgets/menu/model/types/filters-types';

import { veganPageData } from '../model/mockData';

export const VeganCuisinePage: FC = () => {
    const [currentTabIndex, setcurrentTabIndex] = useState(0);
    // const { pathname } = useLocation();
    const menuItems = getMenuItems();
    const veganCuisineItems = menuItems.find((item) => item.title === MenuFilter.VEGAN)!.items;

    // const navigate = useNavigate();
    const onChangeTab = (ind: number) => {
        // navigate(veganCuisineItems[ind].routePath);
        setcurrentTabIndex(ind);
    };
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
