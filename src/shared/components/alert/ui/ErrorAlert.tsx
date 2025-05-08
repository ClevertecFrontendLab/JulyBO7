import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    CloseButton,
    useDisclosure,
} from '@chakra-ui/react';
import { FC } from 'react';

import { CLOSE_ALERT_BUTTON, ERROR_NOTIFICATION } from '~/shared/constants/tests';

type ErrorAlertProps = {
    onClose?: () => void;
};
export const ErrorAlert: FC<ErrorAlertProps> = ({ onClose }) => {
    const { isOpen: isVisible, onClose: onCloseAlert } = useDisclosure({ defaultIsOpen: true });

    const handleClose = () => {
        onClose?.();
        onCloseAlert();
    };

    return isVisible ? (
        <Alert
            data-test-id={ERROR_NOTIFICATION}
            status='error'
            position='fixed'
            zIndex={10000}
            bottom='100px'
            left='50%'
            transform='translateX(-50%)'
            bg='error.100'
            p='12px 16px'
            w={{ base: '328px', lg: '400px' }}
        >
            <AlertIcon color='bgColor' />
            <Box>
                <AlertTitle color='bgColor' textStyle='m' fontWeight={700}>
                    Ошибка сервера!
                </AlertTitle>
                <AlertDescription color='bgColor' textStyle='m' fontWeight={400}>
                    Попробуйте поискать снова попозже
                </AlertDescription>
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
        </Alert>
    ) : null;
};
