import {
    Box,
    Button,
    Input,
    InputGroup,
    InputProps,
    InputRightElement,
    Text,
} from '@chakra-ui/react';
import { memo, useState } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

import CrossOutEyeIcon from '~/shared/assets/icons/components/CrossOutEye';
import EyeIcon from '~/shared/assets/icons/components/Eye';
import { PASSWORD_VISIBILITY_BUTTON } from '~/shared/constants/tests';

import { ValidationMessages } from '../../model/constants/validationMessages';
import { AccountRecoveryFormData } from '../../model/schemas/accountRecoveryFormSchema';
import { ForgotPasswordFormData } from '../../model/schemas/forgotPasswordFormSchema';
import { LoginFormData } from '../../model/schemas/loginFormSchema';
import { SignUpFormData } from '../../model/schemas/signUpFormSchema';

type Register = UseFormRegister<
    SignUpFormData | LoginFormData | AccountRecoveryFormData | ForgotPasswordFormData
>;
type FormInputProps = {
    label: string;
    fieldName: keyof SignUpFormData | keyof AccountRecoveryFormData;
    register: Register;
    error?: FieldError;
    type?: 'password' | 'default';
    note?: ValidationMessages;
    isErrorBorderColor?: boolean;
    dataTestId?: string;
    passwordDataTestId?: string;
} & InputProps;

export const FormInput = memo<FormInputProps>((props) => {
    const {
        label,
        fieldName,
        register,
        error,
        type = 'default',
        note,
        isErrorBorderColor,
        dataTestId,
        passwordDataTestId,
        ...rest
    } = props;

    const [showPassword, setShowPassword] = useState(false);

    const handleMouseDown = () => {
        setShowPassword(true);
    };
    const handleMouseUp = () => {
        setShowPassword(false);
    };

    return (
        <>
            {type === 'default' ? (
                <Box w='100%'>
                    <Text as='label' fontSize='16px' fontWeight='400'>
                        {label}
                    </Text>
                    <Input
                        data-test-id={dataTestId}
                        variant='outlineLime'
                        size='m'
                        {...register(fieldName)}
                        borderColor={error || isErrorBorderColor ? 'error.100' : 'lime.150'}
                        borderWidth={error || isErrorBorderColor ? '2px' : '1px'}
                        {...rest}
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
                            data-test-id={passwordDataTestId}
                            {...register(fieldName)}
                            variant='outlineLime'
                            size='m'
                            type={showPassword ? 'text' : 'password'}
                            borderColor={error ? 'error.100' : 'lime.150'}
                            pr='48px'
                            {...rest}
                        />
                        <InputRightElement w='48px' h='48px'>
                            <Button
                                data-test-id={PASSWORD_VISIBILITY_BUTTON}
                                variant='clear'
                                onMouseDown={handleMouseDown}
                                onMouseUp={handleMouseUp}
                            >
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
