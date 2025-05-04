import { Button, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { ApplicationState } from '~/app/store/configure-store';
import { useGetCategoryByIdQuery } from '~/entities/category';
import { useGetCategoryRecipesQuery } from '~/entities/recipe';
import { HorizontalCard } from '~/shared/components/card/ui/horizontal-card/HorizontalCard';
import { FOOD_CARD } from '~/shared/constants/tests';
import { getRecipeCardHandler } from '~/shared/lib/getRecipeCardHandler';

type SubcategoryPageProps = {
    categoryId: string;
    subcatId: string;
};

export const SubcategoryPage: FC<SubcategoryPageProps> = ({ categoryId, subcatId }) => {
    const { data: categoryData } = useGetCategoryByIdQuery(categoryId);
    const { data: subcategoryData } = useGetCategoryByIdQuery(subcatId);

    const allergens = useSelector((state: ApplicationState) => state.pages.allergens);

    const { data: subcategoryRecipes } = useGetCategoryRecipesQuery({
        categoryId: subcatId,
        allergens,
    });

    const navigate = useNavigate();

    const cards = subcategoryRecipes?.data.map((recipe, idx) => {
        const handleCook = getRecipeCardHandler(recipe, navigate, categoryData, subcategoryData);
        return (
            <HorizontalCard
                data-test-id={`${FOOD_CARD}-${idx}`}
                key={recipe._id}
                title={recipe.title}
                onCook={handleCook}
                indexForTest={idx}
                recipe={recipe}
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
