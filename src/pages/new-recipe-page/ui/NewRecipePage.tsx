import { Box } from '@chakra-ui/react';
import { FC } from 'react';

import { CreateNewRecipeForm } from '~/features/create-recipe';
import { PageLayout } from '~/shared/components/layouts';

export const NewRecipePage: FC = () => (
    <PageLayout pr={{ base: '16px', md: '20px', lg: '208px', '2xl': '280px' }}>
        <Box h='100%' pt={{ base: '16px', lg: '56px' }}>
            <CreateNewRecipeForm />
        </Box>
    </PageLayout>
);
