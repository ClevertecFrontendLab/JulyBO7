import { Image, ModalCloseButton, ModalContent, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';

import CloseInCircle from '~/shared/assets/icons/components/CrossInCircle';
import cupImage from '~/shared/assets/loginErrorModal.png';
import { CLOSE_BUTTON, SEND_EMAIL_MODAL } from '~/shared/constants/tests';

import {
    FORGOT_PASSWORD_MODAL_NOTE,
    INPUT_EMAIL_FOR_RECOVERY,
} from '../../../model/constants/dataRecovery';
import { ForgotPasswordForm } from '../../forgot-password-form/ForgotPasswordForm';

type EnterEmailModalProps = {
    onSubmit: (email: string) => void;
};
export const EnterEmailModal: FC<EnterEmailModalProps> = (props) => {
    const { onSubmit } = props;

    return (
        <ModalContent
            data-test-id={SEND_EMAIL_MODAL}
            bg='bgColor'
            borderRadius='16px'
            p='32px'
            w={{ base: '316px', lg: '396px' }}
        >
            <ModalCloseButton data-test-id={CLOSE_BUTTON}>
                <CloseInCircle />
            </ModalCloseButton>
            <VStack flexGrow={1}>
                <Image src={cupImage} w={{ base: '108px', lg: '206px' }} mb='32px' />
                <Text color='gray.400' fontSize='m' textAlign='center' mb='16px' px='10px'>
                    {INPUT_EMAIL_FOR_RECOVERY}
                </Text>
                <ForgotPasswordForm onSuccessSubmit={onSubmit} />
                <Text textStyle='xs' textAlign='center' color='gray.100' mt='24px'>
                    {FORGOT_PASSWORD_MODAL_NOTE}
                </Text>
            </VStack>
        </ModalContent>
    );
};
