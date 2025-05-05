import { Button, Stack, VStack } from '@chakra-ui/react';
import { FC, useRef } from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import { useAppDispatch } from '~/app/store/hooks';
import { useGetCategoryByIdQuery } from '~/entities/category';
import { FoundRecipesCards, useGetRecipesQuery } from '~/entities/recipe';
import { Page } from '~/shared/components/page/ui/Page';
import { removeAllAllergensAction } from '~/shared/components/page-header';
import { PageHeader } from '~/shared/components/page-header/PageHeader';
import { PageTabs } from '~/shared/components/page-tabs/ui/PageTabs';
import { RelevantKitchen } from '~/shared/components/relevant-kitchen/ui/RelevantKitchen';
import { getCurrentCategoryByPath } from '~/shared/lib/getCurrentCategoryByPath';
import {
    removeAllFiltersAction,
    selectAllergenFilter,
    selectMeetTypeFilter,
    selectSideTypeFilter,
} from '~/widgets/drawer';

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

    let subcategoriesIds: string[] = [];
    if (category) {
        subcategoriesIds = category.subCategories.map((subcat) => subcat._id);
    }

    const [canSearch, setCanSearch] = useState(false);
    const [page] = useState(1);
    const [limit] = useState(8);
    const [inputValue, setInputValue] = useState<string>('');

    const [sortBy] = useState<'createdAt' | 'likes '>('createdAt');
    const [sortOrder] = useState<'asc' | 'desc'>('asc');

    const { data: recipes } = useGetRecipesQuery(
        {
            page,
            limit,
            allergens: allergen.join(',') === '' ? undefined : allergen.join(','),
            searchString: inputValue,
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

    const handleInputChange = (value: string) => {
        setInputValue(value);
        setCanSearch(false);
    };

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
                dispatch(removeAllAllergensAction());
            };
        }
    }, [pathname, dispatch, category]);

    if (!category) return null;
    return (
        <Page>
            <VStack align='center'>
                <PageHeader
                    text={textSearchPanel}
                    title={category.title}
                    onSearch={handleRecipeSearch}
                    inputValue={inputValue}
                    onChange={handleInputChange}
                    isFound={isFound.current}
                    onOpenDrawer={() => setCanSearch(false)}
                />

                {recipes && recipes.data.length > 0 ? (
                    <VStack justify='center'>
                        <Stack
                            direction='row'
                            wrap='wrap'
                            columnGap={{ base: '16px', lg: '24px' }}
                            rowGap='16px'
                            mt='32px'
                        >
                            <FoundRecipesCards recipes={recipes.data} searchString={inputValue} />
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
                            // items={category?.subCategories}
                            tabIndex={currentTabIndex}
                            // titleCategory={categoryData.title}
                            // category='vegan'
                            // pathCategory={categoryData.routePath}
                        />

                        <RelevantKitchen category={category.category} />
                    </>
                )}
            </VStack>
        </Page>
    );
};
