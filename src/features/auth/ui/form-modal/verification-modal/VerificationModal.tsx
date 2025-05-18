import { Box, Image, ModalCloseButton, ModalContent, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';

import verificationModal from '~/shared/assets/Breakfast.png';
import { CLOSE_BUTTON, SIGN_UP_SUCCESS_MODAL } from '~/shared/constants/tests';

import {
    LINK_FOR_VERIFICATION,
    VERIFICATION_MODAL_HEADER,
    VERIFICATION_MODAL_NOTE,
    WE_SENT_YOU_EMAIL,
} from '../../../model/constants/signUpFormText';

export const VerificationModal: FC<{ email?: string }> = ({ email }) => (
    <ModalContent
        data-test-id={SIGN_UP_SUCCESS_MODAL}
        bg='bgColor'
        borderRadius='16px'
        p='32px'
        w={{ base: '316px', lg: '396px' }}
    >
        <ModalCloseButton data-test-id={CLOSE_BUTTON} />
        <VStack gap='32px' flexGrow={1}>
            <Image src={verificationModal} w={{ base: '108px', lg: '206px' }} />
            <Box>
                <Text fontSize='24px' fontWeight={700} mb='16px' textAlign='center'>
                    {VERIFICATION_MODAL_HEADER}
                </Text>
                <Text color='gray.400' fontSize='m' mb='16px' textAlign='center'>
                    <Text as='span'>{`${WE_SENT_YOU_EMAIL} `}</Text>
                    <Text as='span' fontWeight={600} fontSize='m'>
                        {`${email} `}
                    </Text>
                    <Text as='span'>{`${LINK_FOR_VERIFICATION} `}</Text>
                </Text>
            </Box>

            <Text textStyle='xs' textAlign='center' color='gray.100'>
                {VERIFICATION_MODAL_NOTE}
            </Text>
        </VStack>
    </ModalContent>
);
