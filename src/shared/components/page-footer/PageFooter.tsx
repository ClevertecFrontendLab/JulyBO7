import { Heading, Stack, Text, VStack } from '@chakra-ui/react';
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
            pt={{ base: '8px', lg: '24px' }}
            borderTop='1px solid rgba(0, 0, 0, 0.08)'
        >
            <Stack
                w='100%'
                direction={{ base: 'column', lg: 'row' }}
                justify='space-between'
                gap={{ lg: '12px' }}
            >
                <Heading
                    w={{ lg: '278px', '2xl': 'auto' }}
                    mb={{ base: '16px', lg: '32px' }}
                    variant={{ base: 's', lg: 'lm', '2xl': 'xl' }}
                    flexShrink={0}
                >
                    {title}
                </Heading>
                <Text
                    w={{ lg: '578px', '2xl': '668px' }}
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
                spacing={{ base: '12px', lg: '16px', '2xl': '24px' }}
            >
                {withoutImageCardData.map((cardData, idx) => (
                    <WithoutImageCard
                        key={idx}
                        title={cardData.title}
                        text={cardData.text}
                        badgeImage={cardData.badgeImage}
                        badgeText={cardData.badgeText}
                        bookmarkCount={cardData.bookmarkCount}
                        emojiCount={cardData.emojiCount}
                    />
                ))}
                <VStack spacing={{ base: '12px', md: '6px', lg: '12px' }}>
                    {withoutTextCardData.map((cardData, idx) => (
                        <WithoutTextCard key={idx} text={cardData.text} image={cardData.image} />
                    ))}
                </VStack>
            </Stack>
        </VStack>
    );
};
