import { Button, Text, VStack } from '@chakra-ui/react';
import React, { ChangeEvent, useRef, useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

import { Step } from '~/entities/recipe';
import Plus from '~/shared/assets/icons/components/SmallPlus';
import { Alert } from '~/shared/components/alert';
import { AppLoader } from '~/shared/components/loader';

import { ADD_COOKING_STEPS } from '../../model/constants/formText';
import { useUploadImage } from '../../model/hooks/useUploadImage';
import { CreateDraftFormSchema } from '../../model/schemas/createDraftFormSchema';
import { CreateNewRecipeFormData } from '../../model/schemas/createNewRecipeFormSchema';
import { UploadImageModal } from '../upload-image-modal/UploadImageModal';
import { CookingStep } from './cooking-step/CookingStep';

type AddCookingStepsProps = UseControllerProps<
    CreateNewRecipeFormData | CreateDraftFormSchema,
    'steps'
>;

export const AddCookingSteps: React.FC<AddCookingStepsProps> = (props) => {
    const { field, fieldState } = useController(props);

    const [stepNumber, setStepNumber] = useState(
        !field.value || field.value.length === 0 ? 1 : field.value.length,
    );
    const [descriptionValue, setDescriptionValue] = useState('');
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [image, setImage] = useState<string>();

    const stepIndexForImageUpload = useRef<number>(null);

    const {
        handleImageAddition,
        handleUploadImage,
        isLoading,
        errorMessage,
        setErrorMessage,
        previewImage,
    } = useUploadImage({ field, setIsOpenModal, stepIndexForImageUpload, setImage });

    const handleDescriptionChange = (idx: number) => (e: ChangeEvent<HTMLTextAreaElement>) => {
        const description = e.currentTarget.value;
        const newValue = field.value?.map((step, index) => {
            if (index === idx) {
                return { ...step, description };
            }
            return step;
        });

        field.onChange(newValue);
    };

    const handleStepAddition = () => {
        setStepNumber((prev) =>
            !field.value || prev - field.value?.length === 1 ? prev : prev + 1,
        );
    };

    const handleStepDelete = (idx: number) => () => {
        const newValue = field.value
            ?.filter((_, index) => index !== idx)
            .map((step, index) => ({ ...step, stepNumber: index + 1 }));

        field.onChange(newValue);
        setStepNumber((prev) => (prev === 1 ? prev : prev - 1));
    };

    const handleOpenModal = (idx?: number) => () => {
        setIsOpenModal(true);
        if (idx !== undefined) {
            stepIndexForImageUpload.current = idx;
        }
    };

    const handleCloseModal = () => {
        setIsOpenModal(false);
    };
    console.log('FIELD VALUE: ', field);

    const handleStepToFormAddition = () => {
        if (descriptionValue.trim()) {
            const newStep: Omit<Step, 'image'> & { image?: string } = {
                description: descriptionValue.trim(),
                stepNumber: stepNumber,
                image: image === '' ? undefined : image,
            };
            let newFieldValue;

            if (!field.value) {
                newFieldValue = [newStep];
            } else {
                newFieldValue = [...field.value, newStep];
            }
            field.onChange(newFieldValue);
            setDescriptionValue('');
            setImage('');
        }
    };

    return (
        <VStack w={{ base: '100%', md: '604px', lg: '658px', '2xl': '668px' }} gap='16px'>
            <Text textStyle={{ base: 's', lg: 'm' }} fontWeight={600} alignSelf='start'>
                {ADD_COOKING_STEPS}
            </Text>

            {Array.isArray(field.value) &&
                field.value.length > 0 &&
                field.value.map((step, idx) => (
                    <CookingStep
                        value={step.description}
                        step={step.stepNumber}
                        imageSrc={step.image}
                        onChange={handleDescriptionChange(idx)}
                        onDelete={handleStepDelete(idx)}
                        invalid={fieldState.invalid}
                        onImageAddition={handleOpenModal(idx)}
                    />
                ))}

            {(!field.value || field.value.length === 0 || stepNumber !== field.value.length) && (
                <CookingStep
                    value={descriptionValue}
                    step={stepNumber}
                    onChange={(e) => setDescriptionValue(e.currentTarget.value)}
                    invalid={fieldState.invalid}
                    onBlurText={handleStepToFormAddition}
                    imageSrc={image}
                    onImageAddition={handleOpenModal()}
                />
            )}

            <Button
                onClick={handleStepAddition}
                variant='outline'
                h='32px'
                w='123px'
                p='0 12px'
                alignSelf='flex-end'
                borderColor='gray.100'
            >
                <Text fontSize='14px' fontWeight={600} pr='8px'>
                    Новый шаг
                </Text>
                <Plus />
            </Button>
            <UploadImageModal
                isOpen={isOpenModal}
                onClose={handleCloseModal}
                previewImage={previewImage}
                onImageAddition={handleImageAddition}
                onImageSave={handleUploadImage}
            />
            {isLoading && <AppLoader />}
            {errorMessage && (
                <Alert
                    onClose={() => setErrorMessage(null)}
                    title={errorMessage.title}
                    text={errorMessage.text}
                    type='error'
                />
            )}
        </VStack>
    );
};
