import { Button, Stack, VStack } from '@chakra-ui/react';
import { FC, useEffect, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '~/app/store/hooks';
import { useGetCategoriesQuery } from '~/entities/category';
import { getSubcategoriesIdsFilter } from '~/entities/category';
import { FoundRecipesCards, useGetRecipesQuery } from '~/entities/recipe';
import { NewRecipesBlock } from '~/shared/components/new-recipes-block/ui/NewRecipesBlock';
import { Page } from '~/shared/components/page/ui/Page';
import { PageHeader } from '~/shared/components/page-header/PageHeader';
import { RelevantKitchen } from '~/shared/components/relevant-kitchen';
import { removeAllFiltersAction, selectFilters } from '~/widgets/drawer';

import { CulinaryBlogs } from './culinary-blogs/CulinaryBlogs';
import { JuisiestBlock } from './juisiest-block/JuisiestBlock';

export const MainPage: FC = () => {
    const { data: categories } = useGetCategoriesQuery();
    const dispatch = useAppDispatch();

    const {
        allergen,
        meetType,
        sideType,
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
    const [inputValue, setInputValue] = useState<string>('');

    const [sortBy] = useState<'createdAt' | 'likes '>('createdAt');
    const [sortOrder] = useState<'asc' | 'desc'>('asc');

    const { data: recipes, isFetching } = useGetRecipesQuery(
        {
            page,
            limit,
            allergens: allergen.join(',') === '' ? undefined : allergen.join(','),
            searchString: inputValue,
            meat: meetType.join(',') === '' ? undefined : meetType.join(','),
            garnish: sideType.join(',') === '' ? undefined : sideType.join(','),
            subcategoriesIds:
                subcategoriesIds.join(',') === '' ? undefined : subcategoriesIds.join(','),
            sortBy,
            sortOrder,
        },
        { skip: !canSearch },
    );

    console.log('isFetching: ', isFetching, 'canSearch: ', canSearch, 'recipes', recipes);

    if (recipes && recipes.data.length > 0 && view === 'default') {
        setView('search');
    }

    const handleRecipeSearch = () => {
        setCanSearch(true);
    };

    // const isNotFoundWithoutAllergen = filteredRecipesByAllergen.length === 0;

    const isFound = useRef<boolean>(false);
    if (recipes && recipes.data.length > 0) {
        isFound.current = true;
    }

    const handleInputChange = (value: string) => {
        setInputValue(value);
        setCanSearch(false);
    };
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
                <PageHeader
                    text={textSearchPanel}
                    title={textSearchPanel ? '' : 'Приятного аппетита!'}
                    onSearch={handleRecipeSearch}
                    inputValue={inputValue}
                    onChange={handleInputChange}
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
                                        searchString={inputValue}
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
            </VStack>
        </Page>
    );
};
