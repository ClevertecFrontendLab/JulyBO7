import {
    Box,
    Image,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    VStack,
} from '@chakra-ui/react';
import React from 'react';

import modalImage from '~/shared/assets/Breakfast.png';
import modalImage2 from '~/shared/assets/Breakfast2.png';

type FormModalProps = {
    isOpen: boolean;
    onClose: () => void;
    type: 'beforeVerification' | 'verificationError';
    text?: string;
    email?: string;
};

export const FormModal: React.FC<FormModalProps> = ({ isOpen, onClose, email, type }) => (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter='blur(4px)' bg='rgba(0, 0, 0, 0.16)' />
        <ModalContent>
            <ModalCloseButton />
            <VStack
                w={{ base: '316px', lg: '396px' }}
                bg='bgColor'
                borderRadius='16px'
                p='32px'
                gap='32px'
            >
                <Image
                    src={type === 'beforeVerification' ? modalImage : modalImage2}
                    w={{ base: '108px', lg: '206px' }}
                />
                <Box>
                    <Text fontSize='24px' fontWeight={700} mb='16px' textAlign='center'>
                        {type === 'beforeVerification'
                            ? 'Остался последний шаг. Нужно верифицировать ваш e-mail'
                            : 'Упс! Что-то пошло не так'}
                    </Text>

                    <Text color='gray.400' fontSize='m' textAlign='center'>
                        {type === 'beforeVerification'
                            ? `Мы отправили вам на почту ${email}ссылку для верификации.`
                            : 'Ваша ссылка для верификации недействительна. Попробуйте зарегистрироваться снова.'}
                    </Text>
                </Box>

                <Text textStyle='xs' textAlign='center' color='gray.100'>
                    {type === 'beforeVerification'
                        ? 'Не пришло письмо? Проверьте папку Спам. По другим вопросам свяжитесь с поддержкой'
                        : 'Остались вопросы? Свяжитесь с поддержкой'}
                </Text>
            </VStack>
        </ModalContent>
    </Modal>
);
