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

    const [page, setPage] = useState(1);
    const [limit] = useState(8);
    const [loadedRecipes, setLoadedRecipes] = useState<Recipe[]>([]);

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

    const totalCountPages = recipes && Math.ceil(recipes.meta.total / limit);

    const handleLoading = () => {
        setPage(page + 1);
    };

    if (isError) {
        dispatch(setAppError('ошибка'));
    }

    const juiciestRecipes = loadedRecipes.map((recipe, idx) => {
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
                pathname,
            );
        }
        return (
            <HorizontalCard
                data-test-id={`food-card-${idx}`}
                categories={categories}
                indexForTest={idx}
                key={idx}
                recipe={recipe}
                title={recipe.title}
                onCook={handleCook}
            />
        );
    });

    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>();

    const getFoundRecipes = useCallback((recipes: Recipe[]) => {
        setFilteredRecipes(recipes);
    }, []);

    useEffect(() => {
        if (recipes) {
            setLoadedRecipes([...loadedRecipes, ...recipes.data]);
        }
    }, [recipes]);

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
                {totalCountPages === page ? null : (
                    <Button
                        data-test-id={LOAD_MORE_BUTTON}
                        onClick={handleLoading}
                        variant='solid'
                        bg='lime.400'
                        size='l'
                        color='primaryColor'
                    >
                        Загрузка
                    </Button>
                )}
            </VStack>
            {filteredRecipes && filteredRecipes.length > 0 ? null : <RelevantKitchen />}
        </Page>
    );
};
