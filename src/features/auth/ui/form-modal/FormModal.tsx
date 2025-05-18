import { Modal, ModalOverlay } from '@chakra-ui/react';
import { memo } from 'react';

import { DataRecovery } from '../data-recovery/DataRecovery';
import { LoginErrorModal } from './login-error-modal/LoginErrorModal';
import { VerificationErrorModal } from './verification-error-modal/VerificationErrorModal';
import { VerificationModal } from './verification-modal/VerificationModal';

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

    const handleSuccessDataRecovery = () => {
        onSuccessDataRecovery?.();
        onClose();
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay backdropFilter='blur(4px)' bg='rgba(0, 0, 0, 0.16)' />
            {type === 'loginError' ? (
                <LoginErrorModal onRelogin={onRelogin} />
            ) : type === 'verification' ? (
                <VerificationModal email={email} />
            ) : type === 'verificationError' ? (
                <VerificationErrorModal />
            ) : (
                <DataRecovery onSuccessAccountRecovery={handleSuccessDataRecovery} />
            )}
        </Modal>
    );
});
