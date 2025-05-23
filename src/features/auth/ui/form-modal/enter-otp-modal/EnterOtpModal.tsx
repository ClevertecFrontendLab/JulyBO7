import { Image, ModalCloseButton, ModalContent, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

import otpPasswordModal from '~/shared/assets/otp.png';
import { CLOSE_BUTTON, VERIFICATION_CODE_MODAL } from '~/shared/constants/tests';

import {
    ENTER_IT_BELOW,
    FORGOT_PASSWORD_MODAL_NOTE,
    INVALID_CODE,
    SIX_DIGIT_CODE,
    WE_SENT_YOU_EMAIL,
} from '../../../model/constants/dataRecovery';
import { OtpPasswordForm } from '../../otp-password-form/OtpPasswordForm';

type EnterOtpModalProps = {
    email: string;
    onSubmit: () => void;
};

export const EnterOtpModal: React.FC<EnterOtpModalProps> = ({ email, onSubmit }) => {
    const [isShowInvalidCodeError, setIsShowInvalidCodeError] = useState(false);

    const handleFailedSubmit = (value: boolean) => {
        setIsShowInvalidCodeError(value);
    };

    return (
        <ModalContent
            data-test-id={VERIFICATION_CODE_MODAL}
            bg='bgColor'
            borderRadius='16px'
            p='32px'
            w={{ base: '316px', lg: '396px' }}
        >
            <ModalCloseButton data-test-id={CLOSE_BUTTON} />
            <VStack flexGrow={1}>
                <Image src={otpPasswordModal} w={{ base: '108px', lg: '206px' }} mb='32px' />
                {isShowInvalidCodeError && (
                    <Text fontSize='24px' fontWeight={700}>
                        {INVALID_CODE}
                    </Text>
                )}
                <Text color='gray.400' fontSize='m' mb='16px' textAlign='center'>
                    <Text as='span'>{`${WE_SENT_YOU_EMAIL} `}</Text>
                    <Text as='span' fontWeight={600} fontSize='m'>
                        {`${email} `}
                    </Text>
                    <Text as='span'>{`${SIX_DIGIT_CODE} `}</Text>
                    <Text as='span'>{`${ENTER_IT_BELOW}`}</Text>
                </Text>
                <OtpPasswordForm
                    email={email}
                    onSuccessSubmit={onSubmit}
                    onFailedSubmit={handleFailedSubmit}
                />
                <Text textStyle='xs' textAlign='center' color='gray.100' mt='24px'>
                    {FORGOT_PASSWORD_MODAL_NOTE}
                </Text>
            </VStack>
        </ModalContent>
    );
};
