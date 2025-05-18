import { Heading, ModalCloseButton, ModalContent, VStack } from '@chakra-ui/react';
import React from 'react';

import { CLOSE_BUTTON, RESET_CREDENTIALS_MODAL } from '~/shared/constants/tests';

import { ACCOUNT_RECOVERY } from '../../../model/constants/dataRecovery';
import { AccountRecoveryForm } from '../../account-recovery-form/AccountRecoveryForm';

type AccountRecoveryModalProps = {
    onSuccess: () => void;
    email: string;
};

export const AccountRecoveryModal: React.FC<AccountRecoveryModalProps> = ({ onSuccess, email }) => (
    <ModalContent
        data-test-id={RESET_CREDENTIALS_MODAL}
        bg='bgColor'
        borderRadius='16px'
        p='32px'
        w={{ base: '316px', lg: '396px' }}
    >
        <ModalCloseButton data-test-id={CLOSE_BUTTON} />
        <VStack flexGrow={1}>
            <Heading
                fontSize='24px'
                fontWeight='700'
                lineHeight='32px'
                textAlign='center'
                mb='24px'
            >
                {ACCOUNT_RECOVERY}
            </Heading>
            <AccountRecoveryForm onSuccess={onSuccess} email={email} />
        </VStack>
    </ModalContent>
);
