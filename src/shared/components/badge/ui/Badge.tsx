import { Box, BoxProps, IconProps, Text } from '@chakra-ui/react';
import { FC } from 'react';

type BadgeProps = {
    Icon: FC<IconProps>;
    text: string | number;
    style?: BoxProps;
};

export const Badge: FC<BadgeProps> = (props) => {
    const { Icon, text, style } = props;

    return (
        <Box
            display='inline-flex'
            alignItems='center'
            h='24px'
            bg='lime.50'
            p={{ base: '2px 4px', lg: '2px 8px' }}
            borderRadius='4px'
            // gap='6px'
            // position={{ base: 'absolute', lg: 'static' }} = передавать в style
            top={{ base: '8px' }}
            left={{ base: '8px' }}
            {...style}
        >
            <Icon width='16px' height='16px' />

            <Text textStyle={{ base: 's', md: 'xs', lg: 's' }}>{text}</Text>
        </Box>
    );
};
