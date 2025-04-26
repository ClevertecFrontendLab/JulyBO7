import { Button, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { HorizontalCard } from '~/shared/components/card/ui/horizontal-card/HorizontalCard';
import { getFilteredRecipesByAllergens } from '~/shared/lib/getFilteredRecipesByAllergens';
import { getRecipeCardHandler } from '~/shared/lib/getRecipeCardHandler';
import { getSubcategoryRecipes } from '~/shared/lib/getSubcategoryRecipes';
import { recipes } from '~/shared/recipes';
import { selectAllergenFilter } from '~/widgets/drawer/model/selectors/selectAllergenFilter';

export const DesertsPage: FC = () => {
    const navigate = useNavigate();
    const allergens = useSelector(selectAllergenFilter);

    const desertsSubcatRecipes = getSubcategoryRecipes(recipes, 'vegan', 'deserts');

    const filteredRecipesByAllergen = getFilteredRecipesByAllergens(
        desertsSubcatRecipes,
        allergens,
    );

    const cards = filteredRecipesByAllergen.map((recipe) => {
        const handleCook = getRecipeCardHandler(recipe, navigate, 'vegan', 'deserts');
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
