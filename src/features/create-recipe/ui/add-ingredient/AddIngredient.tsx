import { Button, HStack, Text, VStack } from '@chakra-ui/react';
import { ChangeEvent, FC, useEffect } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

import Plus from '~/shared/assets/icons/components/Plus';
import PlusOutline from '~/shared/assets/icons/components/PlusOuline';
import {
    RECIPE_INGREDIENTS_ADD_INGREDIENTS,
    RECIPE_INGREDIENTS_COUNT,
    RECIPE_INGREDIENTS_MEASURE_UNIT,
    RECIPE_INGREDIENTS_REMOVE_INGREDIENTS,
    RECIPE_INGREDIENTS_TITLE,
} from '~/shared/constants/tests';

import {
    ADD_RECIPE_INGREDIENTS,
    AMOUNT,
    INGREDIENT,
    MEASUREMENT_UNIT,
} from '../../model/constants/formText';
import { CreateDraftFormSchema } from '../../model/schemas/createDraftFormSchema';
import { CreateNewRecipeFormData } from '../../model/schemas/createNewRecipeFormSchema';
import { Ingredient } from './ingredient/Ingredient';

type AddIngredientProps = UseControllerProps<
    CreateNewRecipeFormData | CreateDraftFormSchema,
    'ingredients'
> & { invalid: boolean };

export const AddIngredient: FC<AddIngredientProps> = ({ invalid, ...props }) => {
    const { field } = useController(props);

    const handleFieldTitleChange = (idx: number) => (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = field.value?.map((ingred, index) => {
            if (index === idx) {
                return { ...ingred, title: e.currentTarget.value };
            }
            return ingred;
        });
        field.onChange(newValue);
    };
    const handleFieldCountChange = (idx: number) => (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = field.value?.map((ingred, index) => {
            if (index === idx) {
                const count = Number.isNaN(Number(e.currentTarget.value))
                    ? 0
                    : Number(e.currentTarget.value);
                return { ...ingred, count };
            }
            return ingred;
        });
        field.onChange(newValue);
    };
    const handleFieldMeasureUnitChange = (idx: number) => (e: ChangeEvent<HTMLSelectElement>) => {
        const newValue = field.value?.map((ingred, index) => {
            if (index === idx) {
                return { ...ingred, measureUnit: e.target.value };
            }
            return ingred;
        });
        field.onChange(newValue);
    };

    const handleIngredientAddition = () => {
        if (field.value) {
            field.onChange([
                ...field.value,
                { title: undefined, count: undefined, measureUnit: undefined },
            ]);
        }
    };
    const handleIngredientDelete = (idx: number) => () => {
        const newValue = field.value?.filter((_, index) => index !== idx);
        field.onChange(newValue);
    };

    useEffect(() => {
        if (!field.value || field.value.length === 0) {
            const newStep = {
                title: undefined,
                count: undefined,
                measureUnit: undefined,
            };
            field.onChange([newStep]);
        }
    }, []);

    return (
        <VStack
            w={{ base: '100%', md: '604px', lg: '658px', '2xl': '668px' }}
            gap={{ base: '12px', md: '16px' }}
        >
            <Text textStyle={{ base: 's', lg: 'm' }} fontWeight={600} alignSelf='start'>
                {ADD_RECIPE_INGREDIENTS} <PlusOutline />
            </Text>
            <HStack justifyContent='space-around' w='100%' display={{ base: 'none', md: 'flex' }}>
                <Text textStyle='xs' fontWeight={700} color='lime.600'>
                    {INGREDIENT}
                </Text>
                <Text textStyle='xs' fontWeight={700} color='lime.600'>
                    {AMOUNT}
                </Text>
                <Text textStyle='xs' fontWeight={700} color='lime.600'>
                    {MEASUREMENT_UNIT}
                </Text>
            </HStack>
            {Array.isArray(field.value) &&
                field.value.map((fieldValue, idx) => (
                    <HStack gap={{ base: '12px', lg: '16px' }}>
                        <Ingredient
                            countDataTestId={`${RECIPE_INGREDIENTS_COUNT}-${idx}`}
                            titleDataTestId={`${RECIPE_INGREDIENTS_TITLE}-${idx}`}
                            measureUnitDataTestId={`${RECIPE_INGREDIENTS_MEASURE_UNIT}-${idx}`}
                            deleteBtnDataTestId={`${RECIPE_INGREDIENTS_REMOVE_INGREDIENTS}-${idx}`}
                            countValue={fieldValue.count}
                            title={fieldValue.title}
                            measureUnit={fieldValue.measureUnit}
                            onChangeTitle={handleFieldTitleChange(idx)}
                            onChangeCount={handleFieldCountChange(idx)}
                            onChangeMeasureUnit={handleFieldMeasureUnitChange(idx)}
                            invalid={invalid}
                            placeholder='Ингредиент'
                            onDelete={
                                field.value && idx === field.value?.length - 1
                                    ? undefined
                                    : handleIngredientDelete(idx)
                            }
                        />
                        {field.value && idx === field.value.length - 1 ? (
                            <Button
                                data-test-id={RECIPE_INGREDIENTS_ADD_INGREDIENTS}
                                onClick={handleIngredientAddition}
                                borderRadius='50px'
                                p='0px 9px'
                                minW='32px'
                                h='32px'
                            >
                                <Plus />
                            </Button>
                        ) : null}
                    </HStack>
                ))}
        </VStack>
    );
};
