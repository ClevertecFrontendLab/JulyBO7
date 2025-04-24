import { Button, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { useNavigate, useOutletContext } from 'react-router';

import { HorizontalCard } from '~/shared/components/card/ui/horizontal-card/HorizontalCard';
import { getFilteredRecipesByAllergens } from '~/shared/lib/getFilteredRecipesByAllergens';
import { getRecipeCardHandler } from '~/shared/lib/getRecipeCardHandler';
import { getSubcategoryRecipes } from '~/shared/lib/getSubcategoryRecipes';
import { OutletContext } from '~/shared/types/common';

export const SecondDishPage: FC = () => {
    const navigate = useNavigate();
    const { recipes, allergenFilter } = useOutletContext<OutletContext>();

    const secondDishesSubcatRecipes = getSubcategoryRecipes(recipes, 'vegan', 'second-dish');

    const filteredRecipesByAllergen = getFilteredRecipesByAllergens(
        secondDishesSubcatRecipes,
        allergenFilter,
    );

    const cards = filteredRecipesByAllergen.map((recipe) => {
        const handleCook = getRecipeCardHandler(recipe, navigate, 'vegan', 'second-dish');
        return (
            <HorizontalCard
                key={recipe.id}
                onCook={handleCook}
                id={recipe.id}
                category={recipe.category[0]}
                title={recipe.title}
                text={recipe.description}
                image={recipe.image}
                bookmarkCount={recipe.bookmarks}
                likesCount={recipe.likes}
            />
        );
    });
    return (
        <>
            <Stack
                direction='row'
                wrap='wrap'
                columnGap={{ base: '16px', lg: '24px' }}
                rowGap='16px'
            >
                {cards}
            </Stack>
            <Button variant='solid' bg='lime.400' size='l' color='primaryColor' mt='16px'>
                Загрузить
            </Button>
        </>
    );
};
