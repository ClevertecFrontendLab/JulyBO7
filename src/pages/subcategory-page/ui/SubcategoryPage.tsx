import { Button, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { useGetCategoriesQuery, useGetCategoryByIdQuery } from '~/entities/category';
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
    const { data: categories } = useGetCategoriesQuery();
    const { data: subcategoryData } = useGetCategoryByIdQuery(subcatId);
    const { data: subcategoryRecipes } = useGetCategoryRecipesQuery({
        categoryId: subcatId,
    });

    const { pathname } = useLocation();
    const navigate = useNavigate();

    let cards;
    if (subcategoryRecipes && categoryData && subcategoryData) {
        cards = subcategoryRecipes?.data.map((recipe, idx) => {
            const handleCook = getRecipeCardHandler(
                recipe,
                navigate,
                categoryData,
                subcategoryData,
                pathname,
            );
            return (
                <HorizontalCard
                    data-test-id={`${FOOD_CARD}-${idx}`}
                    categories={categories}
                    key={recipe._id}
                    title={recipe.title}
                    onCook={handleCook}
                    indexForTest={idx}
                    recipe={recipe}
                />
            );
        });
    }

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
