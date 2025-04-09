import { Box, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';

import {
    WithoutImageCard,
    WithoutImageCardProps,
} from '../card/ui/without-image-card/WithoutImageCard';
import {
    WithoutTextCard,
    WithoutTextCardProps,
} from '../card/ui/without-text-card/WithoutTextCard';

type PageFooterProps = {
    title: string;
    text: string;
    withoutImageCardData: WithoutImageCardProps[];
    withoutTextCardData: WithoutTextCardProps[];
};

export const PageFooter: FC<PageFooterProps> = (props) => {
    const { title, text, withoutImageCardData, withoutTextCardData } = props;
    return (
        <VStack
            as='section'
            spacing={{ base: '16px', lg: '24px' }}
            mt={{ base: '8px', lg: '24px' }}
        >
            <Stack
                w='100%'
                border='1px solid red'
                direction={{ base: 'column', lg: 'row' }}
                justify='space-between'
            >
                <Heading
                    mb={{ base: '16px', lg: '32px' }}
                    fontSize={{ base: '24px', lg: '2xl' }}
                    fontWeight={500}
                    lineHeight={{ base: '133%', lg: '100%' }}
                >
                    {title}
                </Heading>
                <Text
                    w={{ lg: '582px', '2xl': '668px' }}
                    color='gray.100'
                    textStyle={{ base: 's', lg: 'm' }}
                    mb={{ base: '16px', lg: '32px' }}
                >
                    {text}
                </Text>
            </Stack>
            <Stack
                direction={{ base: 'column', md: 'row' }}
                w='100%'
                spacing={{ base: '12px', md: '16px', '2xl': '24px' }}
            >
                {withoutImageCardData.map((cardData, idx) => (
                    <WithoutImageCard
                        key={idx}
                        title={cardData.title}
                        text={cardData.text}
                        BadgeIcon={cardData.BadgeIcon}
                        badgeText={cardData.badgeText}
                        bookmarkCount={cardData.bookmarkCount}
                        emojiCount={cardData.emojiCount}
                    />
                ))}
                <Box>
                    {withoutTextCardData.map((cardData, idx) => (
                        <WithoutTextCard key={idx} text={cardData.text} Icon={cardData.Icon} />
                    ))}
                </Box>
            </Stack>
        </VStack>
    );
};
