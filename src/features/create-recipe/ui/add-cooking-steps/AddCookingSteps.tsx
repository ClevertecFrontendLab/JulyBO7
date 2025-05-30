import { Button, Text, VStack } from '@chakra-ui/react';
import React, { ChangeEvent, useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

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

    const [stepNumber, setStepNumber] = useState(1);
    const [descriptionValue, setdescriptionValue] = useState<string[]>(['']);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const {
        handleImageAddition,
        handleUploadImage,
        isLoading,
        errorMessage,
        setErrorMessage,
        previewImage,
        imageSrc,
        stepIndexForImageUpload,
        setImageSrc,
    } = useUploadImage({ field, setIsOpenModal });

    const handleDescriptionChange = (idx: number) => (e: ChangeEvent<HTMLTextAreaElement>) => {
        setdescriptionValue(
            descriptionValue.map((value, index) => {
                if (index === idx) {
                    return e.currentTarget.value;
                } else {
                    return value;
                }
            }),
        );
        const newValue = field.value.map((step, index) => {
            if (index === idx) {
                return { ...step, description: e.currentTarget.value };
            }
            return step;
        });

        field.onChange(newValue);
    };

    const handleStepAddition = () => {
        setStepNumber(stepNumber + 1);
        setdescriptionValue([...descriptionValue, '']);

        const newStep = {
            description: undefined,
            image: undefined,
            stepNumber: field.value.length + 1,
        };
        field.onChange([...field.value, newStep]);
        console.log('img в форме: ', field);
    };
    const handleStepDelete = (idx: number) => () => {
        if (field.value.length === 1) {
            const newStep = {
                description: undefined,
                image: undefined,
                stepNumber: 1,
            };
            field.onChange([newStep]);
            setdescriptionValue(['']);
            setStepNumber(1);
            setImageSrc([{ idx: null, image: '' }]);
        } else {
            const newValue = field.value
                .filter((_, index) => index !== idx)
                .map((step, index) => ({ ...step, stepNumber: index + 1 }));
            field.onChange(newValue);
            setStepNumber(stepNumber - 1);
            setdescriptionValue(descriptionValue.filter((_, index) => index !== idx));
            setImageSrc(imageSrc.filter((step) => step.idx !== idx));

            console.log('field: ', field);
        }
    };

    const handleOpenModal = (idx: number) => () => {
        setIsOpenModal(true);
        stepIndexForImageUpload.current = idx;
    };
    const handleCloseModal = () => {
        setIsOpenModal(false);
    };

    return (
        <VStack w={{ base: '100%', md: '604px', lg: '658px', '2xl': '668px' }} gap='16px'>
            <Text textStyle={{ base: 's', lg: 'm' }} fontWeight={600} alignSelf='start'>
                {ADD_COOKING_STEPS}
            </Text>

            {Array.from({ length: stepNumber }).map((_, idx) => {
                const src = imageSrc.find((src) => src.idx === idx)?.image;
                // const src = field.value.find((_, index) => index === idx)?.image;

                return (
                    <CookingStep
                        value={descriptionValue[idx]}
                        step={idx + 1}
                        onChange={handleDescriptionChange(idx)}
                        onDelete={handleStepDelete(idx)}
                        invalid={fieldState.invalid}
                        onImageAddition={handleOpenModal(idx)}
                        imageSrc={src}
                    />
                );
            })}

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
