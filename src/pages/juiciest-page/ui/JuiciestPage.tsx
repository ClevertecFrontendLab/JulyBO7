import { Button, Stack, VStack } from '@chakra-ui/react';
import { FC, ReactElement, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { ApplicationState } from '~/app/store/configure-store';
import { HorizontalCard } from '~/shared/components/card/ui/horizontal-card/HorizontalCard';
import { Page } from '~/shared/components/page/ui/Page';
import { PageFooter } from '~/shared/components/page-footer/PageFooter';
import { PageHeader } from '~/shared/components/page-header/PageHeader';
import { getFilteredRecipesByAllergens } from '~/shared/lib/getFilteredRecipesByAllergens';
import { getFoundRecipesTitle } from '~/shared/lib/getFoundRecipeTitle';
import { getRecipeCardHandler } from '~/shared/lib/getRecipeCardHandler';
import { recipes } from '~/shared/recipes';
import { Recipe } from '~/shared/types/recipe';

import { juiciestPageData } from '../model/mockData';

export const JuiciestPage: FC = () => {
    const [foundRecipes, setFoundRecipes] = useState<Recipe[]>();
    const [inputValue, setInputValue] = useState<string>('');
    const isFound = useRef<boolean>(false);
    const navigate = useNavigate();

    const allergens = useSelector((state: ApplicationState) => state.pages.allergens);

    const filteredRecipesByAllergen = getFilteredRecipesByAllergens(recipes, allergens);
    const isNotFoundWithoutAllergen = filteredRecipesByAllergen.length === 0;

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
    const handleInputChange = (value: string) => {
        setInputValue(value);
        if (!value) {
            setFoundRecipes([]);
        }
    };

    // const cards = filteredRecipes.map((data, idx) => {
    //     const handleCook = getRecipeCardHandler(data, navigate);
    //     return (
    //         <HorizontalCard
    //             id={data.id}
    //             category={data.category[0]}
    //             key={idx}
    //             title={data.title}
    //             text={data.description}
    //             image={data.image}
    //             bookmarkCount={data.bookmarks}
    //             likesCount={data.likes}
    //             onCook={handleCook}
    //             // recomend={data.recomend}
    //         />
    //     );
    // });

    return (
        <Page>
            <VStack align='center'>
                <PageHeader
                    title={juiciestPageData.headerPage.title}
                    onSearch={handleRecipeSearch}
                    inputValue={inputValue}
                    onChange={handleInputChange}
                    isFound={isFound.current}
                    isNotFoundWithoutAllergen={isNotFoundWithoutAllergen}
                />
            </VStack>
            <Stack
                direction='row'
                wrap='wrap'
                columnGap={{ base: '16px', lg: '24px' }}
                rowGap='16px'
                mt='32px'
            >
                {cards}
            </Stack>
            <VStack mt='16px' align='center'>
                <Button variant='solid' bg='lime.400' size='l' color='primaryColor'>
                    Загрузить еще
                </Button>
            </VStack>

            <PageFooter
                title={juiciestPageData.footerPage.title}
                text={juiciestPageData.footerPage.text}
                withoutImageCardData={juiciestPageData.footerPage.withoutImageCards}
                withoutTextCardData={juiciestPageData.footerPage.withoutTextCards}
            />
        </Page>
    );
};
