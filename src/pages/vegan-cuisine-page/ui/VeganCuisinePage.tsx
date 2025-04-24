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

import { veganPageData } from '../model/mockData';
// const allergens = [
//     'Молочные продукты',
//     'Яйцо',
//     'Рыба',
//     'Моллюски',
//     'Орехи',
//     'Томат',
//     'Цитрусовые',
//     'Клубника (ягоды)',
//     'Шоколад',
//     // 'сыр',
// ];

export const VeganCuisinePage: FC = () => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
    const { pathname } = useLocation();

    const context: OutletContext = { recipes: recipes, allergenFilter: selectedAllergens };

    const handleAllergenChange = (value: string[]) => {
        setSelectedAllergens(value);
    };

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
    }, [pathname]);

    return (
        <Page>
            <VStack align='center'>
                <PageHeader
                    title={veganPageData.headerPage.title}
                    text={veganPageData.headerPage.text}
                    onAllergenChange={handleAllergenChange}
                    selectedAllergens={selectedAllergens}
                />

                <PageTabs
                    onChangeTab={onChangeTab}
                    items={categoryData.items}
                    tabIndex={currentTabIndex}
                    titleCategory={categoryData.title}
                    category='vegan'
                    pathCategory={categoryData.routePath}
                    context={context}
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
