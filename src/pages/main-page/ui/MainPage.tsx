import { VStack } from '@chakra-ui/react';
import { FC } from 'react';

import { NewRecipesBlock } from '~/shared/components/new-recipes-block/ui/NewRecipesBlock';
import { Page } from '~/shared/components/page/ui/Page';
import { PageFooter } from '~/shared/components/page-footer/PageFooter';
import { PageHeader } from '~/shared/components/page-header/PageHeader';
import { recipes } from '~/shared/recipes';

import { mainPageData } from '../model/mockData';
import { CulinaryBlogs } from './culinary-blogs/CulinaryBlogs';
import { JuisiestBlock } from './juisiest-block/JuisiestBlock';

export const MainPage: FC = () => (
    <Page>
        <VStack align='center'>
            <PageHeader title={mainPageData.headerPage.title} />
            <VStack spacing={{ base: '32px', lg: '40px' }} w='100%'>
                <NewRecipesBlock items={recipes} />
                <JuisiestBlock />
                <CulinaryBlogs />

                <PageFooter
                    title={mainPageData.footerPage.title}
                    text={mainPageData.footerPage.text}
                    withoutImageCardData={mainPageData.footerPage.withoutImageCards}
                    withoutTextCardData={mainPageData.footerPage.withoutTextCards}
                />
            </VStack>
        </VStack>
    </Page>
);
