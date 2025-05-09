import { Button, Stack, VStack } from '@chakra-ui/react';
import { FC, useCallback, useEffect, useState } from 'react';

import { useAppDispatch } from '~/app/store/hooks';
import { FoundRecipesCards, Recipe } from '~/entities/recipe';
import { NewRecipesBlock } from '~/shared/components/new-recipes-block/ui/NewRecipesBlock';
import { Page } from '~/shared/components/page/ui/Page';
import { RelevantKitchen } from '~/shared/components/relevant-kitchen';
import { removeAllFiltersAction } from '~/widgets/drawer';
import { SearchPanel } from '~/widgets/search-panel';

import { TITLE } from '../model/constants/mainpage';
import { CulinaryBlogs } from './culinary-blogs/CulinaryBlogs';
import { JuisiestBlock } from './juisiest-block/JuisiestBlock';

export const MainPage: FC = () => {
    const dispatch = useAppDispatch();

    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>();

    const getFoundRecipes = useCallback((recipes: Recipe[]) => {
        setFilteredRecipes(recipes);
    }, []);

    useEffect(() => {
        dispatch(removeAllFiltersAction());
    }, [dispatch]);

    return (
        <Page>
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
        </Page>
    );
};
