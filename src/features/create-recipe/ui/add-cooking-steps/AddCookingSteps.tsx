import { Button, Text, VStack } from '@chakra-ui/react';
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

import { Step } from '~/entities/recipe';
import Plus from '~/shared/assets/icons/components/SmallPlus';
import { Alert } from '~/shared/components/alert';
import { IMAGE_API } from '~/shared/constants/imageApi';
import {
    INPUT_FILE,
    PREVIEW_IMAGE,
    RECIPE_STEPS_DESCRIPTION,
    RECIPE_STEPS_IMAGE_BLOCK,
    RECIPE_STEPS_REMOVE_BUTTON,
} from '~/shared/constants/tests';

import { ADD_COOKING_STEPS } from '../../model/constants/formText';
import { CreateDraftFormSchema } from '../../model/schemas/createDraftFormSchema';
import { CreateNewRecipeFormData } from '../../model/schemas/createNewRecipeFormSchema';
import { UploadImageModal } from '../upload-image-modal/UploadImageModal';
import { CookingStep } from './cooking-step/CookingStep';

type AddCookingStepsProps = UseControllerProps<
    CreateNewRecipeFormData | CreateDraftFormSchema,
    'steps'
> & { invalid: boolean };

export const AddCookingSteps: React.FC<AddCookingStepsProps> = ({ invalid, ...props }) => {
    const { field } = useController(props);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState<null | { title: string; text: string }>();
    const [stepIndexForUploadImage, setStepIndexForUploadImage] = useState<number>();

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
        if (field.value) {
            const newStep: Omit<Step, 'image'> & { image?: string } = {
                description: '',
                stepNumber: field.value.length + 1,
                image: undefined,
            };
            field.onChange([...field.value, newStep]);
        }
    };
    const handleStepDelete = (idx: number) => () => {
        let newValue;
        if (field.value?.length === 1) {
            const newStep: Omit<Step, 'image'> & { image?: string } = {
                description: '',
                stepNumber: 1,
                image: undefined,
            };
            newValue = [newStep];
        } else {
            newValue = field.value
                ?.filter((_, index) => index !== idx)
                .map((step, index) => ({ ...step, stepNumber: index + 1 }));
        }
        field.onChange(newValue);
    };

    const handleImageDelete = () => {
        if (field.value) {
            const newValue = field.value.map((step, index) => {
                if (index === stepIndexForUploadImage) {
                    return { ...step, image: undefined };
                } else {
                    return step;
                }
            });
            field.onChange(newValue);
        }
    };

    const handleImageSave = (url: string) => {
        if (field.value) {
            const newValue = field.value.map((step, index) => {
                if (index === stepIndexForUploadImage) {
                    return { ...step, image: url };
                } else {
                    return step;
                }
            });
            field.onChange(newValue);
        }
    };

    const handleImage = (idx: number) => () => {
        setIsOpenModal(true);
        setStepIndexForUploadImage(idx);
    };
    const handleCloseModal = () => {
        setIsOpenModal(false);
        setStepIndexForUploadImage(undefined);
    };

    const imageForPreview = useMemo(() => {
        const step = field.value.find((_, index) => index === stepIndexForUploadImage)?.image;
        return step ? `${IMAGE_API}${step}` : undefined;
    }, [stepIndexForUploadImage, field.value]);

    useEffect(() => {
        if (!field.value || field.value.length === 0) {
            const newStep: Partial<Step> = {
                description: undefined,
                stepNumber: 1,
                image: undefined,
            };
            field.onChange([newStep]);
        }
    }, []);

    return (
        <VStack w={{ base: '100%', md: '604px', lg: '658px', '2xl': '668px' }} gap='16px'>
            <Text textStyle={{ base: 's', lg: 'm' }} fontWeight={600} alignSelf='start'>
                {ADD_COOKING_STEPS}
            </Text>

            {Array.isArray(field.value) &&
                field.value.map((step, idx) => (
                    <>
                        <CookingStep
                            imageBlockDataTestId={`${RECIPE_STEPS_IMAGE_BLOCK}-${idx}`}
                            descriptionDataTestId={`${RECIPE_STEPS_DESCRIPTION}-${idx}`}
                            imageDataTestId={`${RECIPE_STEPS_IMAGE_BLOCK}-${idx}-${PREVIEW_IMAGE}`}
                            deleteBtnDataTestId={`${RECIPE_STEPS_REMOVE_BUTTON}-${idx}`}
                            value={step.description}
                            step={step.stepNumber}
                            imageSrc={step.image}
                            onChange={handleDescriptionChange(idx)}
                            onDelete={
                                !step.description && idx === 0 ? undefined : handleStepDelete(idx)
                            }
                            invalid={invalid}
                            onImageAddition={handleImage(idx)}
                        />
                    </>
                ))}
            <UploadImageModal
                dataTestId={`${RECIPE_STEPS_IMAGE_BLOCK}-${stepIndexForUploadImage ? stepIndexForUploadImage : 0}-${INPUT_FILE}`}
                isOpen={isOpenModal}
                onClose={handleCloseModal}
                onSave={handleImageSave}
                onDelete={handleImageDelete}
                image={imageForPreview}
                setError={setErrorMessage}
            />
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
