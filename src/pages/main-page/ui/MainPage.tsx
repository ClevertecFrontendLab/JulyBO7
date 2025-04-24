import { Stack, VStack } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router';

import { HorizontalCard } from '~/shared/components/card/ui/horizontal-card/HorizontalCard';
import { NewRecipesBlock } from '~/shared/components/new-recipes-block/ui/NewRecipesBlock';
import { Page } from '~/shared/components/page/ui/Page';
import { PageFooter } from '~/shared/components/page-footer/PageFooter';
import { PageHeader } from '~/shared/components/page-header/PageHeader';
import { getFilteredRecipesByAllergens } from '~/shared/lib/getFilteredRecipesByAllergens';
import { getRecipeCardHandler } from '~/shared/lib/getRecipeCardHandler';
import { recipes } from '~/shared/recipes';

import { mainPageData } from '../model/mockData';
import { CulinaryBlogs } from './culinary-blogs/CulinaryBlogs';
import { JuisiestBlock } from './juisiest-block/JuisiestBlock';

export const MainPage: FC = () => {
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
                    title={mainPageData.headerPage.title}
                    selectedAllergens={selectedAllergens}
                    onAllergenChange={handleAllergenChange}
                />
                <VStack spacing={{ base: '32px', lg: '40px' }} w='100%'>
                    {recipes.length !== filteredRecipes.length ? (
                        <Stack
                            direction='row'
                            wrap='wrap'
                            columnGap={{ base: '16px', lg: '24px' }}
                            rowGap='16px'
                            mt='32px'
                        >
                            {cards}
                        </Stack>
                    ) : (
                        <>
                            <NewRecipesBlock items={recipes} />
                            <JuisiestBlock />
                        </>
                    )}
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
};
