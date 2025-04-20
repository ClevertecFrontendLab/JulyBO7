import { Box, BoxProps, Image, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { Category } from '~/shared/types/categories';

import { mappedCategoryData } from '../model/mappedCategoriesData';

export enum BadgeTheme {
    CATEGORY = 'category',
    RECOMEND = 'recomend',
}
export enum BadgeColor {
    PRIMARY = 'lime.50',
    SECONDARY = 'lime.150',
}

type BadgeProps = {
    category?: Category;
    userName?: string;
    avatar?: string;
    style?: BoxProps;
    theme?: BadgeTheme;
    badgeColor?: BadgeColor;
};

export const Badge: FC<BadgeProps> = (props) => {
    const {
        style,
        theme = BadgeTheme.CATEGORY,
        badgeColor = BadgeColor.PRIMARY,
        userName,
        avatar,
        category,
    } = props;

    const categoryData = category && mappedCategoryData[category];
    const badgeText =
        theme === BadgeTheme.RECOMEND ? `${userName} рекомендует` : categoryData?.text;

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
            <Image
                src={theme === BadgeTheme.RECOMEND ? avatar : categoryData?.image}
                h='16px'
                w='16px'
            />
            <Text textStyle='s'>{badgeText}</Text>
        </Box>
    );
};
