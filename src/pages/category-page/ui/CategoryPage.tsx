import { Button, Stack, VStack } from '@chakra-ui/react';
import { FC, useCallback } from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { useAppDispatch } from '~/app/store/hooks';
import { useGetCategoryByIdQuery } from '~/entities/category';
import { FoundRecipesCards, Recipe } from '~/entities/recipe';
import { Page } from '~/shared/components/page/ui/Page';
import { PageTabs } from '~/shared/components/page-tabs/ui/PageTabs';
import { RelevantKitchen } from '~/shared/components/relevant-kitchen/ui/RelevantKitchen';
import { getCurrentCategoryByPath } from '~/shared/lib/getCurrentCategoryByPath';
import { removeAllFiltersAction } from '~/widgets/drawer';
import { SearchPanel } from '~/widgets/search-panel';

type CategoryPageProps = {
    categoryId: string;
};

export const CategoryPage: FC<CategoryPageProps> = ({ categoryId }) => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();

    const { data: category } = useGetCategoryByIdQuery(categoryId);

    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>();

    const getFoundRecipes = useCallback((recipes: Recipe[]) => {
        setFilteredRecipes(recipes);
    }, []);

    const onChangeTab = (ind: number) => {
        setCurrentTabIndex(ind);
    };

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
        }
    }, [pathname, dispatch, category]);

    if (!category) return null;

    // let subcategoriesIds: string[] = [];
    // if (category) {
    //     subcategoriesIds = category.subCategories.map((subcat) => subcat._id);
    // }

    // const [view, setView] = useState<'default' | 'search'>('default');
    // const [canSearch, setCanSearch] = useState(false);

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
    //         meat: meatType.join(',') === '' ? undefined : meatType.join(','),
    //         garnish: sideType.join(',') === '' ? undefined : sideType.join(','),
    //         subcategoriesIds:
    //             subcategoriesIds.join(',') === '' ? undefined : subcategoriesIds.join(','),
    //         sortBy,
    //         sortOrder,
    //     },
    //     { skip: !canSearch },
    // );

    // const handleRecipeSearch = () => {
    //     setCanSearch(true);
    // };

    // if (
    //     recipes &&
    //     recipes.data.length > 0 &&
    //     view === 'default' &&
    //     (allergen.length !== 0 ||
    //         meatType.length !== 0 ||
    //         sideType.length !== 0 ||
    //         searchString.length !== 0)
    // ) {
    //     setView('search');
    // } else if (recipes && recipes.data.length === 0 && view === 'search') {
    //     setView('default');
    // }

    return (
        <Page>
            <VStack align='center'>
                <SearchPanel
                    title={category.title}
                    getFoundRecipes={getFoundRecipes}
                    withinCategory={category}
                />

                {filteredRecipes && filteredRecipes.length > 0 ? (
                    <VStack justify='center'>
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
            </VStack>
        </Page>
    );
};
