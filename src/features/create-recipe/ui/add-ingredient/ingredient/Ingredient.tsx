import { Button, HStack, Input, Select } from '@chakra-ui/react';
import React, { ChangeEvent, JSX } from 'react';

import { useGetMeasureUnitsQuery } from '~/entities/recipe';
import Basket from '~/shared/assets/icons/components/Basket';

type IngredientProps = {
    countValue?: number;
    title?: string;
    measureUnit?: string;
    onChangeTitle: (e: ChangeEvent<HTMLInputElement>) => void;
    onChangeCount: (e: ChangeEvent<HTMLInputElement>) => void;
    onChangeMeasureUnit: (e: ChangeEvent<HTMLSelectElement>) => void;
    invalid: boolean;
    onDelete?: () => void;
    onAdd?: () => void;
    options?: JSX.Element[];
    placeholder?: string;
    titleDataTestId?: string;
    countDataTestId?: string;
    measureUnitDataTestId?: string;
    deleteBtnDataTestId?: string;
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
        onDelete,
        placeholder,

        titleDataTestId,
        countDataTestId,
        measureUnitDataTestId,
        deleteBtnDataTestId,
    } = props;

    const { data: measureUnits } = useGetMeasureUnitsQuery();

    return (
        <HStack gap={{ base: '12px', lg: '16px' }} flexWrap='wrap'>
            <Input
                data-test-id={titleDataTestId}
                value={title ?? ''}
                onChange={onChangeTitle}
                borderColor={invalid ? 'rgb(229, 62, 62)' : 'gray.200'}
                w={{ base: '100%', md: '241px', lg: '283px', '2xl': '293px' }}
                h='40px'
                color='gray.400'
                placeholder={placeholder}
                borderWidth={invalid ? '2px' : '1px'}
                _hover={{
                    borderColor: invalid ? 'rgb(229, 62, 62)' : 'gray.200',
                }}
                _focus={{
                    borderColor: invalid ? 'rgb(229, 62, 62)' : 'gray.200',
                }}
            />
            <Input
                data-test-id={countDataTestId}
                value={countValue ?? ''}
                onChange={onChangeCount}
                placeholder='100'
                borderColor={invalid ? 'rgb(229, 62, 62)' : 'gray.200'}
                w='80px'
                h='40px'
                color='gray.400'
                borderWidth={invalid ? '2px' : '1px'}
                _hover={{
                    borderColor: invalid ? 'rgb(229, 62, 62)' : 'gray.200',
                }}
                _focus={{
                    borderColor: invalid ? 'rgb(229, 62, 62)' : 'gray.200',
                }}
            />
            {measureUnits && (
                <Select
                    data-test-id={measureUnitDataTestId}
                    value={measureUnit}
                    defaultValue='Единица измерения'
                    onChange={onChangeMeasureUnit}
                    borderWidth={invalid ? '2px' : '1px'}
                    borderColor={invalid ? 'rgb(229, 62, 62)' : 'gray.200'}
                    w={{ base: '192px', md: '215px' }}
                    h='40px'
                    color='gray.400'
                    _hover={{
                        borderColor: invalid ? 'error.100' : 'gray.200',
                    }}
                    _focus={{
                        borderColor: invalid ? 'error.100' : 'gray.200',
                    }}
                >
                    <option value='Единица измерения' disabled hidden>
                        Единица измерения...
                    </option>
                    {measureUnits?.map((unit) => (
                        <option key={unit._id} value={unit.name}>
                            {unit.name}
                        </option>
                    ))}
                </Select>
            )}

            {onDelete && (
                <Button
                    data-test-id={deleteBtnDataTestId}
                    onClick={onDelete}
                    variant='clear'
                    minW='32px'
                    h='32px'
                >
                    <Basket fill='lime.600' />
                </Button>
            )}
        </HStack>
    );
};
