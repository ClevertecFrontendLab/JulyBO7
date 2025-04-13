import { Button, Stack, VStack } from '@chakra-ui/react';
import { FC } from 'react';

import { HorizontalCard } from '~/shared/components/card/ui/horizontal-card/HorizontalCard';
import { Page } from '~/shared/components/page/ui/Page';
import { PageFooter } from '~/shared/components/page-footer/PageFooter';
import { PageHeader } from '~/shared/components/page-header/PageHeader';

import { juiciestPageData } from '../model/mockData';

export const JuiciestPage: FC = () => {
    const cards = juiciestPageData.content.map((data, idx) => (
        <HorizontalCard
            key={idx}
            title={data.title}
            text={data.text}
            badgeImage={data.badgeImage}
            badgeText={data.badgeText}
            image={data.image}
            bookmarkCount={data.bookmarkCount}
            emojiCount={data.emojiCount}
            recomend={data.recomend}
        />
    ));

    return (
        <Page>
            <VStack align='center'>
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
