import { Button, Stack, VStack } from '@chakra-ui/react';
import { FC, ReactElement, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { ApplicationState } from '~/app/store/configure-store';
import { useGetCategoriesQuery } from '~/entities/category';
import { Recipe } from '~/entities/recipe';
import { HorizontalCard } from '~/shared/components/card/ui/horizontal-card/HorizontalCard';
import { NewRecipesBlock } from '~/shared/components/new-recipes-block/ui/NewRecipesBlock';
import { Page } from '~/shared/components/page/ui/Page';
import { PageHeader } from '~/shared/components/page-header/PageHeader';
import { RelevantKitchen } from '~/shared/components/relevant-kitchen';
import { FOOD_CARD } from '~/shared/constants/tests';
import { getFilteredRecipesByAllergens } from '~/shared/lib/getFilteredRecipesByAllergens';
import { getFoundRecipesTitle } from '~/shared/lib/getFoundRecipeTitle';
import { getRecipeCardHandler } from '~/shared/lib/getRecipeCardHandler';
import { recipes } from '~/shared/recipes';

import { mainPageData } from '../model/mockData';
import { CulinaryBlogs } from './culinary-blogs/CulinaryBlogs';
import { JuisiestBlock } from './juisiest-block/JuisiestBlock';

export const MainPage: FC = () => {
    const { data: categories } = useGetCategoriesQuery();

    const [foundRecipes, setFoundRecipes] = useState<Recipe[]>();
    const [inputValue, setInputValue] = useState<string>('');
    const navigate = useNavigate();
    const allergens = useSelector((state: ApplicationState) => state.pages.allergens);

    const filteredRecipesByAllergen = getFilteredRecipesByAllergens(recipes, allergens);
    const isNotFoundWithoutAllergen = filteredRecipesByAllergen.length === 0;

    const isFound = useRef<boolean>(false);
    const handleRecipeSearch = () => {
        const recipes = filteredRecipesByAllergen.filter((recip) => {
            const reg = new RegExp(inputValue, 'i');
            return recip.title.match(reg);
        });
        setFoundRecipes(recipes);
        if (recipes.length === 0) {
            isFound.current = false;
        } else {
            isFound.current = true;
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
                    data-test-id={`${FOOD_CARD}-${idx}`}
                    key={idx}
                    title={updatedTitle}
                    onCook={handleCook}
                    // recipe={}
                />
            );
        });
    } else {
        cards = filteredRecipesByAllergen.map((data, idx) => {
            const handleCook = getRecipeCardHandler(data, navigate);
            return (
                <HorizontalCard
                    key={idx}
                    title={data.title}
                    //  recipe={}
                    onCook={handleCook}
                />
            );
        });
    }
    const handleInputChange = (value: string) => {
        setInputValue(value);
        if (!value) {
            setFoundRecipes([]);
        }
    };

    if (!categories) return null;
    return (
        <Page>
            <VStack align='center'>
                <PageHeader
                    title={mainPageData.headerPage.title}
                    onSearch={handleRecipeSearch}
                    inputValue={inputValue}
                    onChange={handleInputChange}
                    isFound={isFound.current}
                    isNotFoundWithoutAllergen={isNotFoundWithoutAllergen}
                />
                <VStack spacing={{ base: '32px', lg: '40px' }} w='100%'>
                    {recipes.length !== filteredRecipesByAllergen.length ||
                    (foundRecipes && foundRecipes.length > 0 && inputValue.length !== 0) ? (
                        <>
                            <Stack
                                direction='row'
                                wrap='wrap'
                                columnGap={{ base: '16px', lg: '24px' }}
                                rowGap='16px'
                                mt='32px'
                            >
                                {cards}
                            </Stack>
                            <Button
                                variant='solid'
                                bg='lime.400'
                                size='l'
                                color='primaryColor'
                                mt='16px'
                            >
                                Загрузить еще
                            </Button>
                        </>
                    ) : (
                        <>
                            <NewRecipesBlock categories={categories} />
                            <JuisiestBlock categories={categories} />
                            <CulinaryBlogs />
                            <RelevantKitchen />
                        </>
                    )}
                </VStack>
            </VStack>
        </Page>
    );
};
