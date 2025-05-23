import { Box, Image, Link, ModalCloseButton, ModalContent, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { NavLink } from 'react-router';

import verificationModal from '~/shared/assets/Breakfast.png';
import CloseInCircle from '~/shared/assets/icons/components/CrossInCircle';
import { CLOSE_BUTTON, SIGN_UP_SUCCESS_MODAL } from '~/shared/constants/tests';

import {
    LINK_FOR_VERIFICATION,
    VERIFICATION_MODAL_HEADER,
    VERIFICATION_MODAL_NOTE,
    WE_SENT_YOU_EMAIL,
    WITH_SUPPORT,
} from '../../../model/constants/signUpFormText';

type VerificationModalProps = {
    email?: string;
};
export const VerificationModal: FC<VerificationModalProps> = (props) => {
    const { email } = props;

    return (
        <ModalContent
            data-test-id={SIGN_UP_SUCCESS_MODAL}
            bg='bgColor'
            borderRadius='16px'
            p='32px'
            w={{ base: '316px', lg: '396px' }}
        >
            <ModalCloseButton data-test-id={CLOSE_BUTTON}>
                <CloseInCircle />
            </ModalCloseButton>
            <VStack gap='32px' flexGrow={1}>
                <Image src={verificationModal} w={{ base: '108px', lg: '206px' }} />
                <Box>
                    <Text fontSize='24px' fontWeight={700} mb='16px' textAlign='center'>
                        {VERIFICATION_MODAL_HEADER}
                    </Text>
                    <Text color='gray.400' fontSize='m' mb='16px' textAlign='center'>
                        <Text>{WE_SENT_YOU_EMAIL}</Text>
                        <Text fontWeight={600} fontSize='m'>
                            {email}
                        </Text>
                        <Text as='span'>{`${LINK_FOR_VERIFICATION} `}</Text>
                    </Text>
                </Box>

                <Text as='span' textStyle='xs' textAlign='center' color='gray.100'>
                    {VERIFICATION_MODAL_NOTE}{' '}
                    <Link as={NavLink} to='#' textDecoration='solid'>
                        {WITH_SUPPORT}
                    </Link>
                </Text>
            </VStack>
        </ModalContent>
    );
};
