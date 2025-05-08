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

    useEffect(() => {
        setFilteredRecipes([]);
    }, [dispatch, categoryId]);

    useEffect(() => {
        if (category) {
            const tabIndex = getCurrentCategoryByPath(pathname, category);
            if (tabIndex !== undefined) {
                setCurrentTabIndex(tabIndex);
            }
        }
    }, [pathname, dispatch, category]);

    if (!category) return null;

    return (
        <Page>
            <VStack align='center'>
                <SearchPanel
                    title={category.title}
                    getFoundRecipes={getFoundRecipes}
                    searchWithinCategory={category}
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
