import { Button, Stack, VStack } from '@chakra-ui/react';
import { FC, ReactElement, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import { useAppSelector } from '~/app/store/hooks';
import { useGetCategoriesQuery } from '~/entities/category';
import { useGetRecipesQuery } from '~/entities/recipe';
import { HorizontalCard } from '~/shared/components/card/ui/horizontal-card/HorizontalCard';
import { NewRecipesBlock } from '~/shared/components/new-recipes-block/ui/NewRecipesBlock';
import { Page } from '~/shared/components/page/ui/Page';
import { PageHeader } from '~/shared/components/page-header/PageHeader';
import { RelevantKitchen } from '~/shared/components/relevant-kitchen';
import { FOOD_CARD } from '~/shared/constants/tests';
import { getFoundRecipesTitle } from '~/shared/lib/getFoundRecipeTitle';
import { getRecipeCardHandler } from '~/shared/lib/getRecipeCardHandler';
import { SubCategory } from '~/shared/types/categories';
import { selectFilters } from '~/widgets/drawer';

import { CulinaryBlogs } from './culinary-blogs/CulinaryBlogs';
import { JuisiestBlock } from './juisiest-block/JuisiestBlock';

export const MainPage: FC = () => {
    const navigate = useNavigate();
    const { data: categories } = useGetCategoriesQuery();

    const {
        allergen,
        meetType,
        sideType,
        category: categoryFilter,
    } = useAppSelector(selectFilters);

    const categoriesData = categories?.filter((cat) => !cat.rootCategoryId);
    const subcategoriesIds: string[] = [];

    for (let i = 0; i < categoryFilter.length; i++) {
        const data = categoriesData?.find((data) => data.title === categoryFilter[i]);
        if (data) {
            data.subCategories.forEach((sub) => subcategoriesIds.push(sub._id));
        }
    }

    const [canSearch, setCanSearch] = useState(false);
    const [view, setView] = useState<'default' | 'search'>('default');
    const [page] = useState(1);
    const [limit] = useState(8);
    const [inputValue, setInputValue] = useState<string>(''); // поиск

    const [sortBy] = useState<'createdAt' | 'likes '>('createdAt');
    const [sortOrder] = useState<'asc' | 'desc'>('asc');

    const prevAllergenLength = useRef<number>(allergen.length);

    if (prevAllergenLength.current !== allergen.length) {
        setCanSearch(true);
        prevAllergenLength.current = allergen.length;
    }

    const { data: recipes } = useGetRecipesQuery(
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

    if (recipes && recipes.data.length > 0 && view === 'default') {
        setView('search');
    }

    const handleRecipeSearch = () => {
        setCanSearch(true);
    };

    const recipeCards = recipes?.data.map((recipe, idx) => {
        let index;
        const reg = new RegExp(inputValue, 'i');
        const match = recipe.title.match(reg);
        if (match) {
            index = match['index'];
        }
        const updatedTitle: ReactElement = getFoundRecipesTitle(
            recipe.title,
            index!,
            inputValue.length,
        );
        let handleCook;
        if (categories) {
            const subcategory = categories.find(
                (category) => category._id === recipe.categoriesIds[0],
            )!;
            const category = categories.find(
                (category) => category._id === subcategory.rootCategoryId,
            )!;
            handleCook = getRecipeCardHandler(
                recipe,
                navigate,
                category,
                subcategory as SubCategory,
            );
        }
        return (
            <HorizontalCard
                data-test-id={`${FOOD_CARD}-${idx}`}
                key={idx}
                title={updatedTitle}
                onCook={handleCook}
                recipe={recipe}
            />
        );
    });

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
                                {recipeCards}
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
