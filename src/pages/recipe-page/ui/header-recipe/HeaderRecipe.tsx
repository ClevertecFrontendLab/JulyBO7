import { Badge, Box, Button, Heading, HStack, Image, Stack, Text, VStack } from '@chakra-ui/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { FC, MouseEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { setSuccessMessageAction } from '~/app/store/app-slice';
import { useAppDispatch } from '~/app/store/hooks';
import { RecipeBages, useGetCategoriesQuery } from '~/entities/category';
import {
    Recipe,
    useDeleteRecipeMutation,
    useLikeRecipeMutation,
    useSaveRecipeMutation,
} from '~/entities/recipe';
import Alarm from '~/shared/assets/icons/components/Alarm';
import Basket from '~/shared/assets/icons/components/Basket';
import Bookmark from '~/shared/assets/icons/components/BsBookmarkHeart';
import Reaction from '~/shared/assets/icons/components/BsEmojiHeartEyes';
import Pen from '~/shared/assets/icons/components/Pen';
import { Alert } from '~/shared/components/alert';
import { AppLoader } from '~/shared/components/loader';
import { AppRoutes, routePaths } from '~/shared/config/router';
import { IMAGE_API } from '~/shared/constants/imageApi';
import { getRecipeCardHandler as getNavigateHandler } from '~/shared/lib/getRecipeCardHandler';
import { SubCategory } from '~/shared/types/categories';
import { ErrorMessage } from '~/shared/types/errors';

import { FAILED_TO_DELETE_RECIPE, SERVER_ERROR, TRY_LATER } from '../../model/constants/error';
import { RECIPE_DELETE_SUCCESS } from '../../model/constants/recipePage';

type HeaderRecipeProps = {
    recipe: Recipe;
    myRecipe: boolean;
};

export const HeaderRecipe: FC<HeaderRecipeProps> = (props) => {
    const { myRecipe, recipe } = props;
    const { data: categories } = useGetCategoriesQuery();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();

    const subcategories = categories?.filter((category) => category.rootCategoryId);

    const [trigger, { isLoading: deleteRecipeIsLoading }] = useDeleteRecipeMutation();
    const [likeRecipeTrigger] = useLikeRecipeMutation();
    const [saveRecipeTrigger] = useSaveRecipeMutation();

    const [errorMessage, setErrorMessage] = useState<ErrorMessage>();

    const handleEditRecipe = () => {
        if (categories && subcategories) {
            const firstRecipeSubcategory = subcategories.find(
                (sub) => sub._id === recipe.categoriesIds[0],
            );
            const categoryRecipe = categories.find(
                (cat) => cat._id === firstRecipeSubcategory?.rootCategoryId,
            );
            if (firstRecipeSubcategory && categoryRecipe) {
                const navigateToRecipePage = getNavigateHandler<Recipe>(
                    recipe,
                    navigate,
                    categoryRecipe,
                    firstRecipeSubcategory as SubCategory,
                    pathname,
                    '/edit-recipe',
                    recipe,
                );
                navigateToRecipePage();
            }
        }
    };
    const handleDeleteRecipe = async () => {
        try {
            await trigger(recipe._id);

            dispatch(setSuccessMessageAction(RECIPE_DELETE_SUCCESS));
            navigate(routePaths[AppRoutes.MAIN]);
        } catch (error) {
            const dataError = error as FetchBaseQueryError;
            if (dataError.status === 500) {
                setErrorMessage({ title: SERVER_ERROR, text: FAILED_TO_DELETE_RECIPE });
            }
        }
    };
    const handleRecipeLike = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            await likeRecipeTrigger(recipe._id);
        } catch (error) {
            const dataError = error as FetchBaseQueryError;
            if (dataError.status === 500) {
                setErrorMessage({ title: SERVER_ERROR, text: TRY_LATER });
            }
        }
    };

    const handleSaveRecipe = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            await saveRecipeTrigger(recipe._id);
        } catch (error) {
            const dataError = error as FetchBaseQueryError;
            if (dataError.status === 500) {
                setErrorMessage({ title: SERVER_ERROR, text: TRY_LATER });
            }
        }
    };

    const handleErrorAlertClose = () => {
        setErrorMessage(undefined);
    };

    return (
        <Stack
            w='100%'
            direction={{ base: 'column', md: 'row' }}
            mt={{ base: '16px', lg: '56px' }}
            gap={{ base: '16px', lg: '24px' }}
        >
            <Image
                src={`${IMAGE_API}${recipe.image}`}
                borderRadius='8px'
                w={{ base: '328px', md: '232px', lg: '353px', '2xl': '553px' }}
                h={{ base: '224px', md: '224px', lg: '410px', '2xl': '410px' }}
            />
            <VStack w='100%' justify='space-between'>
                <Box w='100%'>
                    <HStack mb='32px' justify='space-between' w='100%'>
                        <HStack flexWrap='wrap' spacing={{ base: '8px', '2xl': '16px' }}>
                            {categories && (
                                <RecipeBages
                                    recipe={recipe}
                                    onlyFirstCategory={false}
                                    categories={categories}
                                />
                            )}
                        </HStack>
                        <HStack gap='8px' alignSelf='start'>
                            <Button
                                variant='clear'
                                color='lime.600'
                                size={{ base: 'xs', '2xl': 'm' }}
                                fontWeight={600}
                                leftIcon={<Bookmark />}
                            >
                                {recipe.bookmarks}
                            </Button>
                            <Button
                                variant='clear'
                                color='lime.600'
                                size={{ base: 'xs', '2xl': 'm' }}
                                fontWeight={600}
                                leftIcon={<Reaction />}
                            >
                                {recipe.likes}
                            </Button>
                        </HStack>
                    </HStack>
                    <Box w='100%' mb={{ base: '24px', md: 0 }}>
                        <Heading
                            textStyle={{ lg: '2xl' }}
                            fontSize={{ base: '24px' }}
                            mb={{ base: '16px', lg: '24px' }}
                            w={{ '2xl': '437px' }}
                        >
                            {recipe.title}
                        </Heading>
                        <Text textStyle='s'>{recipe?.description}</Text>
                    </Box>
                </Box>

                <HStack flexWrap='wrap' justify='space-between' w='100%'>
                    <Badge
                        borderRadius='4px'
                        p='2px 8px'
                        bg='gray.300'
                        display='flex'
                        alignItems='center'
                        gap='8px'
                    >
                        <Alarm />
                        <Text as='span' textStyle='s'>{`${recipe.time} минут`}</Text>
                    </Badge>
                    {myRecipe ? (
                        <HStack>
                            <Button variant='clear' size={{ base: 'xs', lg: 'm', '2xl': 'xl' }}>
                                <Basket onClick={handleDeleteRecipe} fill='black' />
                            </Button>
                            <Button
                                onClick={handleEditRecipe}
                                variant='outline'
                                border='1px solid rgba(0, 0, 0, 0.48)'
                                size={{ base: 'xs', lg: 'm', '2xl': 'xl' }}
                                leftIcon={<Pen fill='black' />}
                            >
                                Редактировать рецепт
                            </Button>
                        </HStack>
                    ) : (
                        <HStack>
                            <Button
                                onClick={handleRecipeLike}
                                variant='outline'
                                size={{ base: 'xs', lg: 'm', '2xl': 'xl' }}
                                leftIcon={
                                    <Reaction
                                        w={{ base: '12px', lg: '14px', '2xl': '16px' }}
                                        h={{ base: '12px', lg: '14px', '2xl': '16px' }}
                                    />
                                }
                            >
                                Оценить рецепт
                            </Button>
                            <Button
                                onClick={handleSaveRecipe}
                                variant='solid'
                                color='primaryColor'
                                bg='lime.400'
                                size={{ base: 'xs', lg: 'm', '2xl': 'xl' }}
                                leftIcon={
                                    <Bookmark
                                        w={{ base: '12px', lg: '14px', '2xl': '16px' }}
                                        h={{ base: '12px', lg: '14px', '2xl': '16px' }}
                                    />
                                }
                            >
                                Сохранить в закладки
                            </Button>
                        </HStack>
                    )}
                </HStack>
            </VStack>
            {errorMessage && (
                <Alert
                    title={errorMessage?.title}
                    type='error'
                    text={errorMessage?.text}
                    onClose={handleErrorAlertClose}
                    // bottom={{ base: '100px', lg: '80px' }}
                    // left={{ base: '16px', md: '220px', lg: '155px', '2xl': '275px' }}
                    // transform='translateX(0)'
                />
            )}
            {deleteRecipeIsLoading && <AppLoader />}
        </Stack>
    );
};
