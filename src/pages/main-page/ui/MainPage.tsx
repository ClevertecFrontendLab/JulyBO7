import { Button, Stack, VStack } from '@chakra-ui/react';
import { FC, useCallback, useEffect, useState } from 'react';

import { useAppDispatch } from '~/app/store/hooks';
import { FoundRecipesCards, Recipe } from '~/entities/recipe';
import { NewRecipesBlock } from '~/shared/components/new-recipes-block/ui/NewRecipesBlock';
import { Page } from '~/shared/components/page/ui/Page';
import { RelevantKitchen } from '~/shared/components/relevant-kitchen';
import { removeAllFiltersAction } from '~/widgets/drawer';
import { SearchPanel } from '~/widgets/search-panel';

import { CulinaryBlogs } from './culinary-blogs/CulinaryBlogs';
import { JuisiestBlock } from './juisiest-block/JuisiestBlock';

export const MainPage: FC = () => {
    // const { data: categories } = useGetCategoriesQuery();
    const dispatch = useAppDispatch();

    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>();

    const getFoundRecipes = useCallback((recipes: Recipe[]) => {
        setFilteredRecipes(recipes);
    }, []);

    useEffect(
        () => () => {
            dispatch(removeAllFiltersAction());
        },
        [dispatch],
    );
    // const {
    //     allergen,
    //     meetType,
    //     sideType,
    //     searchString,
    //     category: categoryFilter,
    // } = useAppSelector(selectFilters);

    // let subcategoriesIds: string[] = [];
    // if (categories) {
    //     subcategoriesIds = getSubcategoriesIdsFilter(categoryFilter, categories);

    // const [canSearch, setCanSearch] = useState(false);
    // const [view, setView] = useState<'default' | 'search'>('default');
    // const [page] = useState(1);
    // const [limit] = useState(8);

    // const [sortBy] = useState<'createdAt' | 'likes '>('createdAt');
    // const [sortOrder] = useState<'asc' | 'desc'>('asc');

    // const { data: recipes, isError } = useGetRecipesQuery(
    //     {
    //         page,
    //         limit,
    //         allergens: allergen.join(',') === '' ? undefined : allergen.join(','),
    //         searchString: searchString,
    //         meat: meetType.join(',') === '' ? undefined : meetType.join(','),
    //         garnish: sideType.join(',') === '' ? undefined : sideType.join(','),
    //         subcategoriesIds:
    //             subcategoriesIds.join(',') === '' ? undefined : subcategoriesIds.join(','),
    //         sortBy,
    //         sortOrder,
    //     },
    //     { skip: !canSearch },
    // );

    // if (
    //     recipes &&
    //     recipes.data.length > 0 &&
    //     view === 'default' &&
    //     (allergen.length !== 0 ||
    //         meetType.length !== 0 ||
    //         sideType.length !== 0 ||
    //         searchString.length !== 0 ||
    //         categoryFilter.length !== 0)
    // ) {
    //     setView('search');
    // } else if (recipes && recipes.data.length === 0 && view === 'search') {
    //     setView('default');
    // }

    // const handleRecipeSearch = () => {
    //     setCanSearch(true);
    // };

    // const isNotFoundWithoutAllergen = filteredRecipesByAllergen.length === 0;

    // const isFound = useRef<boolean>(false);
    // if (recipes && recipes.data.length > 0) {
    //     isFound.current = true;
    // }

    // const textSearchPanel =
    //     recipes?.data.length === 0
    //         ? 'По вашему запросу ничего не найдено. Попробуйте другой запрос'
    //         : '';

    // if (!categories) return null;
    return (
        <Page>
            <VStack align='center'>
                <SearchPanel title='Приятного аппетита!' getFoundRecipes={getFoundRecipes} />
                <VStack spacing={{ base: '32px', lg: '40px' }} w='100%'>
                    {filteredRecipes && filteredRecipes.length > 0 ? (
                        <>
                            <Stack
                                direction='row'
                                wrap='wrap'
                                columnGap={{ base: '16px', lg: '24px' }}
                                rowGap='16px'
                                mt='32px'
                            >
                                <FoundRecipesCards recipes={filteredRecipes} />
                            </Stack>
                            <Button
                                variant='solid'
                                bg='lime.400'
                                size='l'
                                color='primaryColor'
                                mt='16px'
                            >
                                Загрузить еще
                            </Button>
                        </>
                    ) : (
                        <>
                            <NewRecipesBlock />
                            <JuisiestBlock />
                            <CulinaryBlogs />
                            <RelevantKitchen />
                        </>
                    )}
                </VStack>
            </VStack>
        </Page>
    );
};
