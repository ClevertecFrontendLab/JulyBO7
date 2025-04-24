import { Button, Stack, VStack } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router';

import { HorizontalCard } from '~/shared/components/card/ui/horizontal-card/HorizontalCard';
import { Page } from '~/shared/components/page/ui/Page';
import { PageFooter } from '~/shared/components/page-footer/PageFooter';
import { PageHeader } from '~/shared/components/page-header/PageHeader';
import { getFilteredRecipesByAllergens } from '~/shared/lib/getFilteredRecipesByAllergens';
import { getRecipeCardHandler } from '~/shared/lib/getRecipeCardHandler';
import { recipes } from '~/shared/recipes';

import { juiciestPageData } from '../model/mockData';

export const JuiciestPage: FC = () => {
    const navigate = useNavigate();
    const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);

    const filteredRecipes = getFilteredRecipesByAllergens(recipes, selectedAllergens);

    const handleAllergenChange = (value: string[]) => {
        setSelectedAllergens(value);
    };

    const cards = filteredRecipes.map((data, idx) => {
        const handleCook = getRecipeCardHandler(data, navigate);
        return (
            <HorizontalCard
                id={data.id}
                category={data.category[0]}
                key={idx}
                title={data.title}
                text={data.description}
                image={data.image}
                bookmarkCount={data.bookmarks}
                likesCount={data.likes}
                onCook={handleCook}
                // recomend={data.recomend}
            />
        );
    });

    return (
        <Page>
            <VStack align='center'>
                <PageHeader
                    title={juiciestPageData.headerPage.title}
                    onAllergenChange={handleAllergenChange}
                    selectedAllergens={selectedAllergens}
                />
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
