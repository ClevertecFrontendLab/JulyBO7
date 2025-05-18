import { Button, Stack, VStack } from '@chakra-ui/react';
import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { setIsAuthAction } from '~/app/store/app-slice';
import { useAppDispatch } from '~/app/store/hooks';
import { FoundRecipesCards, Recipe } from '~/entities/recipe';
import { useCheckAuthQuery } from '~/features/auth';
import { PageLayout } from '~/shared/components/layouts';
import { AppLoader } from '~/shared/components/loader';
import { NewRecipesBlock } from '~/shared/components/new-recipes-block/ui/NewRecipesBlock';
import { RelevantKitchen } from '~/shared/components/relevant-kitchen';
import { AppRoutes, routePaths } from '~/shared/config/router';
import { removeAllFiltersAction } from '~/widgets/drawer';
import { SearchPanel } from '~/widgets/search-panel';

import { TITLE } from '../model/constants/mainpage';
import { CulinaryBlogs } from './culinary-blogs/CulinaryBlogs';
import { JuisiestBlock } from './juisiest-block/JuisiestBlock';

export const MainPage: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>();
    const { data, error, isLoading } = useCheckAuthQuery();

    const getFoundRecipes = useCallback((recipes: Recipe[]) => {
        setFilteredRecipes(recipes);
    }, []);

    useEffect(() => {
        dispatch(removeAllFiltersAction());
    }, [dispatch]);

    useEffect(() => {
        if (error && 'status' in error && error.status === 403) {
            navigate(routePaths[AppRoutes.LOGIN]);
            return;
        }
        if (data) {
            dispatch(setIsAuthAction(true));
        }
    }, [error, navigate, dispatch, data]);

    return (
        <PageLayout>
            <VStack align='center'>
                <SearchPanel title={TITLE} getFoundRecipes={getFoundRecipes} />
                <VStack spacing={{ base: '32px', lg: '40px' }} w='100%'>
                    {filteredRecipes && filteredRecipes.length > 0 ? (
                        <>
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
                        </>
                    ) : (
                        <>
                            <NewRecipesBlock />
                            <JuisiestBlock />
                            <CulinaryBlogs />
                            <RelevantKitchen />
                        </>
                    )}
                </VStack>
            </VStack>
            {isLoading && <AppLoader />}
        </PageLayout>
    );
};
