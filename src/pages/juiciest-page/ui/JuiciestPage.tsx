import { Button, Stack, VStack } from '@chakra-ui/react';
import { FC, useEffect, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '~/app/store/hooks';
import { getSubcategoriesIdsFilter, useGetCategoriesQuery } from '~/entities/category';
import { FoundRecipesCards, useGetRecipesQuery } from '~/entities/recipe';
import { ErrorAlert } from '~/shared/components/alert';
import { Page } from '~/shared/components/page/ui/Page';
import { RelevantKitchen } from '~/shared/components/relevant-kitchen/ui/RelevantKitchen';
import { removeAllFiltersAction, selectFilters } from '~/widgets/drawer';
import { SearchPanel } from '~/widgets/search-panel';

import { juiciestPageData } from '../model/mockData';

export const JuiciestPage: FC = () => {
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
    const initialLimit = 8;
    const [canSearch, setCanSearch] = useState(false);
    const [page] = useState(1);
    const [limit, setLimit] = useState(initialLimit);

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
            sortBy: 'likes',
            sortOrder: 'desc',
        },
        { skip: !canSearch },
    );
    const totalCount = recipes?.meta.total;

    let buttonRender = true;

    if (recipes && recipes.data.length === totalCount) {
        buttonRender = false;
    }
    const handleRecipeSearch = () => {
        setCanSearch(true);
    };

    const isFound = useRef<boolean>(false);
    if (recipes && recipes.data.length > 0) {
        isFound.current = true;
    }

    const textSearchPanel =
        recipes?.data.length === 0
            ? 'По вашему запросу ничего не найдено. Попробуйте другой запрос'
            : '';

    const handleLoading = () => {
        setLimit(limit + initialLimit);
        // setCanSearch(true);
    };

    useEffect(
        () => () => {
            dispatch(removeAllFiltersAction());
        },
        [dispatch],
    );

    return (
        <Page>
            <VStack align='center'>
                <SearchPanel
                    text={textSearchPanel}
                    title={juiciestPageData.headerPage.title}
                    onSearch={handleRecipeSearch}
                    isFound={isFound.current}
                />
            </VStack>
            <Stack
                direction='row'
                wrap='wrap'
                columnGap={{ base: '16px', lg: '24px' }}
                rowGap='16px'
                mt='32px'
            >
                {recipes && (
                    <FoundRecipesCards recipes={recipes.data} searchString={searchString} />
                )}
            </Stack>
            <VStack mt='16px' align='center'>
                {buttonRender ? (
                    <Button
                        onClick={handleLoading}
                        variant='solid'
                        bg='lime.400'
                        size='l'
                        color='primaryColor'
                    >
                        Загрузить еще
                    </Button>
                ) : null}
            </VStack>
            <RelevantKitchen />
            {isError && <ErrorAlert />}
        </Page>
    );
};
