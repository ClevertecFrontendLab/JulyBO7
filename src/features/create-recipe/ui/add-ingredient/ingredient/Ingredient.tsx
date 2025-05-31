import { Button, HStack, Input, Select } from '@chakra-ui/react';
import React, { ChangeEvent, JSX } from 'react';

import Basket from '~/shared/assets/icons/components/Basket';
import Plus from '~/shared/assets/icons/components/Plus';

type IngredientProps = {
    countValue: number;
    title: string;
    measureUnit: string;
    onChangeTitle: (e: ChangeEvent<HTMLInputElement>) => void;
    onChangeCount: (e: ChangeEvent<HTMLInputElement>) => void;
    onChangeMeasureUnit: (e: ChangeEvent<HTMLSelectElement>) => void;
    invalid: boolean;
    onDelete?: () => void;
    onAdd?: () => void;
    options?: JSX.Element[];
    borderColor?: string;
    placeholder?: string;
};

export const Ingredient: React.FC<IngredientProps> = (props) => {
    const {
        countValue,
        title,
        onChangeTitle,
        invalid,
        onChangeCount,
        measureUnit,
        onChangeMeasureUnit,
        options,
        onDelete,
        placeholder,
        borderColor,
        onAdd,
    } = props;
    return (
        <HStack gap={{ base: '12px', lg: '16px' }} flexWrap='wrap'>
            <Input
                value={title}
                onChange={onChangeTitle}
                autoFocus={true}
                borderColor={borderColor || invalid ? 'error.100' : 'gray.200'}
                w={{ base: '100%', md: '241px', lg: '283px', '2xl': '293px' }}
                h='40px'
                color='gray.400'
                placeholder={placeholder}
            />
            <Input
                value={countValue}
                onChange={onChangeCount}
                borderColor={borderColor || invalid ? 'error.100' : 'gray.200'}
                w='80px'
                h='40px'
                color='gray.400'
            />
            <Select
                placeholder='Единица измерения...'
                value={measureUnit}
                onChange={onChangeMeasureUnit}
                borderColor={borderColor || invalid ? 'error.100' : 'gray.200'}
                w={{ base: '192px', md: '215px' }}
                h='40px'
                color='gray.400'
            >
                {options}
            </Select>
            {onDelete && (
                <Button onClick={onDelete} variant='clear' minW='32px' h='32px'>
                    <Basket fill='lime.600' />
                </Button>
            )}
            {onAdd && (
                <Button onClick={onAdd} borderRadius='50px' p='0px 9px' minW='32px' h='32px'>
                    <Plus />
                </Button>
            )}
        </HStack>
    );
};
