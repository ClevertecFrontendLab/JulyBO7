import { Button, Stack, VStack } from '@chakra-ui/react';
import { FC, useCallback } from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { useAppDispatch } from '~/app/store/hooks';
import { FoundRecipesCards, Recipe } from '~/entities/recipe';
import { PageLayout } from '~/shared/components/layouts';
import { PageTabs } from '~/shared/components/page-tabs/ui/PageTabs';
import { RelevantKitchen } from '~/shared/components/relevant-kitchen/ui/RelevantKitchen';
import { getCurrentCategoryByPath } from '~/shared/lib/getCurrentCategoryByPath';
import { Category } from '~/shared/types/categories';
import { SearchPanel } from '~/widgets/search-panel';

export const CategoryPage: FC<{ categoryData: Category }> = ({ categoryData }) => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();

    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>();

    const getFoundRecipes = useCallback((recipes: Recipe[]) => {
        setFilteredRecipes(recipes);
    }, []);

    useEffect(() => {
        setFilteredRecipes([]);
    }, [dispatch, categoryData]);

    useEffect(() => {
        if (categoryData) {
            const tabIndex = getCurrentCategoryByPath(pathname, categoryData);
            if (tabIndex !== undefined) {
                setCurrentTabIndex(tabIndex);
            }
        }
    }, [pathname, dispatch, categoryData]);

    return (
        <PageLayout>
            <VStack align='center'>
                <SearchPanel
                    title={categoryData.title}
                    getFoundRecipes={getFoundRecipes}
                    searchWithinCategory={categoryData}
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
                        <PageTabs categoryData={categoryData} tabIndex={currentTabIndex} />
                        <RelevantKitchen category={categoryData.category} />
                    </>
                )}
            </VStack>
        </PageLayout>
    );
};
