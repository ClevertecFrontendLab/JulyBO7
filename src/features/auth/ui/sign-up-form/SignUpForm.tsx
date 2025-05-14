import { Button, Progress, Text, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';

import { useAppDispatch } from '~/app/store/hooks';
import { AppLoader } from '~/shared/components/loader';

import { STEP_1, STEP_2 } from '../../model/constants/signUpFormText';
import { ValidationMessages } from '../../model/constants/validationMessages';
import { SignUpFormData, signUpSchema } from '../../model/schemas/signUpSchema';
import { useRegistrationMutation } from '../../model/services/authApi';
import { FormFields } from '../../model/types/signUp';
import { FormInput } from '../form-input/FormInput';
import { FormModal } from '../form-modal/FormModal';
import cls from './SignUpForm.module.scss';

// export type Inputs = FormFields & { confirmPassword: string };

export const SignUpForm: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const defaultValues: SignUpFormData = {
        firstName: '',
        lastName: '',
        email: '',
        login: '',
        password: '',
        confirmPassword: '',
    };
    const {
        register,
        handleSubmit,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        formState: { errors, dirtyFields },
        getFieldState,
        getValues,
    } = useForm<SignUpFormData>({
        defaultValues,
        mode: 'all',
        resolver: zodResolver(signUpSchema),
    });
    const [trigger, { isLoading }] = useRegistrationMutation();
    const [progressValue, setProgressValue] = useState<string[]>([]);
    const [step, setStep] = useState(1);
    const [isOpenModal, setIsOpenModal] = useState(false);

    // if (!location.state.isVerified && !isOpenModal) {
    //     setIsOpenModal(true);
    // }

    const onSubmit = async (formData: SignUpFormData) => {
        console.log('FORM DATA: ', formData);
        const body: FormFields = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            login: formData.login,
            password: formData.password,
        };
        try {
            const res = await trigger(body).unwrap();
            setIsOpenModal(true);

            console.log('УСПЕШНЫЙ ОТВЕТ ОТ СЕРВЕРА: ', res);
        } catch (error) {
            dispatch(error.message);

            console.log('ОШИБКА ПРИ ЗАПРОСЕ НА СЕРВЕР: ', error);
        }
    };

    for (const fieldName in defaultValues) {
        const fieldState = getFieldState(fieldName as keyof SignUpFormData);
        if (
            !fieldState.invalid &&
            // fieldState.isTouched &&
            !fieldState.isValidating &&
            fieldState.isDirty &&
            !progressValue.find((value) => value === fieldName)
        ) {
            setProgressValue([...progressValue, fieldName]);
        } else if (fieldState.invalid && progressValue.find((value) => value === fieldName)) {
            setProgressValue(progressValue.filter((value) => value !== fieldName));
        }
    }

    const handleNextStep = () => {
        setStep((prev) => prev + 1);
    };
    const handleCloseModal = () => {
        setIsOpenModal(false);
    };

    useEffect(() => {
        if (location.state && location.state.isVerified === false) {
            setIsOpenModal(true);
        }
    }, [location.state]);

    return (
        <>
            {isLoading && <AppLoader />}
            <FormModal
                isOpen={isOpenModal}
                onClose={handleCloseModal}
                email={getValues().email}
                type={
                    location.state && location.state.isVerified === false
                        ? 'verificationError'
                        : 'beforeVerification'
                }
            />
            <Text as='label' fontSize='16px' fontWeight='400'>
                {step == 1 ? STEP_1 : STEP_2}
            </Text>
            <Progress
                hasStripe
                max={6}
                value={progressValue.length}
                isAnimated
                bg='gray.300'
                h='8px'
                mb='24px'
                className={cls.progress}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack display={step === 1 ? 'flex' : 'none'} gap='24px'>
                    <FormInput
                        label='Ваше имя'
                        fieldName='firstName'
                        register={register}
                        placeholder='Имя'
                        error={errors.firstName}
                    />
                    <FormInput
                        label='Ваша фамилия'
                        fieldName='lastName'
                        register={register}
                        placeholder='Фамилия'
                        error={errors.lastName}
                    />
                    <FormInput
                        label='Ваш e-mail'
                        fieldName='email'
                        register={register}
                        placeholder='e-mail'
                        error={errors.email}
                    />
                </VStack>

                <VStack display={step === 1 ? 'none' : 'flex'} gap='24px' w='100%'>
                    <FormInput
                        label='Логин для входа на сайт'
                        fieldName='login'
                        register={register}
                        placeholder='Логин'
                        error={errors.login}
                        note={ValidationMessages.LOGIN_MIN_LENGTH_ONLY_LATIN}
                    />
                    <FormInput
                        label='Пароль'
                        fieldName='password'
                        register={register}
                        placeholder='Пароль'
                        error={errors.password}
                        type='password'
                        note={ValidationMessages.PASSWORD_MIN_LENGTH_NUMBER_CAPITAL_LETTER}
                    />
                    <FormInput
                        label='Повторите пароль'
                        fieldName='confirmPassword'
                        register={register}
                        placeholder='Пароль'
                        error={errors.confirmPassword}
                        type='password'
                    />
                    <Button type='submit' w='100%' mt='24px'>
                        Зарегистрироваться
                    </Button>
                </VStack>
            </form>
            <Button
                w='100%'
                onClick={handleNextStep}
                display={step === 1 ? 'block' : 'none'}
                mt='48px'
            >
                Дальше
            </Button>
        </>
    );
};

// {
//     /* <Text as='label' fontSize='16px' fontWeight='400'>
//                     Ваш e-mail
//                 </Text>
//                 <Input
//                     placeholder='e-mail'
//                     variant='outlineLime'
//                     size='m'
//                     {...register('email')}
//                     borderColor={errors.email ? 'error.100' : 'lime.150'}
//                 />
//                 {errors.email && (
//                     <Text textStyle='xs' color='red'>
//                         {errors.email.message}
//                     </Text>
//                 )} */
// }
// {
//     /* <Text as='label' fontSize='16px' fontWeight='400'>
//                     Ваше имя
//                 </Text>
//                 <Input
//                     placeholder='Имя'
//                     variant='outlineLime'
//                     size='m'
//                     {...register('firstName')}
//                     borderColor={errors.firstName ? 'error.100' : 'lime.150'}
//                 />
//                 {errors.firstName && (
//                     <Text textStyle='xs' color='red'>
//                         {errors.firstName.message}
//                     </Text>
//                 )} */
// }
// {
//     /*
//                 <Text as='label' fontSize='16px' fontWeight='400'>
//                     Ваша фамилия
//                 </Text>
//                 <Input
//                     placeholder='Фамилия'
//                     variant='outlineLime'
//                     size='m'
//                     {...register('surname')}
//                     borderColor={errors.surname ? 'error.100' : 'lime.150'}
//                 />
//                 {errors.surname && (
//                     <Text textStyle='xs' color='red'>
//                         {errors.surname.message}
//                     </Text>
//                 )} */
// }

// {
//     /* <Text as='label' fontSize='16px' fontWeight='400'>
//                         Логин для входа на сайт
//                     </Text>
//                     <Input
//                         placeholder='Логин'
//                         variant='outlineLime'
//                         size='m'
//                         {...register('login')}
//                         borderColor={errors.login ? 'error.100' : 'lime.150'}
//                     />
//                     <Text textStyle='xs' color='gray.150'>
//                         {ValidationMessages.LOGIN_MIN_LENGTH_ONLY_LATIN}
//                     </Text>
//                     {errors.login && (
//                         <Text textStyle='xs' color='red'>
//                             {errors.login.message}
//                         </Text>
//                     )} */
// }
// {
//     /* <Text as='label'>Пароль</Text>
//                     <InputGroup size='md'>
//                         <Input
//                             {...register('password')}
//                             variant='outlineLime'
//                             size='m'
//                             type={showPassword ? 'text' : 'password'}
//                             borderColor={errors.password ? 'error.100' : 'lime.150'}
//                             placeholder='Пароль'
//                         />
//                         <InputRightElement w='48px' h='48px'>
//                             <Button variant='clear' onClick={handleClick}>
//                                 {showPassword ? <EyeIcon /> : <CrossOutEyeIcon />}
//                             </Button>
//                         </InputRightElement>
//                     </InputGroup>
//                     <Text textStyle='xs' color='gray.150'>
//                         {ValidationMessages.PASSWORD_MIN_LENGTH_NUMBER_CAPITAL_LETTER}
//                     </Text>
//                     {errors.password && (
//                         <Text textStyle='xs' color='red'>
//                             {errors.password.message}
//                         </Text>
//                     )} */

//                              /* <Text as='label' fontSize='16px' fontWeight='400'>
//                         Повторите пароль
//                     </Text>
//                     <Input
//                         placeholder='Пароль'
//                         variant='outlineLime'
//                         size='m'
//                         {...register('confirmPassword')}
//                         borderColor={errors.confirmPassword ? 'error.100' : 'lime.150'}
//                     />
//                     {errors.confirmPassword && (
//                         <Text textStyle='xs' color='red'>
//                             {errors.confirmPassword.message}
//                         </Text>
//                     )}
