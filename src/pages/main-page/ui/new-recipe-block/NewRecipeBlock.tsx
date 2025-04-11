import { Box, Heading, HStack } from '@chakra-ui/react';
import { FC } from 'react';

import { BadgeColor } from '~/shared/components/badge/ui/Badge';
import { VerticalCard } from '~/shared/components/card/ui/vertical-card/VerticalCard';

import { mainPageData, PageBlock } from '../../model/mockData';
import cls from './NewRecipeBlock.module.scss';

export const NewRecipeBlock: FC = () => {
    const newRecipeCards = mainPageData.newRecipe.map((data: PageBlock, idx: number) => (
        <VerticalCard
            key={idx}
            title={data.title}
            text={data.text}
            badgeImage={data.badgeImage}
            badgeText={data.badgeText}
            image={data.image}
            bookmarkCount={data.bookmarkCount}
            emojiCount={data.emojiCount}
            badgeColor={BadgeColor.SECONDARY}
        />
    ));

    return (
        <Box w='100%'>
            <Heading variant={{ base: 's', lg: 'lm', '2xl': 'xl' }}>Новые рецепты</Heading>
            <HStack
                spacing={{ base: '12px', '2xl': '24px' }}
                mt={{ base: '12px', lg: '24px' }}
                overflowX={{ base: 'auto', lg: 'hidden' }}
                wrap='nowrap'
                className={cls.block}
            >
                {newRecipeCards}
            </HStack>
        </Box>
    );
};
