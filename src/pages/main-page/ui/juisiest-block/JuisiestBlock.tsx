import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, HStack, Stack } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { useGetCategoriesQuery } from '~/entities/category';
import { useGetRecipesQuery, usePrefetch } from '~/entities/recipe';
import { Alert } from '~/shared/components/alert';
import { HorizontalCard } from '~/shared/components/card/ui/horizontal-card/HorizontalCard';
import { AppLoader } from '~/shared/components/loader';
import { AppRoutes, routePaths } from '~/shared/config/router';
import { ERROR_MESSAGE } from '~/shared/constants/commonErrorMessages';
import { JUICIEST_LINK, JUICIEST_LINK_MOBILE } from '~/shared/constants/tests';
import { getRecipeCardHandler } from '~/shared/lib/getRecipeCardHandler';
import { SubCategory } from '~/shared/types/categories';

import { THE_JUICIEST_ } from '../../model/constants/mainpage';

export const JuisiestBlock: FC = () => {
    const { data: categories } = useGetCategoriesQuery();

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [errorMessage, setErrorMessage] = useState('');

    const {
        data: recipes,
        error: getRecipesError,
        isLoading,
    } = useGetRecipesQuery({
        page: 1,
        limit: 4,
        sortBy: 'likes',
        sortOrder: 'desc',
    });
    const prefetchPage = usePrefetch('getRecipes');

    const handleSelection = () => {
        prefetchPage({
            page: 1,
            limit: 8,
            sortBy: 'likes',
            sortOrder: 'desc',
        });
        navigate(routePaths[AppRoutes.THE_JUICIEST]);
    };

    let juiciestCards;
    if (categories && recipes && Array.isArray(recipes.data)) {
        juiciestCards = recipes.data.map((recipe, idx) => {
            const subcategory = categories.find(
                (category) => category._id === recipe.categoriesIds[0],
            )!;
            const category = categories.find(
                (category) => category._id === subcategory.rootCategoryId,
            )!;
            const handleCook = getRecipeCardHandler(
                recipe,
                navigate,
                category,
                subcategory as SubCategory,
                pathname,
            );

            return (
                <HorizontalCard
                    categories={categories}
                    indexForTest={idx}
                    key={idx}
                    recipe={recipe}
                    title={recipe.title}
                    onCook={handleCook}
                />
            );
        });
    }

    if (getRecipesError && !errorMessage) {
        setErrorMessage(ERROR_MESSAGE);
    }

    return (
        <Box>
            <HStack justify='space-between'>
                <Heading variant={{ base: 's', lg: 'lm', '2xl': 'xl' }}>{THE_JUICIEST_}</Heading>
                <Button
                    data-test-id={JUICIEST_LINK}
                    onClick={handleSelection}
                    display={{ base: 'none', lg: 'flex' }}
                    alignItems='center'
                    variant='solid'
                    bg='lime.400'
                    size='xl'
                    color='primaryColor'
                    rightIcon={<ArrowForwardIcon />}
                >
                    Вся подборка
                </Button>
            </HStack>
            <Stack
                direction={{ base: 'column', md: 'row', lg: 'column', '2xl': 'row' }}
                wrap='wrap'
                spacing={{ base: '12px', md: '16px', '2xl': '24px' }}
                mt={{ base: '12px', lg: '16px', '2xl': '24px' }}
                justify='center'
                align='center'
            >
                {juiciestCards}
                <Button
                    data-test-id={JUICIEST_LINK_MOBILE}
                    onClick={handleSelection}
                    display={{ base: 'flex', lg: 'none' }}
                    alignItems='center'
                    variant='solid'
                    bg='lime.400'
                    size='l'
                    color='primaryColor'
                    rightIcon={<ArrowForwardIcon />}
                >
                    Вся подборка
                </Button>
            </Stack>

            {isLoading && <AppLoader />}
            {errorMessage && (
                <Alert onClose={() => setErrorMessage('')} title={errorMessage} type='error' />
            )}
        </Box>
    );
};
