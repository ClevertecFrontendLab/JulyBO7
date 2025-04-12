import { Button, Stack, VStack } from '@chakra-ui/react';
import { FC } from 'react';

import { HorizontalCard } from '~/shared/components/card/ui/horizontal-card/HorizontalCard';
import { Page } from '~/shared/components/page/ui/Page';
import { PageFooter } from '~/shared/components/page-footer/PageFooter';
import { PageHeader } from '~/shared/components/page-header/PageHeader';

import { juiciestPageData } from '../model/mockData';

export const JuiciestPage: FC = () => {
    const cards = juiciestPageData.content.map((card, idx) => (
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
        <Page>
            <VStack align='center' mt='32px'>
                <PageHeader title={juiciestPageData.headerPage.title} />
            </VStack>
            <Stack
                direction='row'
                wrap='wrap'
                columnGap={{ base: '16px', lg: '24px' }}
                rowGap='16px'
                mt='32px'
            >
                {cards}
            </Stack>
            <VStack mt='16px' align='center'>
                <Button variant='solid' bg='lime.400' size='l' color='primaryColor'>
                    Загрузить еще
                </Button>
            </VStack>

            <PageFooter
                title={juiciestPageData.footerPage.title}
                text={juiciestPageData.footerPage.text}
                withoutImageCardData={juiciestPageData.footerPage.withoutImageCards}
                withoutTextCardData={juiciestPageData.footerPage.withoutTextCards}
            />
        </Page>
    );
};
