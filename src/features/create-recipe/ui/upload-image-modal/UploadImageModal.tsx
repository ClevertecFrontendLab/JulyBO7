import {
    Button,
    Image,
    Input,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    VStack,
} from '@chakra-ui/react';
import { ChangeEvent, FC, useState } from 'react';

import { useUploadFileMutation } from '~/entities/recipe';
import CloseInCircle from '~/shared/assets/icons/components/CrossInCircle';
import ImageIcon from '~/shared/assets/icons/components/Image';
import {
    RECIPE_IMAGE_MODAL,
    RECIPE_IMAGE_MODAL_IMAGE_BLOCK,
    RECIPE_IMAGE_MODAL_PREVIEW_IMAGE,
} from '~/shared/constants/tests';

type UploadImageModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (url: string) => void;
    onDelete: () => void;
    setError: ({ title, text }: { title: string; text: string }) => void;
    image?: string;
    dataTestId?: string;
};

export const UploadImageModal: FC<UploadImageModalProps> = (props) => {
    const { isOpen, onClose, onSave, onDelete, dataTestId, image, setError } = props;

    const [file, setFile] = useState<File | null>();
    const [previewImage, setPreviewImage] = useState<string>();

    const [trigger] = useUploadFileMutation();

    const handleImageAddition = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;
        let newPreviewUrls = '';

        newPreviewUrls = URL.createObjectURL(selectedFile);
        setFile(selectedFile);
        setPreviewImage(newPreviewUrls);
    };

    const handleModalClose = () => {
        onClose();
        setPreviewImage(undefined);
    };

    const handleDeleteImage = () => {
        if (previewImage) {
            setPreviewImage(undefined);
        } else {
            onDelete();
        }
        onClose();
    };

    const handleImageSave = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await trigger(formData).unwrap();

            onSave(res.url);
            setPreviewImage(undefined);
        } catch {
            setError({ title: 'Ошибка сервера', text: 'Попробуйте сохранить фото позже.' });
        } finally {
            handleModalClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={handleModalClose} isCentered>
            <ModalOverlay backdropFilter='blur(4px)' bg='rgba(0, 0, 0, 0.16)' />
            <ModalContent
                data-test-id={RECIPE_IMAGE_MODAL}
                bg='bgColor'
                borderRadius='16px'
                p='32px 32px 40px 32px'
                w={{ base: '316px', lg: '396px' }}
                minH='342px'
            >
                <ModalCloseButton>
                    <CloseInCircle />
                </ModalCloseButton>

                <VStack gap='32px' alignItems='center' justifyContent='center' w='100%'>
                    <Text fontSize='24px' fontWeight={700} textAlign='center'>
                        Изображение
                    </Text>
                    <VStack
                        data-test-id={RECIPE_IMAGE_MODAL_IMAGE_BLOCK}
                        w='100%'
                        alignItems='center'
                        justifyContent='center'
                    >
                        {previewImage || image ? (
                            <VStack alignItems='center' justifyContent='center'>
                                <Image
                                    data-test-id={RECIPE_IMAGE_MODAL_PREVIEW_IMAGE}
                                    src={previewImage || image}
                                    h='206px'
                                    w='206px'
                                    borderRadius='8px'
                                />
                                {image ? null : (
                                    <Button onClick={handleImageSave} h='48px' w='100%'>
                                        Сохранить
                                    </Button>
                                )}
                                <Button
                                    onClick={handleDeleteImage}
                                    variant='clear'
                                    h='48px'
                                    w='100%'
                                >
                                    Удалить
                                </Button>
                            </VStack>
                        ) : (
                            <VStack
                                h='206px'
                                w='206px'
                                borderBottomLeftRadius='8px'
                                borderTopLeftRadius='8px'
                                borderTopRightRadius='8px'
                                borderBottomRightRadius='8px'
                                bg='gray.200'
                                alignItems='center'
                                justifyContent='center'
                            >
                                <label>
                                    <ImageIcon cursor='pointer' />
                                    <Input
                                        data-test-id={dataTestId}
                                        type='file'
                                        accept={'image/*'}
                                        hidden
                                        onChange={handleImageAddition}
                                    />
                                </label>
                            </VStack>
                        )}
                    </VStack>
                </VStack>
            </ModalContent>
        </Modal>
    );
};
