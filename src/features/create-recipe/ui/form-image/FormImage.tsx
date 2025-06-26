import { Box, HStack, Image } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

import ImageIcon from '~/shared/assets/icons/components/Image';
import { Alert } from '~/shared/components/alert';
import { IMAGE_API } from '~/shared/constants/imageApi';
import {
    RECIPE_IMAGE_BLOCK,
    RECIPE_IMAGE_BLOCK_INPUT_FILE,
    RECIPE_IMAGE_BLOCK_PREVIEW_IMAGE,
} from '~/shared/constants/tests';

import { CreateDraftFormSchema } from '../../model/schemas/createDraftFormSchema';
import { CreateNewRecipeFormData } from '../../model/schemas/createNewRecipeFormSchema';
import { UploadImageModal } from '../upload-image-modal/UploadImageModal';

type FormImageProps = UseControllerProps<
    CreateNewRecipeFormData | CreateDraftFormSchema,
    'image'
> & { invalid: boolean };

export const FormImage: React.FC<FormImageProps> = ({ invalid, ...props }) => {
    const { field } = useController(props);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState<null | { title: string; text: string }>();

    const handleDeleteImage = () => {
        if (field.value) {
            field.onChange(undefined);
        }
    };
    const handleImageSave = (url: string) => {
        field.onChange(url);
    };

    return (
        <>
            <Box data-test-id={RECIPE_IMAGE_BLOCK} onClick={() => setIsOpenModal(true)}>
                {field.value ? (
                    <Image
                        data-test-id={RECIPE_IMAGE_BLOCK_PREVIEW_IMAGE}
                        src={`${IMAGE_API}${field.value}`}
                        objectFit='cover'
                        w={{ base: '328px', md: '232px', lg: '353px', '2xl': '553px' }}
                        h={{ base: '224px', md: '224px', lg: '410px' }}
                        borderRadius='8px'
                        alt='новый рецепт'
                    />
                ) : (
                    <HStack
                        h={{ base: '224px', md: '224px', lg: '410px' }}
                        w={{ base: '328px', md: '232px', lg: '353px', '2xl': '553px' }}
                        bg='gray.200'
                        borderRadius='8px'
                        alignItems='center'
                        justifyContent='center'
                        border={invalid ? '1px solid rgb(229, 62, 62)' : 'none'}
                    >
                        <ImageIcon />
                    </HStack>
                )}
            </Box>
            <UploadImageModal
                dataTestId={RECIPE_IMAGE_BLOCK_INPUT_FILE}
                isOpen={isOpenModal}
                onClose={() => setIsOpenModal(false)}
                onSave={handleImageSave}
                onDelete={handleDeleteImage}
                setError={setErrorMessage}
                image={field.value ? `${IMAGE_API}${field.value}` : undefined}
            />
            {errorMessage && (
                <Alert
                    onClose={() => setErrorMessage(null)}
                    title={errorMessage.title}
                    text={errorMessage.text}
                    type='error'
                />
            )}
        </>
    );
};
