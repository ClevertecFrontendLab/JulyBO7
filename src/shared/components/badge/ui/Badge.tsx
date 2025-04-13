import { Box, BoxProps, Image, Text } from '@chakra-ui/react';
import { FC } from 'react';

export enum BadgeTheme {
    DEFAULT = 'default',
    RECOMEND = 'recomend',
}
export enum BadgeColor {
    PRIMARY = 'lime.50',
    SECONDARY = 'lime.150',
}
type BadgeProps = {
    image: string;
    text: string | number;
    style?: BoxProps;
    theme?: BadgeTheme;
    badgeColor?: BadgeColor;
};

export const Badge: FC<BadgeProps> = (props) => {
    const {
        image,
        text,
        style,
        theme = BadgeTheme.DEFAULT,
        badgeColor = BadgeColor.PRIMARY,
    } = props;

    const badgeText = theme === BadgeTheme.RECOMEND ? `${text} рекомендует` : text;

    return (
        <Box
            display={
                theme === BadgeTheme.RECOMEND ? { base: 'none', lg: 'inline-flex' } : 'inline-flex'
            }
            alignItems='center'
            h={theme === BadgeTheme.RECOMEND ? '28px' : '24px'}
            bg={badgeColor}
            p={
                theme === BadgeTheme.RECOMEND
                    ? '4px 8px'
                    : { base: '2px 4px', md: '0', lg: '2px 8px' }
            }
            borderRadius='4px'
            gap='2px'
            {...style}
        >
            <Image src={image} h='16px' w='16px' />
            <Text textStyle='s'>{badgeText}</Text>
        </Box>
    );
};
