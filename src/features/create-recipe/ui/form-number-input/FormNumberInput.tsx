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
} & UseControllerProps<CreateNewRecipeFormData | CreateDraftFormSchema, 'time' | 'portions'>;

export const FormNumberInput: React.FC<NumberInputProps> = (props) => {
    const { label } = props;
    const { field, fieldState } = useController(props);

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
                // defaultValue={undefined}
                color='primaryColor'
            >
                <NumberInputField
                    // value={field.value}
                    // onChange={handleChange}
                    // {...field}
                    // min={1}
                    border={fieldState.invalid ? '1px solid red' : '1px solid rgba(0, 0, 0, 0.08)'}
                />

                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
        </HStack>
    );
};
