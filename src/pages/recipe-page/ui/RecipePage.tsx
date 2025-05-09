import { VStack } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

import { setAppError } from '~/app/store/app-slice';
import { useAppDispatch } from '~/app/store/hooks';
import { useGetRecipeByIdQuery } from '~/entities/recipe';
import avatar1 from '~/shared/assets/images/Avatar.png';
import { UserCard } from '~/shared/components/card/ui/user-card/UserCard';
import { NewRecipesBlock } from '~/shared/components/new-recipes-block/ui/NewRecipesBlock';
import { Page } from '~/shared/components/page/ui/Page';
import { AppRoutes, routePaths } from '~/shared/config/router';
import { UrlState } from '~/shared/types/url';

import { NutritionValueBlock } from './calorie-content/NutritionValueBlock';
import { CookingSteps } from './cooking-steps/CookingSteps';
import { HeaderRecipe } from './header-recipe/HeaderRecipe';
import { IngredientsBlock } from './ingredients-block/IngredientsBlock';

export const RecipePage: FC = () => {
    const { recipeId } = useParams<{ recipeId: string }>();
    const navigate = useNavigate();
    const location: { state: UrlState } = useLocation();
    const dispatch = useAppDispatch();

    const { data: recipe, isLoading, isError: isErrorRecipe } = useGetRecipeByIdQuery(recipeId!);

    useEffect(() => {
        if (isErrorRecipe && location.state.fromPath) {
            let state;
            if (
                location.state.fromPath !== routePaths[AppRoutes.MAIN] &&
                location.state.fromPath !== routePaths[AppRoutes.THE_JUICIEST]
            ) {
                state = {
                    breadcrumb: location.state.breadcrumb.slice(
                        0,
                        location.state.breadcrumb.length - 1,
                    ),
                };
            } else {
                state = null;
            }

            navigate(location.state.fromPath, {
                state,
            });
            dispatch(setAppError('На сервере произошла ошибка'));
        }
    }, [dispatch, isErrorRecipe, location.state, navigate]);

    if (!recipe) {
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
                        <NewRecipesBlock />
                    </>
                )}
            </VStack>
        </Page>
    );
};
