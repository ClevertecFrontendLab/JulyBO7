import { Heading, Stack, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { HorizontalCard } from '~/shared/components/card/ui/horizontal-card/HorizontalCard';
import { Page } from '~/shared/components/page/ui/Page';
import { getFilteredRecipesByAllergens } from '~/shared/lib/getFilteredRecipesByAllergens';
import { getFilteredRecipesByCategory } from '~/shared/lib/getFilteredRecipesByCategory';
import { getFilteredRecipesByMeet } from '~/shared/lib/getFilteredRecipesByMeat';
import { getFilteredRecipesBySide } from '~/shared/lib/getFilteredRecipesBySide';
import { getRecipeCardHandler } from '~/shared/lib/getRecipeCardHandler';
import { recipes } from '~/shared/recipes';
import { selectFilters } from '~/widgets/drawer/model/selectors/selectFilters';

export const FilteredRecipesPage: FC = () => {
    const navigate = useNavigate();
    const filters = useSelector(selectFilters);

    const filteredRecipesByAllergens = getFilteredRecipesByAllergens(recipes, filters.allergen);

    const filteredRecipesByCategory = getFilteredRecipesByCategory(
        filteredRecipesByAllergens,
        filters.category,
    );

    const filteredRecipesBySide = getFilteredRecipesBySide(
        filteredRecipesByCategory,
        filters.sideType,
    );
    console.log('FilteredRecipesPage: ', filters);
    const filteredRecipesByMeat = getFilteredRecipesByMeet(filteredRecipesBySide, filters.meetType);

    const cards = filteredRecipesByMeat.map((data, idx) => {
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

    return (
        <Page>
            <VStack align='center'>
                <Heading>Отфильтрованные рецепты</Heading>

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
