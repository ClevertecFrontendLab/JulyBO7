import { Stack, VStack } from '@chakra-ui/react';
import { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import { useAppDispatch } from '~/app/store/hooks';
import { HorizontalCard } from '~/shared/components/card/ui/horizontal-card/HorizontalCard';
import { Page } from '~/shared/components/page/ui/Page';
import { PageFooter } from '~/shared/components/page-footer/PageFooter';
import { PageHeader } from '~/shared/components/page-header/PageHeader';
import { PageTabs } from '~/shared/components/page-tabs/ui/PageTabs';
import { getCategoryRecipes } from '~/shared/lib/getCategoryRecipes';
import { getCurrentCategoryByPath } from '~/shared/lib/getCurrentCategoryByPath';
import { getFilteredRecipesByAllergens } from '~/shared/lib/getFilteredRecipesByAllergens';
import { getFoundRecipesTitle } from '~/shared/lib/getFoundRecipeTitle';
import { getMenuItems } from '~/shared/lib/getMenuItems';
import { getRecipeCardHandler } from '~/shared/lib/getRecipeCardHandler';
import { recipes } from '~/shared/recipes';
import { Recipe } from '~/shared/types/recipe';
import { selectAllergenFilter } from '~/widgets/drawer/model/selectors/selectAllergenFilter';
import { removeAllAllergensAction } from '~/widgets/drawer/model/slice/filtersSlice';

import { veganPageData } from '../model/mockData';

export const VeganCuisinePage: FC = () => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    //для поиска в хедере:
    const navigate = useNavigate();
    const [foundRecipes, setFoundRecipes] = useState<Recipe[]>();
    const [inputValue, setInputValue] = useState<string>('');

    const allergens = useSelector(selectAllergenFilter);

    const categoryRecipes = getCategoryRecipes(recipes, 'vegan');

    const filteredRecipesByAllergen = getFilteredRecipesByAllergens(categoryRecipes, allergens);

    const handleRecipeSearch = () => {
        const recipes = filteredRecipesByAllergen.filter((recip) => {
            const reg = new RegExp(inputValue, 'i');
            return recip.title.match(reg);
        });
        setFoundRecipes(recipes);
    };
    const handleInputChange = (value: string) => {
        setInputValue(value);
        if (!value) {
            setFoundRecipes([]);
        }
    };
    let cards;
    if (foundRecipes && foundRecipes.length > 0) {
        cards = foundRecipes.map((data, idx) => {
            let index;
            const reg = new RegExp(inputValue, 'i');
            const match = data.title.match(reg);
            if (match) {
                index = match['index'];
            }
            const updatedTitle: ReactElement = getFoundRecipesTitle(
                data.title,
                index!,
                inputValue.length,
            );
            const handleCook = getRecipeCardHandler(data, navigate);
            return (
                <HorizontalCard
                    id={data.id}
                    category={data.category[0]}
                    key={idx}
                    title={updatedTitle}
                    text={data.description}
                    image={data.image}
                    bookmarkCount={data.bookmarks}
                    likesCount={data.likes}
                    onCook={handleCook}
                />
            );
        });
    } else {
        cards = filteredRecipesByAllergen.map((data, idx) => {
            const handleCook = getRecipeCardHandler(data, navigate);
            return (
                <HorizontalCard
                    id={data.id}
                    category={data.category[0]}
                    key={idx}
                    title={data.title}
                    text={data.description}
                    image={data.image}
                    bookmarkCount={data.bookmarks}
                    likesCount={data.likes}
                    onCook={handleCook}
                />
            );
        });
    }
    //---------------------------------------------
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
                    onSearch={handleRecipeSearch}
                    inputValue={inputValue}
                    onChange={handleInputChange}
                />

                {foundRecipes && foundRecipes.length > 0 ? (
                    <Stack
                        direction='row'
                        wrap='wrap'
                        columnGap={{ base: '16px', lg: '24px' }}
                        rowGap='16px'
                        mt='32px'
                    >
                        {cards}
                    </Stack>
                ) : (
                    <PageTabs
                        onChangeTab={onChangeTab}
                        items={categoryData.items}
                        tabIndex={currentTabIndex}
                        titleCategory={categoryData.title}
                        category='vegan'
                        pathCategory={categoryData.routePath}
                    />
                )}
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
