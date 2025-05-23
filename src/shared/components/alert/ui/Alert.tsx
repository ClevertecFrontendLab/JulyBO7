import { CheckCircleIcon } from '@chakra-ui/icons';
import {
    Alert as ChakraAlert,
    AlertDescription,
    AlertIcon as AlertErrorIcon,
    AlertProps as ChakraAlertProps,
    AlertTitle,
    Box,
    CloseButton,
    useDisclosure,
} from '@chakra-ui/react';
import { FC, useEffect } from 'react';

import { CLOSE_ALERT_BUTTON, ERROR_NOTIFICATION } from '~/shared/constants/tests';

type AlertProps = {
    type: 'error' | 'success';
    title?: string;
    text?: string;
    onClose?: () => void;
} & ChakraAlertProps;

export const Alert: FC<AlertProps> = (props) => {
    const { onClose, text, type, title, ...rest } = props;
    const { isOpen: isVisible, onClose: onCloseAlert } = useDisclosure({ defaultIsOpen: true });

    const handleClose = () => {
        onClose?.();
        onCloseAlert();
    };

    useEffect(() => {
        const timerId = setTimeout(() => {
            handleClose();
        }, 16000);

        return () => {
            clearTimeout(timerId);
        };
    }, []);

    return isVisible ? (
        <ChakraAlert
            data-test-id={ERROR_NOTIFICATION}
            status={type}
            position='fixed'
            zIndex={10000}
            bottom='100px'
            left='50%'
            transform='translateX(-50%)'
            bg={type === 'error' ? 'error.100' : 'green.500'}
            p='12px 16px'
            w={{ base: '328px', lg: '400px' }}
            {...rest}
        >
            {type === 'error' ? (
                <AlertErrorIcon color='bgColor' mr='12px' />
            ) : (
                <CheckCircleIcon color='bgColor' bg='green.500' mr='12px' />
            )}
            <Box>
                <AlertTitle color='bgColor' textStyle='m' fontWeight={700}>
                    {title}
                </AlertTitle>
                {type === 'error' && (
                    <AlertDescription color='bgColor' textStyle='m' fontWeight={400}>
                        {text}
                    </AlertDescription>
                )}
            </Box>
            <CloseButton
                data-test-id={CLOSE_ALERT_BUTTON}
                ml='auto'
                alignSelf='flex-start'
                position='relative'
                right={-1}
                top={-1}
                onClick={handleClose}
                color='bgColor'
            />
        </ChakraAlert>
    ) : null;
};
