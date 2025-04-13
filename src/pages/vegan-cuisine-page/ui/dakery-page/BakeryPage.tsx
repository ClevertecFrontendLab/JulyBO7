import { Button, Stack } from '@chakra-ui/react';
import { FC } from 'react';

import { HorizontalCard } from '~/shared/components/card/ui/horizontal-card/HorizontalCard';

import { subPageMockData } from '../../model/subPageMockData';

export const BakeryPage: FC = () => {
    const cards = subPageMockData.map((card, idx) => (
        <HorizontalCard
            key={idx}
            title={card.title}
            text={card.text}
            badgeImage={card.badgeImage}
            badgeText={card.badgeText}
            image={card.image}
            bookmarkCount={card.bookmarkCount}
            emojiCount={card.emojiCount}
        />
    ));
    return (
        <>
            <Stack
                direction='row'
                wrap='wrap'
                columnGap={{ base: '16px', lg: '24px' }}
                rowGap='16px'
            >
                {cards}
            </Stack>
            <Button variant='solid' bg='lime.400' size='l' color='primaryColor' mt='16px'>
                Загрузить
            </Button>
        </>
    );
};
