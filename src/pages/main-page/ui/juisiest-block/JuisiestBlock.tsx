import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, HStack, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { useNavigate } from 'react-router';

import { useGetRecipesQuery, usePrefetch } from '~/entities/recipe';
import { ErrorAlert } from '~/shared/components/alert';
import { HorizontalCard } from '~/shared/components/card/ui/horizontal-card/HorizontalCard';
import { AppRoutes, routePaths } from '~/shared/config/router';
import { JUICIEST_LINK, JUICIEST_LINK_MOBILE } from '~/shared/constants/tests';
import { getRecipeCardHandler } from '~/shared/lib/getRecipeCardHandler';
import { Category, SubCategory } from '~/shared/types/categories';

type JuisiestBlockProps = {
    categories: Category[];
};
export const JuisiestBlock: FC<JuisiestBlockProps> = ({ categories }) => {
    const navigate = useNavigate();
    const { data: recipes, isError } = useGetRecipesQuery({
        page: 1,
        limit: 4,
        sortBy: 'likes',
        sortOrder: 'desc',
    });
    console.log('isError: ', isError);
    const prefetchPage = usePrefetch('getRecipes');
    // const juisiestRecipes = [...recipes];
    // juisiestRecipes.sort((a, b) => b.likes - a.likes);

    // const recipeItems = juisiestRecipes.slice(0, 4);

    const handleSelection = () => {
        prefetchPage({
            page: 1,
            limit: 8,
            sortBy: 'likes',
            sortOrder: 'desc',
        });
        // const state = [{ title: 'Самое сочное', path: routePaths.juiciest }]; // будет выполняться проверка из url

        navigate(routePaths[AppRoutes.THE_JUICIEST]);
    };
    const juiciestCards = recipes?.data.map((recipe, idx) => {
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
        );

        return (
            <HorizontalCard
                indexForTest={idx}
                key={idx}
                recipe={recipe}
                title={recipe.title}
                onCook={handleCook}
            />
        );
    });
    return (
        <Box>
            <HStack justify='space-between'>
                <Heading variant={{ base: 's', lg: 'lm', '2xl': 'xl' }}>Самое сочное </Heading>
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
            {isError && <ErrorAlert />}
        </Box>
    );
};
