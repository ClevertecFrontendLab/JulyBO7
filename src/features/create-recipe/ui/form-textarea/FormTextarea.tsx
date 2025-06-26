import { Textarea } from '@chakra-ui/react';
import { FC } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

import { RECIPE_DESCRIPTION } from '~/shared/constants/tests';

import { CreateDraftFormSchema } from '../../model/schemas/createDraftFormSchema';
import { CreateNewRecipeFormData } from '../../model/schemas/createNewRecipeFormSchema';

type FormTextareaProps = {
    placeholder: string;
    invalid: boolean;
} & UseControllerProps<CreateNewRecipeFormData | CreateDraftFormSchema, 'description'>;

export const FormTextarea: FC<FormTextareaProps> = (props) => {
    const { placeholder, invalid, ...rest } = props;
    const { field } = useController(rest);

    if (field.value === '') {
        field.onChange(undefined);
    }
    return (
        <Textarea
            data-test-id={RECIPE_DESCRIPTION}
            {...field}
            placeholder={placeholder}
            autoFocus={false}
            // borderColor={fieldState.invalid ? 'rgb(229, 62, 62)' : 'rgba(0, 0, 0, 0.08)'}
            borderColor={invalid ? 'rgb(229, 62, 62)' : 'rgba(0, 0, 0, 0.08)'}
            // borderWidth={fieldState.invalid ? '2px' : '1px'}
            borderWidth={invalid ? '2px' : '1px'}
            _placeholder={{ color: 'gray.150', fontSize: '14px' }}
            _focus={{
                borderWidth: invalid ? '2px' : '1px',
                // borderWidth: fieldState.invalid ? '2px' : '1px',
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
            fontStyle='s'
        />
    );
};
