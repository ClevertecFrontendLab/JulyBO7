import { Button, HStack, Image } from '@chakra-ui/react';
import React, { ChangeEvent, useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

import { useUploadFileMutation } from '~/entities/recipe';
import ImageIcon from '~/shared/assets/icons/components/Image';
import { Alert } from '~/shared/components/alert';
import { AppLoader } from '~/shared/components/loader';
import { IMAGE_API } from '~/shared/constants/imageApi';

import { CreateDraftFormSchema } from '../../model/schemas/createDraftFormSchema';
import { CreateNewRecipeFormData } from '../../model/schemas/createNewRecipeFormSchema';
import { UploadImageModal } from '../upload-image-modal/UploadImageModal';

type FormImageProps = UseControllerProps<CreateNewRecipeFormData | CreateDraftFormSchema, 'image'>;

export const FormImage: React.FC<FormImageProps> = (props) => {
    const { field, fieldState } = useController(props);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [previewImage, setPreviewImage] = useState<string>('');
    const [file, setFile] = useState<File | null>();
    const [errorMessage, setErrorMessage] = useState<null | { title: string; text: string }>();

    const [trigger, { isLoading, data }] = useUploadFileMutation();

    const handleImageAddition = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;
        let newPreviewUrls = '';

        newPreviewUrls = URL.createObjectURL(selectedFile);
        setFile(selectedFile);
        setPreviewImage(newPreviewUrls);
    };
    const handleCloseModal = () => {
        setIsOpenModal(false);
    };
    const handleOpenModal = () => {
        setIsOpenModal(true);
    };

    const handleUploadImage = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await trigger(formData).unwrap();

            field.onChange(`${IMAGE_API}${res.url}`);

            setPreviewImage('');
            setIsOpenModal(false);
        } catch {
            setErrorMessage({ title: 'Ошибка сервера', text: 'Попробуйте сохранить фото позже.' });
            setIsOpenModal(false);
        }
    };

    return (
        <>
            {data?.url ? (
                <Image
                    src={`${IMAGE_API}${data.url}`}
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
                    border={fieldState.invalid ? '1px solid red' : 'none'}
                >
                    <Button onClick={handleOpenModal} variant='clear' w='32px' h='32px'>
                        <ImageIcon />
                    </Button>
                </HStack>
            )}
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
        </>
    );
};
