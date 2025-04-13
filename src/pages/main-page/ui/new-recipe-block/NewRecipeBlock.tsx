import { Box, Button, Heading, HStack } from '@chakra-ui/react';
import { FC } from 'react';

import ArrowLeftIcon from '~/shared/assets/icons/components/ArrowLeft';
import ArrowRightIcon from '~/shared/assets/icons/components/ArrowRight';
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
        <Box w='100%' position={{ base: 'static', lg: 'relative' }}>
            <Heading variant={{ base: 's', lg: 'lm', '2xl': 'xl' }}>Новые рецепты</Heading>
            <HStack
                spacing={{ base: '12px', '2xl': '24px' }}
                mt={{ base: '12px', lg: '24px' }}
                overflow={{ base: 'auto', lg: 'hidden' }}
                wrap='nowrap'
                className={cls.block}
            >
                {newRecipeCards}
            </HStack>
            <Button
                display={{ base: 'none', lg: 'flex' }}
                alignItems='center'
                h={{ lg: '40px', '2xl': '48px' }}
                w={{ lg: '40px', '2xl': '48px' }}
                bg='primaryColor'
                position='absolute'
                bottom={{ lg: '213px', '2xl': '219px' }}
                left='-8px'
            >
                <ArrowLeftIcon fill='lime.50' />
            </Button>
            <Button
                display={{ base: 'none', lg: 'flex' }}
                alignItems='center'
                h={{ lg: '40px', '2xl': '48px' }}
                w={{ lg: '40px', '2xl': '48px' }}
                bg='primaryColor'
                position='absolute'
                bottom={{ lg: '213px', '2xl': '219px' }}
                right='-8px'
            >
                <ArrowRightIcon fill='lime.50' />
            </Button>
        </Box>
    );
};
