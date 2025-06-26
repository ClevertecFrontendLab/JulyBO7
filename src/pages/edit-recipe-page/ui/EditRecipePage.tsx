import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import { useParams } from 'react-router';

import { useGetRecipeByIdQuery } from '~/entities/recipe';
import { useUpdateRecipeMutation } from '~/entities/recipe';
import { CreateNewRecipeForm } from '~/features/create-recipe';
import { PageLayout } from '~/shared/components/layouts';
import { AppLoader } from '~/shared/components/loader';

export const EditRecipePage: FC = () => {
    const [trigger, { isLoading }] = useUpdateRecipeMutation();

    const params = useParams<{ recipeId: string }>();
    const { data: recipe } = useGetRecipeByIdQuery(params.recipeId!);
    const defaultValues = recipe
        ? {
              categoriesIds: recipe.categoriesIds,
              title: recipe.title,
              description: recipe.description,
              portions: recipe.portions,
              time: recipe.time,
              image: recipe.image,
              ingredients: recipe.ingredients,
              steps: recipe.steps,
          }
        : {};

    return (
        <PageLayout pr={{ base: '16px', md: '20px', lg: '208px', '2xl': '280px' }}>
            <Box h='100%' pt={{ base: '16px', lg: '56px' }}>
                {recipe && (
                    <CreateNewRecipeForm
                        triggerToPublishRecipe={trigger}
                        defaultValues={defaultValues}
                        recipeId={params.recipeId}
                    />
                )}
            </Box>
            {isLoading && <AppLoader />}
        </PageLayout>
    );
};
