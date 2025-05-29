import { Button, HStack, Input, Select, Text, VStack } from '@chakra-ui/react';
import { ChangeEvent, FC, useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

import { useGetMeasureUnitsQuery } from '~/entities/recipe';
import Basket from '~/shared/assets/icons/components/Basket';
import Plus from '~/shared/assets/icons/components/Plus';
import PlusOutline from '~/shared/assets/icons/components/PlusOuline';

import {
    ADD_RECIPE_INGREDIENTS,
    AMOUNT,
    INGREDIENT,
    MEASUREMENT_UNIT,
} from '../../model/constants/formText';
import { CreateNewRecipeFormData } from '../../model/schemas/createNewRecipeFormSchema';

type AddIngredientProps = UseControllerProps<CreateNewRecipeFormData, 'ingredients'>;

export const AddIngredient: FC<AddIngredientProps> = (props) => {
    const { field, fieldState } = useController(props);
    const { data: measureUnits } = useGetMeasureUnitsQuery();

    const [title, setTitle] = useState<string>('');
    const [count, setCount] = useState<string>('');
    const [measureUnit, setMeasureUnit] = useState<string>('');

    const options = measureUnits?.map((unit) => <option value={unit.name}>{unit.name}</option>);

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setTitle(value);
    };
    const handleCountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setCount(value);
    };
    const handleMeasureUnitChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.currentTarget.value;
        setMeasureUnit(value);
    };
    const handleFieldTitleChange = (idx: number) => (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = field.value.map((ingred, index) => {
            if (index === idx) {
                return { ...ingred, title: e.currentTarget.value };
            }
            return ingred;
        });
        field.onChange(newValue);
    };
    const handleFieldCountChange = (idx: number) => (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = field.value.map((ingred, index) => {
            if (index === idx) {
                return { ...ingred, count: Number(e.currentTarget.value) };
            }
            return ingred;
        });
        field.onChange(newValue);
    };
    const handleFieldMeasureUnitChange = (idx: number) => (e: ChangeEvent<HTMLSelectElement>) => {
        const newValue = field.value.map((ingred, index) => {
            if (index === idx) {
                return { ...ingred, measureUnit: e.currentTarget.value };
            }
            return ingred;
        });
        field.onChange(newValue);
    };

    const handleIngredientAddition = () => {
        field.onChange([...field.value, { title, count: Number(count), measureUnit }]);
        setTitle('');
        setCount('');
        setMeasureUnit('');
    };
    const handleIngredientDelete = (idx: number) => () => {
        const newValue = field.value.filter((_, index) => index !== idx);
        field.onChange(newValue);
    };
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
                    <HStack
                        key={fieldValue.title}
                        gap={{ base: '12px', lg: '16px' }}
                        flexWrap='wrap'
                    >
                        <Input
                            value={fieldValue.title}
                            onChange={handleFieldTitleChange(idx)}
                            autoFocus={true}
                            borderColor={fieldState.invalid ? 'error.100' : 'gray.200'}
                            w={{ base: '100%', md: '241px', lg: '283px', '2xl': '293px' }}
                            h='40px'
                            color='gray.400'
                        />
                        <Input
                            value={fieldValue.count}
                            onChange={handleFieldCountChange(idx)}
                            borderColor={fieldState.invalid ? 'error.100' : 'gray.200'}
                            w='80px'
                            h='40px'
                            color='gray.400'
                        />
                        <Select
                            placeholder='Единица измерения...'
                            value={fieldValue.measureUnit}
                            onChange={handleFieldMeasureUnitChange(idx)}
                            borderColor={fieldState.invalid ? 'error.100' : 'gray.200'}
                            w={{ base: '192px', md: '215px' }}
                            h='40px'
                            color='gray.400'
                        >
                            {options}
                        </Select>
                        <Button
                            onClick={handleIngredientDelete(idx)}
                            variant='clear'
                            minW='32px'
                            h='32px'
                        >
                            <Basket />
                        </Button>
                    </HStack>
                ))}
            <HStack gap={{ base: '12px', lg: '16px' }} flexWrap='wrap'>
                <Input
                    w={{ base: '100%', md: '241px', lg: '283px', '2xl': '293px' }}
                    h='40px'
                    placeholder='Ингредиент'
                    value={title}
                    onChange={handleTitleChange}
                    borderColor={
                        fieldState.invalid && field.value.length === 0 ? 'error.100' : 'gray.200'
                    }
                    color='gray.400'
                />
                <Input
                    placeholder='100'
                    value={count}
                    onChange={handleCountChange}
                    borderColor={
                        fieldState.invalid && field.value.length === 0 ? 'error.100' : 'gray.200'
                    }
                    w='80px'
                    h='40px'
                    color='gray.400'
                />
                <Select
                    placeholder='Единица измерения...'
                    _placeholder={{ color: 'gray.150' }}
                    value={measureUnit}
                    onChange={handleMeasureUnitChange}
                    borderColor={
                        fieldState.invalid && field.value.length === 0 ? 'error.100' : 'gray.200'
                    }
                    w={{ base: '192px', md: '215px' }}
                    h='40px'
                    color='gray.400'
                >
                    {options}
                </Select>
                <Button
                    onClick={handleIngredientAddition}
                    borderRadius='50px'
                    p='0px 9px'
                    minW='32px'
                    h='32px'
                >
                    <Plus />
                </Button>
            </HStack>
        </VStack>
    );
};
