import { Textarea } from '@chakra-ui/react';
import { FC } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

import { CreateDraftFormSchema } from '../../model/schemas/createDraftFormSchema';
import { CreateNewRecipeFormData } from '../../model/schemas/createNewRecipeFormSchema';

type FormTextareaProps = {
    placeholder: string;
} & UseControllerProps<CreateNewRecipeFormData | CreateDraftFormSchema, 'description'>;

export const FormTextarea: FC<FormTextareaProps> = (props) => {
    const { placeholder, ...rest } = props;
    const { field, fieldState } = useController(rest);
    console.log('textarea: ', typeof field.value);
    if (field.value === '') {
        field.onChange(undefined);
    }
    return (
        <Textarea
            {...field}
            placeholder={placeholder}
            border={fieldState.invalid ? '1px solid red' : '1px solid rgba(0, 0, 0, 0.08)'}
            _placeholder={{ color: 'gray.150', fontSize: '14px' }}
            _focus={{
                borderBottomColor: 'gray.50',
                borderTopColor: 'gray.50',
                borderRightColor: 'gray.50',
                borderLeftColor: 'gray.50',
                boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.24)',
            }}
            fontStyle='s'
        />
    );
};
