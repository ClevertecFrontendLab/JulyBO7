import { Box, Button, Stack, VStack } from '@chakra-ui/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { FC, useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useBlocker, useLocation, useNavigate } from 'react-router';

import { setSuccessMessageAction } from '~/app/store/app-slice';
import { useAppDispatch } from '~/app/store/hooks';
import { useGetCategoriesQuery } from '~/entities/category';
import { useCreateDraftMutation } from '~/entities/recipe';
import Pen from '~/shared/assets/icons/components/Pen';
import { Alert } from '~/shared/components/alert';
import { AppLoader } from '~/shared/components/loader';
import { AppRoutes, routePaths } from '~/shared/config/router';
import {
    RECIPE_FORM,
    RECIPE_PORTIONS,
    RECIPE_PUBLISH_RECIPE_BUTTON,
    RECIPE_SAVE_DRAFT_BUTTON,
    RECIPE_TIME,
} from '~/shared/constants/tests';
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
    const [shouldBlockNavigate, setShouldBlockNavigate] = useState(true);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isInvalidRecipeForm, setIsInvalidRecipeForm] = useState(false);
    const [isInvalidDraftForm, setIsInvalidDraftForm] = useState(false);

    const dispatch = useAppDispatch();

    const form = useForm<CreateNewRecipeFormData | CreateDraftFormSchema>({
        defaultValues,
    });

    const [createDraftTrigger, { isLoading: createDraftIsLoading }] = useCreateDraftMutation();

    const [errorMessage, setErrorMessage] = useState<null | { title: string; text: string }>();

    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            form.formState.isDirty &&
            shouldBlockNavigate &&
            currentLocation.pathname !== nextLocation.pathname,
    );

    const onSubmit: SubmitHandler<CreateNewRecipeFormData | CreateDraftFormSchema> = async (
        data,
        event,
    ) => {
        const isDraft = event?.nativeEvent?.submitter?.id === 'draft';
        const schema = isDraft ? createDraftFormSchema : createNewRecipeFormSchema;
        const validData = schema.safeParse(data);

        setShouldBlockNavigate(false);

        if (isDraft) {
            if (validData.success) {
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
                }
            } else {
                setIsInvalidRecipeForm(false);
                setIsInvalidDraftForm(true);
            }
        }
        if (!isDraft) {
            console.log('fetch recipe - error: ', validData.error);
            if (validData.success) {
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
                } catch (error) {
                    const dataError = error as FetchBaseQueryError;
                    if (dataError.status === 500) {
                        setErrorMessage({
                            title: 'Ошибка сервера',
                            text: 'Попробуйте пока сохранить в черновик.',
                        });
                    }
                    if (dataError.status === 409) {
                        setErrorMessage({
                            title: 'Ошибка',
                            text: 'Рецепт с таким названием уже существует',
                        });
                    }
                } finally {
                    setShouldBlockNavigate(true);
                }
            } else {
                setIsInvalidRecipeForm(true);
                setIsInvalidDraftForm(false);
            }
        }
    };

    const handleSaveDraft = useCallback(async () => {
        const categoriesIds = form.getValues('categoriesIds');
        const description = form.getValues('description');
        const title = form.getValues('title');
        const image = form.getValues('image');
        const ingredients = form.getValues('ingredients');
        const portions = form.getValues('portions');
        const steps = form.getValues('steps');
        const time = form.getValues('time');

        if (form.formState.isValid) {
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
            }
        } else {
            setIsOpenModal(false);
            blocker.reset?.();
        }
    }, [form.formState.isValid, blocker, createDraftTrigger, form.getValues, form]);

    const handleCloseModal = () => {
        setIsOpenModal(false);
        blocker.reset?.();
    };

    useEffect(() => {
        if (blocker.state === 'blocked' && !form.formState.isDirty) {
            blocker.reset();
        }
    }, [blocker, form.formState.isDirty, form]);

    useEffect(() => {
        if (blocker.state === 'blocked') {
            setIsOpenModal(true);
        }
    }, [blocker.state]);

    return (
        <Box pr={{ base: 0, '2xl': '115px' }}>
            <form
                data-test-id={RECIPE_FORM}
                onSubmit={form.handleSubmit(onSubmit)}
                style={{ width: '100%' }}
            >
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
                        <FormImage
                            name='image'
                            control={form.control}
                            invalid={isInvalidRecipeForm}
                        />

                        <VStack gap={{ base: '16px', lg: '24px' }}>
                            <FormSelect
                                options={subcategories}
                                control={form.control}
                                name='categoriesIds'
                                invalid={isInvalidRecipeForm}
                            />
                            <FormInput
                                name='title'
                                control={form.control}
                                placeholder={RECIPE_TITLE}
                                invalid={isInvalidRecipeForm || isInvalidDraftForm}
                            />
                            <FormTextarea
                                name='description'
                                control={form.control}
                                placeholder={BRIEF_DESCRIPTION_OF_THE_RECIPE}
                                invalid={isInvalidRecipeForm}
                            />
                            <FormNumberInput
                                dataTestId={RECIPE_PORTIONS}
                                name='portions'
                                control={form.control}
                                label={HOW_MANY_PEOPLE_YOUR_RECIPE}
                                invalid={isInvalidRecipeForm}
                            />
                            <FormNumberInput
                                dataTestId={RECIPE_TIME}
                                name='time'
                                control={form.control}
                                label={HOW_LONG_DOES_IT_TAKE_TO_COOK_IN_MINUTES}
                                invalid={isInvalidRecipeForm}
                            />
                        </VStack>
                    </Stack>
                    <AddIngredient
                        name='ingredients'
                        control={form.control}
                        invalid={isInvalidRecipeForm}
                    />
                    <AddCookingSteps
                        name='steps'
                        control={form.control}
                        invalid={isInvalidRecipeForm}
                    />
                    <Stack flexDirection={{ base: 'column', md: 'row' }} gap='20px'>
                        <Button
                            data-test-id={RECIPE_SAVE_DRAFT_BUTTON}
                            id='draft'
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
                            data-test-id={RECIPE_PUBLISH_RECIPE_BUTTON}
                            id='newRecipe'
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
