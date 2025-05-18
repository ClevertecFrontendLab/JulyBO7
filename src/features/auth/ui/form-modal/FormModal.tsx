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
import { memo } from 'react';

import verificationModal from '~/shared/assets/Breakfast.png';
import verificationErrorModal from '~/shared/assets/Breakfast2.png';
import loginErrorModal from '~/shared/assets/loginErrorModal.png';

import {
    LOGIN_ERROR_MODAL_HEADER,
    LOGIN_ERROR_MODAL_TEXT,
} from '../../model/constants/loginFormText';
import {
    VERIFICATION_ERROR_MODAL_HEADER,
    VERIFICATION_ERROR_MODAL_NOTE,
    VERIFICATION_ERROR_MODAL_TEXT,
    VERIFICATION_MODAL_HEADER,
    VERIFICATION_MODAL_NOTE,
} from '../../model/constants/signUpFormText';
import { DataRecovery } from '../data-recovery/DataRecovery';

type FormModalProps = {
    isOpen: boolean;
    onClose: () => void;
    type: 'verification' | 'verificationError' | 'loginError' | 'dataRecovery';
    text?: string;
    email?: string;
    onRelogin?: () => void;
    onSuccessDataRecovery?: () => void;
};

export const FormModal = memo<FormModalProps>((props) => {
    const { isOpen, onClose, email, type, onRelogin, onSuccessDataRecovery } = props;
    let modalImage;
    let modalHeader;
    let modalText;
    let modalNote;

    switch (type) {
        case 'verification':
            modalImage = verificationModal;
            modalHeader = VERIFICATION_MODAL_HEADER;
            modalText = `Мы отправили вам на почту ${email}ссылку для верификации.`;
            modalNote = VERIFICATION_MODAL_NOTE;
            break;
        case 'verificationError':
            modalImage = verificationErrorModal;
            modalHeader = VERIFICATION_ERROR_MODAL_HEADER;
            modalText = VERIFICATION_ERROR_MODAL_TEXT;
            modalNote = VERIFICATION_ERROR_MODAL_NOTE;
            break;
        case 'loginError':
            modalImage = loginErrorModal;
            modalHeader = LOGIN_ERROR_MODAL_HEADER;
            modalText = LOGIN_ERROR_MODAL_TEXT;
            break;
    }
    const handleSuccessDataRecovery = () => {
        onSuccessDataRecovery?.();
        onClose();
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
                <ModalCloseButton />
                <VStack gap={type !== 'dataRecovery' ? '32px' : 0} flexGrow={1}>
                    {type === 'dataRecovery' ? (
                        <DataRecovery onSuccessAccountRecovery={handleSuccessDataRecovery} />
                    ) : (
                        <>
                            <Image src={modalImage} w={{ base: '108px', lg: '206px' }} />
                            <Box>
                                <Text fontSize='24px' fontWeight={700} mb='16px' textAlign='center'>
                                    {modalHeader}
                                </Text>

                                <Text color='gray.400' fontSize='m' textAlign='center'>
                                    {modalText}
                                </Text>
                            </Box>

                            <Text textStyle='xs' textAlign='center' color='gray.100'>
                                {modalNote}
                            </Text>
                            {type === 'loginError' && (
                                <Button w='100%' onClick={onRelogin}>
                                    Повторить
                                </Button>
                            )}
                        </>
                    )}
                </VStack>
            </ModalContent>
        </Modal>
    );
});
