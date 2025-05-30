import {
    Box,
    Button,
    Image,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    VStack,
} from '@chakra-ui/react';
import { FC } from 'react';
import { Blocker } from 'react-router';

import CloseInCircle from '~/shared/assets/icons/components/CrossInCircle';
import Pen from '~/shared/assets/icons/components/Pen';
import cupImage from '~/shared/assets/loginErrorModal.png';

type ConfirmNavigationProps = {
    blocker: Blocker;
    onSaveDraft: () => void;
    onClose: () => void;
    isOpen: boolean;
};

export const ConfirmNavigation: FC<ConfirmNavigationProps> = (props) => {
    const { blocker, onSaveDraft, isOpen, onClose } = props;

    const handleExit = () => {
        blocker.proceed?.();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay backdropFilter='blur(4px)' bg='rgba(0, 0, 0, 0.16)' />
            <ModalContent
                bg='bgColor'
                borderRadius='16px'
                p='32px'
                w={{ base: '316px', lg: '396px' }}
            >
                <ModalCloseButton>
                    <CloseInCircle />
                </ModalCloseButton>

                <VStack gap='32px' flexGrow={1}>
                    <Image src={cupImage} w={{ base: '108px', lg: '206px' }} />
                    <Box>
                        <Text fontSize='24px' fontWeight={700} mb='16px' textAlign='center'>
                            Выйти без сохранения?
                        </Text>

                        <Text color='gray.150' fontSize='m' textAlign='center'>
                            Чтобы сохранить, нажмите кнопку сохранить черновик
                        </Text>
                    </Box>
                    <Button
                        // type='submit'
                        w='100%'
                        onClick={onSaveDraft}
                        h='48px'
                        fontSize='l'
                        fontWeight={600}
                        leftIcon={<Pen fill='white' />}
                    >
                        Сохранить черновик
                    </Button>
                    <Button
                        w='100%'
                        onClick={handleExit}
                        h='48px'
                        fontSize='l'
                        fontWeight={600}
                        variant='clear'
                    >
                        Выйти без сохранения
                    </Button>
                </VStack>
            </ModalContent>
        </Modal>
    );
};
