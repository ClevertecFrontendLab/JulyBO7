import { Button, Stack, VStack } from '@chakra-ui/react';
import { FC, useRef } from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import { useAppDispatch } from '~/app/store/hooks';
import { useGetCategoryByIdQuery } from '~/entities/category';
import { FoundRecipesCards, useGetRecipesQuery } from '~/entities/recipe';
import { ErrorAlert } from '~/shared/components/alert';
import { Page } from '~/shared/components/page/ui/Page';
import { PageTabs } from '~/shared/components/page-tabs/ui/PageTabs';
import { RelevantKitchen } from '~/shared/components/relevant-kitchen/ui/RelevantKitchen';
import { getCurrentCategoryByPath } from '~/shared/lib/getCurrentCategoryByPath';
import {
    removeAllFiltersAction,
    selectAllergenFilter,
    selectMeetTypeFilter,
    selectSearchString,
    selectSideTypeFilter,
} from '~/widgets/drawer';
import { SearchPanel } from '~/widgets/search-panel';

type CategoryPageProps = {
    categoryId: string;
};

export const CategoryPage: FC<CategoryPageProps> = ({ categoryId }) => {
    const { pathname } = useLocation();
    const { data: category } = useGetCategoryByIdQuery(categoryId);
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const dispatch = useAppDispatch();

    const allergen = useSelector(selectAllergenFilter);
    const meatType = useSelector(selectMeetTypeFilter);
    const sideType = useSelector(selectSideTypeFilter);
    const searchString = useSelector(selectSearchString);

    let subcategoriesIds: string[] = [];
    if (category) {
        subcategoriesIds = category.subCategories.map((subcat) => subcat._id);
    }

    const [view, setView] = useState<'default' | 'search'>('default');
    const [canSearch, setCanSearch] = useState(false);

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
            meat: meatType.join(',') === '' ? undefined : meatType.join(','),
            garnish: sideType.join(',') === '' ? undefined : sideType.join(','),
            subcategoriesIds:
                subcategoriesIds.join(',') === '' ? undefined : subcategoriesIds.join(','),
            sortBy,
            sortOrder,
        },
        { skip: !canSearch },
    );

    const handleRecipeSearch = () => {
        setCanSearch(true);
    };

    if (
        recipes &&
        recipes.data.length > 0 &&
        view === 'default' &&
        (allergen.length !== 0 ||
            meatType.length !== 0 ||
            sideType.length !== 0 ||
            searchString.length !== 0)
    ) {
        setView('search');
    } else if (recipes && recipes.data.length === 0 && view === 'search') {
        setView('default');
    }
    const onChangeTab = (ind: number) => {
        setCurrentTabIndex(ind);
    };

    const textSearchPanel =
        recipes && recipes.data.length === 0
            ? 'По вашему запросу ничего не найдено. Попробуйте другой запрос'
            : category?.description;

    const isFound = useRef<boolean>(false);
    if (recipes && recipes.data.length > 0) {
        isFound.current = true;
    }
    useEffect(
        () => () => {
            dispatch(removeAllFiltersAction());
        },
        [dispatch],
    );
    useEffect(() => {
        if (category) {
            const tabIndex = getCurrentCategoryByPath(pathname, category);
            if (tabIndex !== undefined) {
                setCurrentTabIndex(tabIndex);
            }
            return () => {
                // dispatch(removeAllAllergensAction());
            };
        }
    }, [pathname, dispatch, category]);

    if (!category) return null;
    return (
        <Page>
            <VStack align='center'>
                <SearchPanel
                    text={textSearchPanel}
                    title={category.title}
                    onSearch={handleRecipeSearch}
                    isFound={isFound.current}
                    onOpenDrawer={() => setCanSearch(false)}
                />

                {view == 'search' ? (
                    <VStack justify='center'>
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
                    </VStack>
                ) : (
                    <>
                        <PageTabs
                            categoryData={category}
                            onChangeTab={onChangeTab}
                            tabIndex={currentTabIndex}
                        />

                        <RelevantKitchen category={category.category} />
                    </>
                )}
                {isError && <ErrorAlert />}
            </VStack>
        </Page>
    );
};
