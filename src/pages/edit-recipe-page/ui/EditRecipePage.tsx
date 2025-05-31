import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import { useLocation } from 'react-router';

import { Recipe } from '~/entities/recipe';
import { useUpdateRecipeMutation } from '~/entities/recipe';
import { CreateNewRecipeForm } from '~/features/create-recipe';
import { PageLayout } from '~/shared/components/layouts';
import { AppLoader } from '~/shared/components/loader';
import { UrlState } from '~/shared/types/url';

export const EditRecipePage: FC = () => {
    const [trigger, { isLoading }] = useUpdateRecipeMutation();
    const location = useLocation();
    const state = location.state as UrlState<Recipe>;

    const defaultValues = {
        categoriesIds: state.additionalState?.categoriesIds,
        title: state.additionalState?.title,
        description: state.additionalState?.description,
        portions: state.additionalState?.portions,
        time: state.additionalState?.time,
        image: state.additionalState?.image,
        ingredients: state.additionalState?.ingredients,
        steps: state.additionalState?.steps,
    };

    return (
        <PageLayout pr={{ base: '16px', md: '20px', lg: '208px', '2xl': '280px' }}>
            <Box h='100%' pt={{ base: '16px', lg: '56px' }}>
                <CreateNewRecipeForm
                    triggerToPublishRecipe={trigger}
                    defaultValues={defaultValues}
                    recipeId={state.additionalState?._id}
                />
            </Box>
            {isLoading && <AppLoader />}
        </PageLayout>
    );
};
