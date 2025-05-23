import { Modal, ModalOverlay } from '@chakra-ui/react';
import { FC } from 'react';

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

export const FormModal: FC<FormModalProps> = (props) => {
    const { isOpen, onClose, email, type, onRelogin, onSuccessDataRecovery } = props;

    const handleSuccessDataRecovery = () => {
        onSuccessDataRecovery?.();
        onClose();
    };
    let modalContent;

    switch (type) {
        case 'loginError':
            modalContent = <LoginErrorModal onRelogin={onRelogin} />;
            break;
        case 'verification':
            modalContent = <VerificationModal email={email} />;
            break;
        case 'verificationError':
            modalContent = <VerificationErrorModal />;
            break;
        default:
            modalContent = <DataRecovery onSuccessAccountRecovery={handleSuccessDataRecovery} />;
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay backdropFilter='blur(4px)' bg='rgba(0, 0, 0, 0.16)' />
            {modalContent}
        </Modal>
    );
};
