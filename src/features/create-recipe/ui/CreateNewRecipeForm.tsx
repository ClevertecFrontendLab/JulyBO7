import { Box, Button, Stack, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect, useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useBlocker, useLocation, useNavigate } from 'react-router';

import { setSuccessMessageAction } from '~/app/store/app-slice';
import { useAppDispatch } from '~/app/store/hooks';
import { useGetCategoriesQuery } from '~/entities/category';
import { useCreateRecipeMutation } from '~/entities/recipe';
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

export const CreateNewRecipeForm: FC = () => {
    const { data: categories } = useGetCategoriesQuery();
    const subcategories = categories?.filter((category) => category.rootCategoryId);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [mode, setMode] = useState<'draft' | 'newRecipe' | 'start'>('start');
    const [shouldBlockNavigate, setShouldBlockNavigate] = useState(true);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const dispatch = useAppDispatch();

    const { handleSubmit, control, formState } = useForm<
        CreateNewRecipeFormData | CreateDraftFormSchema
    >({
        defaultValues: {
            categoriesIds: [],
            title: '',
            description: undefined,
            time: undefined,
            portions: undefined,
            image: undefined,
            steps: [{ description: undefined, stepNumber: 1, image: undefined }],
            ingredients: [],
        },
        mode: 'onSubmit',

        resolver: zodResolver(mode === 'draft' ? createDraftFormSchema : createNewRecipeFormSchema),
    });
    const [createRecipeTrigger, { isLoading: createRecipeIsLoading }] = useCreateRecipeMutation();
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
            console.log('onsubmitDraft:', data);

            try {
                const res = await createDraftTrigger(data).unwrap();
                console.log('res', res);

                if (isOpenModal) {
                    blocker.proceed?.();
                } else {
                    dispatch(setSuccessMessageAction(DRAFT_SAVED));
                    navigate(routePaths[AppRoutes.MAIN]);
                }
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
                console.log('onsubmitCreate:', data);

                const res = await createRecipeTrigger(data).unwrap();
                dispatch(setSuccessMessageAction(DRAFT_SAVED));

                console.log('res', res);
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
    const handleSaveDraft = () => {
        setMode('draft');
        console.log('onsave draft - form is validate', formState.isValid);
    };
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

    useEffect(() => {
        if (!formState.isValid && isOpenModal && mode === 'draft') {
            handleCloseModal();
            setMode('start');
        }
    }, [formState.isValid, isOpenModal, mode]);

    const onError: SubmitErrorHandler<CreateNewRecipeFormData | CreateDraftFormSchema> = (
        errors,
    ) => {
        console.log('ON ERROR - mode: ', mode, 'errrors: ', errors);

        setMode('start');
    };

    return (
        <Box pr={{ base: 0, '2xl': '115px' }}>
            <form onSubmit={handleSubmit(onSubmit, onError)} style={{ width: '100%' }}>
                <ConfirmNavigation
                    blocker={blocker}
                    onSaveDraft={handleSaveDraft}
                    isValidate={formState.isValid}
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
                            onClick={() => setMode('draft')}
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
                            onClick={() => setMode('newRecipe')}
                            type='submit'
                            h='48px'
                            p='0 24px'
                        >
                            Опубликовать рецепт
                        </Button>
                    </Stack>
                </VStack>
            </form>
            {createRecipeIsLoading || (createDraftIsLoading && <AppLoader />)}
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
