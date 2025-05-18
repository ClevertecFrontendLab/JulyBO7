import { Box, Image, ModalCloseButton, ModalContent, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';

import verificationErrorModal from '~/shared/assets/Breakfast2.png';
import { CLOSE_BUTTON, EMAIL_VERIFICATION_FAILED_MODAL } from '~/shared/constants/tests';

import {
    VERIFICATION_ERROR_MODAL_HEADER,
    VERIFICATION_ERROR_MODAL_NOTE,
    VERIFICATION_ERROR_MODAL_TEXT,
} from '../../../model/constants/signUpFormText';

export const VerificationErrorModal: FC = () => (
    <ModalContent
        data-test-id={EMAIL_VERIFICATION_FAILED_MODAL}
        bg='bgColor'
        borderRadius='16px'
        p='32px'
        w={{ base: '316px', lg: '396px' }}
    >
        <ModalCloseButton data-test-id={CLOSE_BUTTON} />
        <VStack gap='32px' flexGrow={1}>
            <Image src={verificationErrorModal} w={{ base: '108px', lg: '206px' }} />
            <Box>
                <Text fontSize='24px' fontWeight={700} mb='16px' textAlign='center'>
                    {VERIFICATION_ERROR_MODAL_HEADER}
                </Text>

                <Text color='gray.400' fontSize='m' textAlign='center'>
                    {VERIFICATION_ERROR_MODAL_TEXT}
                </Text>
            </Box>

            <Text textStyle='xs' textAlign='center' color='gray.100'>
                {VERIFICATION_ERROR_MODAL_NOTE}
            </Text>
        </VStack>
    </ModalContent>
);
