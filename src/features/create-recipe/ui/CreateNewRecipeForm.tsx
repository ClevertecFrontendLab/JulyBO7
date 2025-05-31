import { Box, Button, Stack, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useCallback, useEffect, useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useBlocker, useLocation, useNavigate } from 'react-router';

import { setSuccessMessageAction } from '~/app/store/app-slice';
import { useAppDispatch } from '~/app/store/hooks';
import { useGetCategoriesQuery } from '~/entities/category';
import { useCreateDraftMutation } from '~/entities/recipe/model/services/recipe';
import Pen from '~/shared/assets/icons/components/Pen';
import { Alert } from '~/shared/components/alert';
import { AppLoader } from '~/shared/components/loader';
import { AppRoutes, routePaths } from '~/shared/config/router';
import { getRecipeCardHandler as getNavigateHandler } from '~/shared/lib/getRecipeCardHandler';
import { SubCategory } from '~/shared/types/categories';

import {
    BRIEF_DESCRIPTION_OF_THE_RECIPE,
    DRAFT_SAVED,
    HOW_LONG_DOES_IT_TAKE_TO_COOK_IN_MINUTES,
    HOW_MANY_PEOPLE_YOUR_RECIPE,
    RECIPE_PUBLISHED_SUCCESSFULLY,
    RECIPE_TITLE,
} from '../model/constants/formText';
import {
    CreateDraftFormSchema,
    createDraftFormSchema,
} from '../model/schemas/createDraftFormSchema';
import {
    CreateNewRecipeFormData,
    createNewRecipeFormSchema,
} from '../model/schemas/createNewRecipeFormSchema';
import { AddCookingSteps } from './add-cooking-steps/AddCookingSteps';
import { AddIngredient } from './add-ingredient/AddIngredient';
import { ConfirmNavigation } from './confirm-navigation/ConfirmNavigation';
import { FormImage } from './form-image/FormImage';
import { FormInput } from './form-input/FormInput';
import { FormNumberInput } from './form-number-input/FormNumberInput';
import { FormSelect } from './form-select/FormSelect';
import { FormTextarea } from './form-textarea/FormTextarea';

type CreateNewRecipeFormProps = {
    defaultValues: Partial<CreateNewRecipeFormData>;
    triggerToPublishRecipe: unknown;
    recipeId?: string;
};
export const CreateNewRecipeForm: FC<CreateNewRecipeFormProps> = (props) => {
    const { defaultValues, triggerToPublishRecipe, recipeId } = props;

    const { data: categories } = useGetCategoriesQuery();
    const subcategories = categories?.filter((category) => category.rootCategoryId);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [mode, setMode] = useState<'draft' | 'newRecipe' | 'start'>('start');
    const [shouldBlockNavigate, setShouldBlockNavigate] = useState(true);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const dispatch = useAppDispatch();

    const { handleSubmit, control, formState, getValues } = useForm<
        CreateNewRecipeFormData | CreateDraftFormSchema
    >({
        defaultValues,
        mode: 'onSubmit',

        resolver: zodResolver(
            mode === 'newRecipe' ? createNewRecipeFormSchema : createDraftFormSchema,
        ),
    });
    const [createDraftTrigger, { isLoading: createDraftIsLoading }] = useCreateDraftMutation();

    const [errorMessage, setErrorMessage] = useState<null | { title: string; text: string }>();

    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            formState.isDirty &&
            shouldBlockNavigate &&
            currentLocation.pathname !== nextLocation.pathname,
    );

    const onSubmit: SubmitHandler<CreateNewRecipeFormData | CreateDraftFormSchema> = async (
        data,
    ) => {
        setShouldBlockNavigate(false);

        if (mode === 'draft') {
            try {
                await createDraftTrigger(data).unwrap();

                dispatch(setSuccessMessageAction(DRAFT_SAVED));
                navigate(routePaths[AppRoutes.MAIN]);
            } catch {
                setErrorMessage({
                    title: 'Ошибка сервера',
                    text: 'Не получилось сохранить в черновик.',
                });
            } finally {
                setShouldBlockNavigate(true);
                setMode('start');
            }
        }
        if (mode === 'newRecipe') {
            try {
                let res;
                if (recipeId) {
                    res = await triggerToPublishRecipe({
                        formData: data,
                        id: recipeId,
                    }).unwrap();
                } else {
                    res = await triggerToPublishRecipe(data).unwrap();
                }

                dispatch(setSuccessMessageAction(RECIPE_PUBLISHED_SUCCESSFULLY));

                if (categories && subcategories) {
                    const firstRecipeSubcategory = subcategories.find(
                        (sub) => sub._id === res.categoriesIds[0],
                    );
                    const categoryRecipe = categories.find(
                        (cat) => cat._id === firstRecipeSubcategory?.rootCategoryId,
                    );
                    if (firstRecipeSubcategory && categoryRecipe) {
                        const navigateToRecipePage = getNavigateHandler(
                            res,
                            navigate,
                            categoryRecipe,
                            firstRecipeSubcategory as SubCategory,
                            pathname,
                        );
                        navigateToRecipePage();
                    }
                }
            } catch {
                setErrorMessage({
                    title: 'Ошибка сервера',
                    text: 'Попробуйте пока сохранить в черновик.',
                });
            } finally {
                setShouldBlockNavigate(true);
                setMode('start');
            }
        }
    };

    const handleSaveDraft = useCallback(async () => {
        const categoriesIds = getValues('categoriesIds');
        const description = getValues('description');
        const title = getValues('title');
        const image = getValues('image');
        const ingredients = getValues('ingredients');
        const portions = getValues('portions');
        const steps = getValues('steps');
        const time = getValues('time');

        if (formState.isValid) {
            try {
                await createDraftTrigger({
                    description,
                    categoriesIds,
                    title,
                    image,
                    ingredients,
                    portions,
                    steps,
                    time,
                }).unwrap();

                blocker.proceed?.();
            } catch {
                setErrorMessage({
                    title: 'Ошибка сервера',
                    text: 'Не получилось сохранить в черновик.',
                });
            } finally {
                setShouldBlockNavigate(true);
                setMode('start');
            }
        } else {
            setIsOpenModal(false);
            blocker.reset?.();
        }
    }, [formState.isValid, blocker, createDraftTrigger, getValues]);

    const handleCloseModal = () => {
        setIsOpenModal(false);
        blocker.reset?.();
    };

    useEffect(() => {
        if (blocker.state === 'blocked' && !formState.isDirty) {
            blocker.reset();
        }
    }, [blocker, formState.isDirty]);

    useEffect(() => {
        if (blocker.state === 'blocked') {
            setIsOpenModal(true);
        }
    }, [blocker.state]);

    const onError: SubmitErrorHandler<CreateNewRecipeFormData | CreateDraftFormSchema> = () => {
        setMode('start');
    };

    return (
        <Box pr={{ base: 0, '2xl': '115px' }}>
            <form onSubmit={handleSubmit(onSubmit, onError)} style={{ width: '100%' }}>
                <ConfirmNavigation
                    blocker={blocker}
                    onSaveDraft={handleSaveDraft}
                    isOpen={isOpenModal}
                    onClose={handleCloseModal}
                />
                <VStack align='center' w='100%' h='100%' spacing={{ base: '32px', lg: '40px' }}>
                    <Stack
                        flexDirection={{ base: 'column', md: 'row' }}
                        gap={{ base: '16px', lg: '24px' }}
                        w='100%'
                    >
                        <FormImage name='image' control={control} />

                        <VStack gap={{ base: '16px', lg: '24px' }}>
                            <FormSelect
                                options={subcategories}
                                control={control}
                                name='categoriesIds'
                            />
                            <FormInput name='title' control={control} placeholder={RECIPE_TITLE} />
                            <FormTextarea
                                name='description'
                                control={control}
                                placeholder={BRIEF_DESCRIPTION_OF_THE_RECIPE}
                            />
                            <FormNumberInput
                                name='portions'
                                control={control}
                                label={HOW_MANY_PEOPLE_YOUR_RECIPE}
                            />
                            <FormNumberInput
                                name='time'
                                control={control}
                                label={HOW_LONG_DOES_IT_TAKE_TO_COOK_IN_MINUTES}
                            />
                        </VStack>
                    </Stack>
                    <AddIngredient name='ingredients' control={control} />
                    <AddCookingSteps name='steps' control={control} />
                    <Stack flexDirection={{ base: 'column', md: 'row' }} gap='20px'>
                        <Button
                            onClick={() => {
                                console.log('CLICK НА КНОПКЕ СОХРАНИТЬ ЧЕРНОВКИ');
                                setMode('draft');
                            }}
                            type='submit'
                            h='48px'
                            p='0 24px'
                            variant='outline'
                            border='1px solid rgba(0, 0, 0, 0.48)'
                            leftIcon={<Pen fill='black' />}
                        >
                            Сохранить черновик
                        </Button>
                        <Button
                            onClick={() => {
                                console.log('CLICK НА КНОПКЕ ОТПРАВИТЬ РЕЦЕПТ');
                                setMode('newRecipe');
                            }}
                            type='submit'
                            h='48px'
                            p='0 24px'
                        >
                            Опубликовать рецепт
                        </Button>
                    </Stack>
                </VStack>
            </form>
            {createDraftIsLoading && <AppLoader />}
            {errorMessage && (
                <Alert
                    onClose={() => setErrorMessage(null)}
                    title={errorMessage.title}
                    text={errorMessage.text}
                    type='error'
                />
            )}
        </Box>
    );
};
