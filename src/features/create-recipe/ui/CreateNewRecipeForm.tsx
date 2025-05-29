import { Box, Button, Stack, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useGetCategoriesQuery } from '~/entities/category';
import Pen from '~/shared/assets/icons/components/Pen';

import {
    BRIEF_DESCRIPTION_OF_THE_RECIPE,
    HOW_LONG_DOES_IT_TAKE_TO_COOK_IN_MINUTES,
    HOW_MANY_PEOPLE_YOUR_RECIPE,
    RECIPE_TITLE,
} from '../model/constants/formText';
import {
    CreateNewRecipeFormData,
    createNewRecipeFormSchema,
} from '../model/schemas/createNewRecipeFormSchema';
import { AddCookingSteps } from './add-cooking-steps/AddCookingSteps';
import { AddIngredient } from './add-ingredient/AddIngredient';
import { FormImage } from './form-image/FormImage';
import { FormInput } from './form-input/FormInput';
import { FormNumberInput } from './form-number-input/FormNumberInput';
import { FormSelect } from './form-select/FormSelect';
import { FormTextarea } from './form-textarea/FormTextarea';

export const CreateNewRecipeForm: FC = () => {
    const { data: categories } = useGetCategoriesQuery();
    const subcategoriesOptions = categories?.filter((category) => category.rootCategoryId);

    const { handleSubmit, control, formState } = useForm<CreateNewRecipeFormData>({
        defaultValues: {
            categoriesIds: [],
            title: '',
            description: '',
            time: undefined,
            portions: undefined,
            image: '',
            steps: [{ description: '', stepNumber: 1, image: '' }],
            ingredients: [],
        },
        mode: 'onSubmit',
        resolver: zodResolver(createNewRecipeFormSchema),
    });

    const onSubmit: SubmitHandler<CreateNewRecipeFormData> = (data) => {
        console.log('onsubmit:', data);
    };

    return (
        <Box pr={{ base: 0, '2xl': '115px' }}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                <VStack align='center' w='100%' h='100%' spacing={{ base: '32px', lg: '40px' }}>
                    <Stack
                        flexDirection={{ base: 'column', md: 'row' }}
                        gap={{ base: '16px', lg: '24px' }}
                        w='100%'
                    >
                        <FormImage name='image' control={control} />

                        <VStack gap={{ base: '16px', lg: '24px' }}>
                            <FormSelect
                                options={subcategoriesOptions}
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
                            onClick={() => console.log('formState : ', formState.isValid)}
                            type='submit'
                            h='48px'
                            p='0 24px'
                            variant='outline'
                            border='1px solid rgba(0, 0, 0, 0.48)'
                            leftIcon={<Pen />}
                        >
                            Сохранить черновик
                        </Button>
                        <Button
                            onClick={() => console.log('formState : ', formState.isValid)}
                            type='submit'
                            h='48px'
                            p='0 24px'
                        >
                            Опубликовать рецепт
                        </Button>
                    </Stack>
                </VStack>
            </form>
        </Box>
    );
};
