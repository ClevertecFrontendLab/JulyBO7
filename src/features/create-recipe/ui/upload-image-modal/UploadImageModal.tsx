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
import React, { ChangeEvent } from 'react';

import CloseInCircle from '~/shared/assets/icons/components/CrossInCircle';
import ImageIcon from '~/shared/assets/icons/components/Image';

type UploadImageModalProps = {
    isOpen: boolean;
    onClose: () => void;
    previewImage: string;
    onImageAddition: (e: ChangeEvent<HTMLInputElement>) => void;
    onImageSave: () => void;
};

export const UploadImageModal: React.FC<UploadImageModalProps> = (props) => {
    const { isOpen, onClose, previewImage, onImageAddition, onImageSave } = props;

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay backdropFilter='blur(4px)' bg='rgba(0, 0, 0, 0.16)' />
            <ModalContent
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
                    <VStack w='100%' alignItems='center' justifyContent='center'>
                        {previewImage ? (
                            <VStack alignItems='center' justifyContent='center'>
                                <Image
                                    src={
                                        typeof previewImage === 'string' ? previewImage : undefined
                                    }
                                    h='206px'
                                    w='206px'
                                    borderRadius='8px'
                                />
                                <Button onClick={onImageSave} h='48px' w='100%'>
                                    Сохранить
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
                                        type='file'
                                        accept={'image/*'}
                                        hidden
                                        onChange={onImageAddition}
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
