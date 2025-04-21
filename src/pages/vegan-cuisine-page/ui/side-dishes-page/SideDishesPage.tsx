import { Button, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { useNavigate } from 'react-router';

import { HorizontalCard } from '~/shared/components/card/ui/horizontal-card/HorizontalCard';
import { getRecipeCardHandler } from '~/shared/lib/getRecipeCardHandler';
import { getSubcategoryRecipes } from '~/shared/lib/getSubcategoryRecipes';
import { recipes } from '~/shared/recipes';

export const SideDishesPage: FC = () => {
    const sideDishesSubcatRecipes = getSubcategoryRecipes(recipes, 'vegan', 'side-dishes');
    const navigate = useNavigate();

    const cards = sideDishesSubcatRecipes.map((recipe) => {
        const handleCook = getRecipeCardHandler(recipe, navigate, 'vegan', 'side-dishes');
        return (
            <HorizontalCard
                key={recipe.id}
                onCook={handleCook}
                category={recipe.category[0]}
                id={recipe.id}
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
