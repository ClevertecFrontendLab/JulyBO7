import { Input } from '@chakra-ui/react';
import React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

import { CreateNewRecipeFormData } from '../../model/schemas/createNewRecipeFormSchema';

type FormInputProps = {
    placeholder: string;
} & UseControllerProps<CreateNewRecipeFormData, 'title'>;

export const FormInput: React.FC<FormInputProps> = (props) => {
    const { placeholder, ...rest } = props;
    const { field, fieldState } = useController(rest);

    return (
        <Input
            {...field}
            autoFocus={false}
            variant='outlineLime'
            color='gray.400'
            h='48px'
            placeholder={placeholder}
            borderColor={fieldState.invalid ? 'error.100' : 'lime.150'}
            _placeholder={{ color: 'gray.150' }}
            _focus={{
                borderBottomColor: 'gray.50',
                borderTopColor: 'gray.50',
                borderRightColor: 'gray.50',
                borderLeftColor: 'gray.50',
                boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.24)',
            }}
        />
    );
};
