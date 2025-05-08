import { Button, Stack, VStack } from '@chakra-ui/react';
import { FC, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { setAppError } from '~/app/store/app-slice';
import { useAppDispatch } from '~/app/store/hooks';
import { useGetCategoriesQuery } from '~/entities/category';
import { FoundRecipesCards, Recipe, useGetRecipesQuery } from '~/entities/recipe';
import { HorizontalCard } from '~/shared/components/card/ui/horizontal-card/HorizontalCard';
import { AppLoader } from '~/shared/components/loader';
import { Page } from '~/shared/components/page/ui/Page';
import { RelevantKitchen } from '~/shared/components/relevant-kitchen/ui/RelevantKitchen';
import { LOAD_MORE_BUTTON } from '~/shared/constants/tests';
import { getRecipeCardHandler } from '~/shared/lib/getRecipeCardHandler';
import { SubCategory } from '~/shared/types/categories';
import { removeAllFiltersAction } from '~/widgets/drawer';
import { SearchPanel } from '~/widgets/search-panel';

export const JuiciestPage: FC = () => {
    const { data: categories } = useGetCategoriesQuery();
    const initialLimit = 8;

    const [page] = useState(1);
    const [limit, setLimit] = useState(initialLimit);

    const {
        data: recipes,
        isError,
        isFetching,
    } = useGetRecipesQuery({
        page,
        limit,
        sortBy: 'likes',
        sortOrder: 'desc',
    });

    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const totalCount = recipes?.meta.total;

    let isButtonRender = true;

    if (recipes && recipes.data.length === totalCount) {
        isButtonRender = false;
    }
    const handleLoading = () => {
        setLimit(limit + initialLimit);
    };

    let juiciestRecipes;

    if (categories && recipes) {
        juiciestRecipes = recipes.data.map((recipe, idx) => {
            const subcategory = categories.find(
                (category) => category._id === recipe.categoriesIds[0],
            )!;
            const category = categories.find(
                (category) => category._id === subcategory.rootCategoryId,
            )!;
            const handleCook = getRecipeCardHandler(
                recipe,
                navigate,
                category,
                subcategory as SubCategory,
                pathname,
            );

            return (
                <HorizontalCard
                    categories={categories}
                    indexForTest={idx}
                    key={idx}
                    recipe={recipe}
                    title={recipe.title}
                    onCook={handleCook}
                />
            );
        });
    }
    //ПОЛУЧЕНИЕ ОТФИЛЬТРОВАННЫХ РЕЦЕПТОВ:
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>();

    const getFoundRecipes = useCallback((recipes: Recipe[]) => {
        setFilteredRecipes(recipes);
    }, []);

    //--------------------------------------------------------------------------------------------------------------

    useEffect(() => {
        if (isError) {
            dispatch(setAppError('на сервере произошла ошибка попробуйте позже'));
        }
    }, [isError, dispatch]);

    useEffect(
        () => () => {
            dispatch(removeAllFiltersAction());
        },
        [dispatch],
    );

    return (
        <Page>
            {isFetching ? <AppLoader /> : null}
            <VStack align='center'>
                <SearchPanel getFoundRecipes={getFoundRecipes} title='Самое сочное' />
            </VStack>
            <Stack
                direction='row'
                wrap='wrap'
                columnGap={{ base: '16px', lg: '24px' }}
                rowGap='16px'
                mt='32px'
            >
                {filteredRecipes && filteredRecipes.length > 0 ? (
                    <FoundRecipesCards recipes={filteredRecipes} />
                ) : (
                    juiciestRecipes
                )}
            </Stack>
            <VStack mt='16px' align='center'>
                {isButtonRender ? (
                    <Button
                        data-test-id={LOAD_MORE_BUTTON}
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
            {filteredRecipes && filteredRecipes.length > 0 ? null : <RelevantKitchen />}
        </Page>
    );
};
