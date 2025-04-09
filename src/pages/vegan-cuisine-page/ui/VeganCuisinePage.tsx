import { Button, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { useNavigate } from 'react-router';

import { Page } from '~/shared/components/page/ui/Page';
import { PageFooter } from '~/shared/components/page-footer/PageFooter';
import { PageHeader } from '~/shared/components/page-header/PageHeader';
import { PageTabs } from '~/shared/components/page-tabs/PageTabs';
import { getMenuItems } from '~/widgets/menu/model/getMenuItems';
import { MenuFilter } from '~/widgets/menu/model/types/filters-types';

import { veganPageData } from '../model/mockData';

export const VeganCuisinePage: FC = () => {
    const menuItems = getMenuItems();
    const veganCuisineItems = menuItems.find((item) => item.title === MenuFilter.VEGAN)!.items;

    const navigate = useNavigate();
    const onChangeTab = (ind: number) => {
        console.log('Tab: ', ind);
        navigate(veganCuisineItems[ind].routePath);
    };
    return (
        <Page>
            <VStack align='center' mt='32px'>
                <PageHeader
                    title={veganPageData.headerPage.title}
                    text={veganPageData.headerPage.text}
                />

                <PageTabs onChangeTab={onChangeTab} items={veganCuisineItems} />
                <Button variant='solid' bg='lime.400' size='l' color='primaryColor'>
                    Загрузить
                </Button>
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
