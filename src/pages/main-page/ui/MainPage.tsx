import { Button, Stack, VStack } from '@chakra-ui/react';
import { FC, useEffect, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '~/app/store/hooks';
import { useGetCategoriesQuery } from '~/entities/category';
import { getSubcategoriesIdsFilter } from '~/entities/category';
import { FoundRecipesCards, useGetRecipesQuery } from '~/entities/recipe';
import { ErrorAlert } from '~/shared/components/alert';
import { NewRecipesBlock } from '~/shared/components/new-recipes-block/ui/NewRecipesBlock';
import { Page } from '~/shared/components/page/ui/Page';
import { RelevantKitchen } from '~/shared/components/relevant-kitchen';
import { removeAllFiltersAction, selectFilters } from '~/widgets/drawer';
import { SearchPanel } from '~/widgets/search-panel';

import { CulinaryBlogs } from './culinary-blogs/CulinaryBlogs';
import { JuisiestBlock } from './juisiest-block/JuisiestBlock';

export const MainPage: FC = () => {
    const { data: categories } = useGetCategoriesQuery();
    const dispatch = useAppDispatch();

    const {
        allergen,
        meetType,
        sideType,
        searchString,
        category: categoryFilter,
    } = useAppSelector(selectFilters);

    let subcategoriesIds: string[] = [];
    if (categories) {
        subcategoriesIds = getSubcategoriesIdsFilter(categoryFilter, categories);
    }

    const [canSearch, setCanSearch] = useState(false);
    const [view, setView] = useState<'default' | 'search'>('default');
    const [page] = useState(1);
    const [limit] = useState(8);

    const [sortBy] = useState<'createdAt' | 'likes '>('createdAt');
    const [sortOrder] = useState<'asc' | 'desc'>('asc');

    const { data: recipes, isError } = useGetRecipesQuery(
        {
            page,
            limit,
            allergens: allergen.join(',') === '' ? undefined : allergen.join(','),
            searchString: searchString,
            meat: meetType.join(',') === '' ? undefined : meetType.join(','),
            garnish: sideType.join(',') === '' ? undefined : sideType.join(','),
            subcategoriesIds:
                subcategoriesIds.join(',') === '' ? undefined : subcategoriesIds.join(','),
            sortBy,
            sortOrder,
        },
        { skip: !canSearch },
    );

    if (
        recipes &&
        recipes.data.length > 0 &&
        view === 'default' &&
        (allergen.length !== 0 ||
            meetType.length !== 0 ||
            sideType.length !== 0 ||
            searchString.length !== 0 ||
            categoryFilter.length !== 0)
    ) {
        setView('search');
    } else if (recipes && recipes.data.length === 0 && view === 'search') {
        setView('default');
    }

    const handleRecipeSearch = () => {
        setCanSearch(true);
    };

    // const isNotFoundWithoutAllergen = filteredRecipesByAllergen.length === 0;

    const isFound = useRef<boolean>(false);
    if (recipes && recipes.data.length > 0) {
        isFound.current = true;
    }

    const textSearchPanel =
        recipes?.data.length === 0
            ? 'По вашему запросу ничего не найдено. Попробуйте другой запрос'
            : '';

    useEffect(
        () => () => {
            dispatch(removeAllFiltersAction());
        },
        [dispatch],
    );

    if (!categories) return null;
    return (
        <Page>
            <VStack align='center'>
                <SearchPanel
                    text={textSearchPanel}
                    title={textSearchPanel ? '' : 'Приятного аппетита!'}
                    onSearch={handleRecipeSearch}
                    isFound={isFound.current}
                    onOpenDrawer={() => setCanSearch(false)}
                    onClearFilters={() => setView('default')}
                    // isNotFoundWithoutAllergen={isNotFoundWithoutAllergen}
                />
                <VStack spacing={{ base: '32px', lg: '40px' }} w='100%'>
                    {view === 'search' ? (
                        <>
                            <Stack
                                direction='row'
                                wrap='wrap'
                                columnGap={{ base: '16px', lg: '24px' }}
                                rowGap='16px'
                                mt='32px'
                            >
                                {recipes && (
                                    <FoundRecipesCards
                                        recipes={recipes.data}
                                        searchString={searchString}
                                    />
                                )}
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
                            <NewRecipesBlock categories={categories} />
                            <JuisiestBlock categories={categories} />
                            <CulinaryBlogs />
                            <RelevantKitchen />
                        </>
                    )}
                </VStack>
                {isError && <ErrorAlert />}
            </VStack>
        </Page>
    );
};
