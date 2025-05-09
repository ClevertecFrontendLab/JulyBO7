import { Box, BoxProps, Image, Text } from '@chakra-ui/react';
import { FC } from 'react';

export enum BadgeTheme {
    CATEGORY = 'category',
    RECOMEND = 'recomend',
}
export enum BadgeColor {
    PRIMARY = 'lime.50',
    SECONDARY = 'lime.150',
}

type BadgeProps = Partial<{
    categoryTitle: string;
    categoryIcon: string;

    userName: string;
    avatar: string;
    style: BoxProps;
    theme: BadgeTheme;
    badgeColor: BadgeColor;
}>;

export const Badge: FC<BadgeProps> = (props) => {
    const {
        style,
        theme = BadgeTheme.CATEGORY,
        badgeColor = BadgeColor.PRIMARY,
        userName,
        avatar,
        categoryTitle,
        categoryIcon,
    } = props;

    const badgeText = theme === BadgeTheme.RECOMEND ? `${userName} рекомендует` : categoryTitle;

    return (
        <Box
            display={
                theme === BadgeTheme.RECOMEND ? { base: 'none', lg: 'inline-flex' } : 'inline-flex'
            }
            alignItems='center'
            minH={theme === BadgeTheme.RECOMEND ? '28px' : '24px'}
            bg={badgeColor}
            p={
                theme === BadgeTheme.RECOMEND
                    ? '4px 8px'
                    : { base: '2px 4px', md: '0', lg: '2px 8px' }
            }
            borderRadius='4px'
            gap='2px'
            width='max-content'
            {...style}
        >
            <Image src={theme === BadgeTheme.RECOMEND ? avatar : categoryIcon} h='16px' w='16px' />
            <Text textStyle='s'>{badgeText}</Text>
        </Box>
    );
};
