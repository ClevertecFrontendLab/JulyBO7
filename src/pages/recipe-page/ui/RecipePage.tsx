import { VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { useParams } from 'react-router';

import { useGetCategoriesQuery } from '~/entities/category';
import { useGetRecipeByIdQuery } from '~/entities/recipe';
import avatar1 from '~/shared/assets/images/Avatar.png';
import { ErrorAlert } from '~/shared/components/alert';
import { UserCard } from '~/shared/components/card/ui/user-card/UserCard';
import { NewRecipesBlock } from '~/shared/components/new-recipes-block/ui/NewRecipesBlock';
import { Page } from '~/shared/components/page/ui/Page';

import { NutritionValueBlock } from './calorie-content/NutritionValueBlock';
import { CookingSteps } from './cooking-steps/CookingSteps';
import { HeaderRecipe } from './header-recipe/HeaderRecipe';
import { IngredientsBlock } from './ingredients-block/IngredientsBlock';

export const RecipePage: FC = () => {
    const { recipeId } = useParams<{ recipeId: string }>();
    const { data: recipe, isLoading, isError } = useGetRecipeByIdQuery(recipeId!);
    const { data: categories } = useGetCategoriesQuery();

    if (!recipe || !categories) {
        return null;
    }

    return (
        <Page>
            <VStack align='center' spacing={{ base: '24px', lg: '40px' }}>
                {isLoading ? (
                    'LOADING'
                ) : (
                    <>
                        <HeaderRecipe recipe={recipe} />
                        <NutritionValueBlock nutritionValue={recipe.nutritionValue} />
                        <IngredientsBlock items={recipe.ingredients} portions={recipe.portions} />
                        <CookingSteps steps={recipe.steps} />
                        <UserCard
                            avatar={avatar1}
                            userName='Сергей Разумов'
                            email='@serge25'
                            subscribersCount={125}
                        />
                        <NewRecipesBlock categories={categories} />
                    </>
                )}
                {isError && <ErrorAlert />}
            </VStack>
        </Page>
    );
};
