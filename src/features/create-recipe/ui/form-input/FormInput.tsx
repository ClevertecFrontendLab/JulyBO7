import { Input } from '@chakra-ui/react';
import React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

import { RECIPE_TITLE } from '~/shared/constants/tests';

import { CreateDraftFormSchema } from '../../model/schemas/createDraftFormSchema';
import { CreateNewRecipeFormData } from '../../model/schemas/createNewRecipeFormSchema';

type FormInputProps = {
    placeholder: string;
    // borderColor?: string;
    invalid: boolean;
} & UseControllerProps<CreateNewRecipeFormData | CreateDraftFormSchema, 'title'>;

export const FormInput: React.FC<FormInputProps> = (props) => {
    const { placeholder, invalid, ...rest } = props;
    const { field } = useController(rest);

    return (
        <Input
            data-test-id={RECIPE_TITLE}
            {...field}
            variant='outlineLime'
            color='gray.400'
            h='48px'
            placeholder={placeholder}
            // borderWidth={borderColor || fieldState.invalid ? '2px' : '1px'}
            borderWidth={invalid ? '2px' : '1px'}
            // borderColor={borderColor || fieldState.invalid ? 'rgb(229, 62, 62)' : 'lime.150'}
            borderColor={invalid ? 'rgb(229, 62, 62)' : 'lime.150'}
            _placeholder={{ color: 'gray.150' }}
            _focus={{
                borderWidth: invalid ? '2px' : '1px',
                // borderColor: borderColor || fieldState.invalid ? 'rgb(229, 62, 62)' : 'gray.50',

                borderColor: invalid ? 'rgb(229, 62, 62)' : 'gray.50',

                boxShadow: invalid ? 'none' : '0 0 0 1px rgba(0, 0, 0, 0.24)',
                // borderColor || fieldState.invalid ? 'none' : '0 0 0 1px rgba(0, 0, 0, 0.24)',
            }}
            _hover={{
                borderWidth: invalid ? '2px' : '1px',
                borderColor: invalid ? 'rgb(229, 62, 62)' : 'gray.50',
                // borderColor: borderColor || fieldState.invalid ? 'rgb(229, 62, 62)' : 'gray.50',

                boxShadow:
                    // borderColor || fieldState.invalid ? 'none' : '0 0 0 1px rgba(0, 0, 0, 0.24)',
                    invalid ? 'none' : '0 0 0 1px rgba(0, 0, 0, 0.24)',
            }}
        />
    );
};
