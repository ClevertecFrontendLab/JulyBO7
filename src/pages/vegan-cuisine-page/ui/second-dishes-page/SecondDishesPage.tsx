import { Button, Stack } from '@chakra-ui/react';
import { FC } from 'react';

import { HorizontalCard } from '~/shared/components/card/ui/horizontal-card/HorizontalCard';

import { subPageMockData } from '../../model/SubPageMockData';

export const SecondDishesPage: FC = () => {
    const cards = subPageMockData.map((card, idx) => (
        <HorizontalCard
            key={idx}
            title={card.title}
            text={card.text}
            BadgeIcon={card.BadgeIcon}
            badgeText={card.badgeText}
            image={card.image}
            bookmarkCount={card.bookmarkCount}
            emojiCount={card.emojiCount}
        />
    ));
    return (
        <>
            <Stack direction='row' wrap='wrap' columnGap='24px' rowGap='16px'>
                {cards}
            </Stack>
            <Button variant='solid' bg='lime.400' size='l' color='primaryColor' mt='16px'>
                Загрузить
            </Button>
        </>
    );
};
