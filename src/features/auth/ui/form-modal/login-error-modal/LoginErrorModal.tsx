import { Box, Button, Image, ModalCloseButton, ModalContent, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';

import verificationErrorModal from '~/shared/assets/Breakfast2.png';
import { CLOSE_BUTTON, REPEAT_BUTTON, SIGN_IN_ERROR_MODAL } from '~/shared/constants/tests';

import {
    LOGIN_ERROR_MODAL_HEADER,
    LOGIN_ERROR_MODAL_TEXT,
} from '../../../model/constants/loginFormText';

export const LoginErrorModal: FC<{ onRelogin?: () => void }> = ({ onRelogin }) => (
    <ModalContent
        data-test-id={SIGN_IN_ERROR_MODAL}
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
                    {LOGIN_ERROR_MODAL_HEADER}
                </Text>

                <Text color='gray.400' fontSize='m' textAlign='center'>
                    {LOGIN_ERROR_MODAL_TEXT}
                </Text>
            </Box>
            <Button data-test-id={REPEAT_BUTTON} w='100%' onClick={onRelogin}>
                Повторить
            </Button>
        </VStack>
    </ModalContent>
);
