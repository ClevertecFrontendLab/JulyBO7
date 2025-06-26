import {
    HStack,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
} from '@chakra-ui/react';
import React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

import { CreateDraftFormSchema } from '../../model/schemas/createDraftFormSchema';
import { CreateNewRecipeFormData } from '../../model/schemas/createNewRecipeFormSchema';

type NumberInputProps = {
    label: string;
    invalid: boolean;
    dataTestId?: string;
} & UseControllerProps<CreateNewRecipeFormData | CreateDraftFormSchema, 'time' | 'portions'>;

export const FormNumberInput: React.FC<NumberInputProps> = (props) => {
    const { label, dataTestId, invalid } = props;
    const { field } = useController(props);

    const handleChange = (_, valueAsNumber: number) => {
        field.onChange(valueAsNumber);
    };
    return (
        <HStack justify='flex-start' w='100%' gap={{ base: '16px', lg: '24px' }}>
            <Text textStyle={{ base: 's', lg: 'm' }} fontWeight={600}>
                {label}
            </Text>
            <NumberInput
                w={{ base: '73px', md: '90px' }}
                h='40px'
                onChange={handleChange}
                value={field.value}
                color='primaryColor'
            >
                <NumberInputField
                    data-test-id={dataTestId}
                    // value={field.value}
                    // onChange={handleChange}
                    // {...field}
                    // min={1}
                    borderColor={invalid ? 'rgb(229, 62, 62)' : 'rgba(0, 0, 0, 0.08)'}
                    borderWidth={invalid ? '2px' : '1px'}
                    borderStyle='solid'
                    _focus={{
                        borderWidth: invalid ? '2px' : '1px',
                        borderColor: invalid ? 'rgb(229, 62, 62)' : 'gray.50',
                        // borderBottomColor: fieldState.invalid ? 'rgb(229, 62, 62)' : 'gray.50',
                        // borderTopColor: fieldState.invalid ? 'rgb(229, 62, 62)' : 'gray.50',
                        // borderRightColor: fieldState.invalid ? 'rgb(229, 62, 62)' : 'gray.50',
                        // borderLeftColor: fieldState.invalid ? 'rgb(229, 62, 62)' : 'gray.50',
                        boxShadow: invalid ? 'none' : '0 0 0 1px rgba(0, 0, 0, 0.24)',
                    }}
                    _hover={{
                        borderWidth: invalid ? '2px' : '1px',
                        borderColor: invalid ? 'rgb(229, 62, 62)' : 'gray.50',

                        // borderBottomColor: fieldState.invalid ? 'rgb(229, 62, 62)' : 'gray.50',
                        // borderTopColor: fieldState.invalid ? 'rgb(229, 62, 62)' : 'gray.50',
                        // borderRightColor: fieldState.invalid ? 'rgb(229, 62, 62)' : 'gray.50',
                        // borderLeftColor: fieldState.invalid ? 'rgb(229, 62, 62)' : 'gray.50',
                        boxShadow: invalid ? 'none' : '0 0 0 1px rgba(0, 0, 0, 0.24)',
                    }}
                />

                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
        </HStack>
    );
};
