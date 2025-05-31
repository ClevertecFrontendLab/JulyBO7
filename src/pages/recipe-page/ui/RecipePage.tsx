import { VStack } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

import { setSuccessMessageAction } from '~/app/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/app/store/hooks';
import { useGetRecipeByIdQuery } from '~/entities/recipe';
import avatar1 from '~/shared/assets/images/Avatar.png';
import { Alert } from '~/shared/components/alert';
import { UserCard } from '~/shared/components/card/ui/user-card/UserCard';
import { PageLayout } from '~/shared/components/layouts/ui/page-layout/PageLayout';
import { AppLoader } from '~/shared/components/loader';
import { NewRecipesBlock } from '~/shared/components/new-recipes-block/ui/NewRecipesBlock';
import { AppRoutes, routePaths } from '~/shared/config/router';
import { ERROR_MESSAGE } from '~/shared/constants/commonErrorMessages';
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
    const [errorMessage, setErrorMessage] = useState('');
    const successMessage = useAppSelector((state) => state.app.successMessage);

    const userId = useAppSelector((state) => state.app.userId);

    console.log('RECIPE PAGE:', 'USER ID: ', userId);

    const {
        data: recipe,
        isLoading,
        isError: isErrorRecipe,
        error: getRecipeByIdError,
    } = useGetRecipeByIdQuery(recipeId!);

    const myRecipe = userId === recipe?.authorId;

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
        }
    }, [dispatch, isErrorRecipe, location.state, navigate]);

    const handleSuccessMessageClose = () => {
        dispatch(setSuccessMessageAction(''));
    };

    if (getRecipeByIdError && !errorMessage) {
        setErrorMessage(ERROR_MESSAGE);
    }

    if (!recipe) {
        return null;
    }
    return (
        <PageLayout>
            <VStack align='center' spacing={{ base: '24px', lg: '40px' }}>
                <HeaderRecipe recipe={recipe} myRecipe={myRecipe} />
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
            </VStack>

            {isLoading && <AppLoader />}
            {errorMessage && (
                <Alert onClose={() => setErrorMessage('')} title={errorMessage} type='error' />
            )}
            {successMessage && (
                <Alert title={successMessage} type='success' onClose={handleSuccessMessageClose} />
            )}
        </PageLayout>
    );
};
