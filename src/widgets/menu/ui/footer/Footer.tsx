import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Button, Text } from '@chakra-ui/react';
import { FC } from 'react';

export const Footer: FC = () => (
    <Box as='footer' p='0px 24px 32px 24px' w='100%' h='144px' textStyle='xs'>
        <Text mb='16px' color='gray.50'>
            Версия программы 03.25
        </Text>
        <Text mb='16px' color='gray.150'>
            Все права защищены, ученический файл,
            <Text>©Клевер Технолоджи, 2025</Text>
        </Text>
        <Button variant='clear' fontWeight={600} leftIcon={<ArrowBackIcon />}>
            Выйти
        </Button>
    </Box>
);
