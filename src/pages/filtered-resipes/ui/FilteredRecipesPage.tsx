import { Stack, VStack } from '@chakra-ui/react';
import { FC, ReactElement, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { HorizontalCard } from '~/shared/components/card/ui/horizontal-card/HorizontalCard';
import { Page } from '~/shared/components/page/ui/Page';
import { PageHeader } from '~/shared/components/page-header/PageHeader';
import { getFilteredRecipesByAllergens } from '~/shared/lib/getFilteredRecipesByAllergens';
import { getFilteredRecipesByCategory } from '~/shared/lib/getFilteredRecipesByCategory';
import { getFilteredRecipesByMeet } from '~/shared/lib/getFilteredRecipesByMeat';
import { getFilteredRecipesBySide } from '~/shared/lib/getFilteredRecipesBySide';
import { getFoundRecipesTitle } from '~/shared/lib/getFoundRecipeTitle';
import { getRecipeCardHandler } from '~/shared/lib/getRecipeCardHandler';
import { recipes } from '~/shared/recipes';
import { Recipe } from '~/shared/types/recipe';
import { selectFilters } from '~/widgets/drawer/model/selectors/selectFilters';

export const FilteredRecipesPage: FC = () => {
    const navigate = useNavigate();
    const filters = useSelector(selectFilters);
    const [inputValue, setInputValue] = useState<string>('');
    const [foundRecipes, setFoundRecipes] = useState<Recipe[]>();

    const filteredRecipesByAllergens = getFilteredRecipesByAllergens(recipes, filters.allergen);

    const filteredRecipesByCategory = getFilteredRecipesByCategory(
        filteredRecipesByAllergens,
        filters.category,
    );

    const filteredRecipesBySide = getFilteredRecipesBySide(
        filteredRecipesByCategory,
        filters.sideType,
    );
    const filteredRecipesByMeat = getFilteredRecipesByMeet(filteredRecipesBySide, filters.meetType);
    const filteredRecipesByAllFilters = filteredRecipesByMeat;

    const isNotFoundWithoutAllergen = filteredRecipesByAllergens.length === 0;

    const handleInputChange = (value: string) => {
        setInputValue(value);
        if (!value) {
            setFoundRecipes([]);
        }
    };

    const isFound = useRef<boolean>(false);

    const handleRecipeSearch = () => {
        const recipes = filteredRecipesByAllFilters.filter((recip) => {
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
                    data-test-id={`food-card-${idx}`}
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
        cards = filteredRecipesByAllFilters.map((data, idx) => {
            const handleCook = getRecipeCardHandler(data, navigate);
            return (
                <HorizontalCard
                    data-test-id={`food-card-${idx}`}
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
    return (
        <Page>
            <VStack align='center'>
                <PageHeader
                    title='Приятного аппетита'
                    onSearch={handleRecipeSearch}
                    inputValue={inputValue}
                    onChange={handleInputChange}
                    isFound={isFound.current}
                    isNotFoundWithoutAllergen={isNotFoundWithoutAllergen}
                />

                <VStack spacing={{ base: '32px', lg: '40px' }} w='100%'>
                    <Stack
                        direction='row'
                        wrap='wrap'
                        columnGap={{ base: '16px', lg: '24px' }}
                        rowGap='16px'
                        mt='32px'
                    >
                        {cards}
                    </Stack>
                </VStack>
            </VStack>
        </Page>
    );
};
