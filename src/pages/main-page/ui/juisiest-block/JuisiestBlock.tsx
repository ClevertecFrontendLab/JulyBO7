import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, HStack, Stack } from '@chakra-ui/react';
import { FC } from 'react';

import { HorizontalCard } from '~/shared/components/card/ui/horizontal-card/HorizontalCard';

import { mainPageData } from '../../model/mockData';

export const JuisiestBlock: FC = () => {
    const juiciestCards = mainPageData.juiciest.map((data, idx) => (
        <HorizontalCard
            key={idx}
            title={data.title}
            text={data.text}
            badgeImage={data.badgeImage}
            badgeText={data.badgeText}
            image={data.image}
            bookmarkCount={data.bookmarkCount}
            emojiCount={data.emojiCount}
        />
    ));
    return (
        <Box>
            <HStack justify='space-between'>
                <Heading variant={{ base: 's', lg: 'lm', '2xl': 'xl' }}>Самое сочное </Heading>
                <Button
                    display={{ base: 'none', lg: 'flex' }}
                    alignItems='center'
                    variant='solid'
                    bg='lime.400'
                    size='xl'
                    color='primaryColor'
                    rightIcon={<ArrowForwardIcon />}
                >
                    Вся подборка
                </Button>
            </HStack>

            <Stack
                direction={{ base: 'column', md: 'row', lg: 'column', '2xl': 'row' }}
                wrap='wrap'
                spacing={{ base: '12px', md: '16px', '2xl': '24px' }}
                mt={{ base: '12px', lg: '16px', '2xl': '24px' }}
            >
                {juiciestCards}
            </Stack>
        </Box>
    );
};
