import { VStack } from '@chakra-ui/react';
import { FC, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';

import { Page } from '~/shared/components/page/ui/Page';
import { PageFooter } from '~/shared/components/page-footer/PageFooter';
import { PageHeader } from '~/shared/components/page-header/PageHeader';
import { PageTabs } from '~/shared/components/page-tabs/ui/PageTabs';
import { getCurrentCategoryByPath } from '~/shared/lib/getCurrentCategoryByPath';
import { getMenuItems } from '~/shared/lib/getMenuItems';
import { recipes } from '~/shared/recipes';
import { OutletContext } from '~/shared/types/common';

import { secondDishesPageData } from '../model/mockData';

export const SecondDishesPage: FC = () => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
    const { pathname } = useLocation();

    const context: OutletContext = { recipes: recipes, allergenFilter: selectedAllergens };

    const handleAllergenChange = (value: string[]) => {
        setSelectedAllergens(value);
    };

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
    }, [pathname]);

    return (
        <Page>
            <VStack align='center'>
                <PageHeader
                    title={secondDishesPageData.headerPage.title}
                    text={secondDishesPageData.headerPage.text}
                    selectedAllergens={selectedAllergens}
                    onAllergenChange={handleAllergenChange}
                />

                <PageTabs
                    onChangeTab={onChangeTab}
                    items={categoryData.items}
                    tabIndex={currentTabIndex}
                    titleCategory={categoryData.title}
                    pathCategory={categoryData.routePath}
                    category='second-dish'
                    context={context}
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
