import { Box, BoxProps, Text } from '@chakra-ui/react';
import { FC, SVGProps } from 'react';

type BadgeProps = {
    Icon: FC<SVGProps<SVGSVGElement>>;
    text: string | number;
    style?: BoxProps;
};

export const Badge: FC<BadgeProps> = (props) => {
    const { Icon, text, style } = props;

    return (
        <Box
            display='inline-flex'
            alignItems='center'
            height='24px'
            bg='lime.50'
            p={{ base: '2px 4px', lg: '2px 8px' }}
            borderRadius='4px'
            gap='8px'
            {...style}
        >
            <Icon width={16} height={16} />

            <Text textStyle='s'>{text}</Text>
        </Box>
    );
};
