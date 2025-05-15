import { Box, Button, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { memo, useState } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

import CrossOutEyeIcon from '~/shared/assets/icons/components/CrossOutEye';
import EyeIcon from '~/shared/assets/icons/components/Eye';

import { ValidationMessages } from '../../model/constants/validationMessages';
import { LoginFormData } from '../../model/schemas/loginFormSchema';
import { SignUpFormData } from '../../model/schemas/signUpFormSchema';

type FormInputProps = {
    label: string;
    fieldName: keyof SignUpFormData;
    register: UseFormRegister<SignUpFormData | LoginFormData>;
    placeholder: string;
    error?: FieldError;
    type?: 'password' | 'default';
    note?: ValidationMessages;
};

export const FormInput = memo<FormInputProps>((props) => {
    const { label, fieldName, register, placeholder, error, type = 'default', note } = props;

    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => setShowPassword(!showPassword);

    return (
        <>
            {type === 'default' ? (
                <Box w='100%'>
                    <Text as='label' fontSize='16px' fontWeight='400'>
                        {label}
                    </Text>
                    <Input
                        placeholder={placeholder}
                        variant='outlineLime'
                        size='m'
                        {...register(fieldName)}
                        borderColor={error ? 'error.100' : 'lime.150'}
                    />
                    {note && (
                        <Text textStyle='xs' color='gray.150'>
                            {note}
                        </Text>
                    )}
                    {error && (
                        <Text textStyle='xs' color='red'>
                            {error.message}
                        </Text>
                    )}
                </Box>
            ) : (
                <Box w='100%'>
                    <Text as='label' fontSize='16px' fontWeight='400'>
                        {label}
                    </Text>
                    <InputGroup size='md'>
                        <Input
                            {...register(fieldName)}
                            variant='outlineLime'
                            size='m'
                            type={showPassword ? 'text' : 'password'}
                            borderColor={error ? 'error.100' : 'lime.150'}
                            placeholder={placeholder}
                        />
                        <InputRightElement w='48px' h='48px'>
                            <Button variant='clear' onClick={handleClick}>
                                {showPassword ? <EyeIcon /> : <CrossOutEyeIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    {note && (
                        <Text textStyle='xs' color='gray.150'>
                            {note}
                        </Text>
                    )}
                    {error && (
                        <Text textStyle='xs' color='red'>
                            {error.message}
                        </Text>
                    )}
                </Box>
            )}
        </>
    );
});
