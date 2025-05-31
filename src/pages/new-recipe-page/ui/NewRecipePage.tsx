import { Box } from '@chakra-ui/react';
import { FC } from 'react';

import { useCreateRecipeMutation } from '~/entities/recipe';
import { CreateNewRecipeForm } from '~/features/create-recipe';
import { PageLayout } from '~/shared/components/layouts';
import { AppLoader } from '~/shared/components/loader';

export const NewRecipePage: FC = () => {
    const [trigger, { isLoading }] = useCreateRecipeMutation();

    const defaultValues = {
        categoriesIds: [],
        title: '',
        description: undefined,
        time: undefined,
        portions: undefined,
        image: undefined,
        // steps: [{ description: '', stepNumber: 1, image: undefined }], // нормально работает валидация черновика модалки когда [] а отправка рецепта когда так
        steps: [],

        ingredients: [],
    };

    return (
        <PageLayout pr={{ base: '16px', md: '20px', lg: '208px', '2xl': '280px' }}>
            <Box h='100%' pt={{ base: '16px', lg: '56px' }}>
                <CreateNewRecipeForm
                    defaultValues={defaultValues}
                    triggerToPublishRecipe={trigger}
                />
            </Box>
            {isLoading && <AppLoader />}
        </PageLayout>
    );
};
