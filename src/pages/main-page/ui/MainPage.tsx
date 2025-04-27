import { Button, Stack, VStack } from '@chakra-ui/react';
import { FC, ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { HorizontalCard } from '~/shared/components/card/ui/horizontal-card/HorizontalCard';
import { NewRecipesBlock } from '~/shared/components/new-recipes-block/ui/NewRecipesBlock';
import { Page } from '~/shared/components/page/ui/Page';
import { PageFooter } from '~/shared/components/page-footer/PageFooter';
import { PageHeader } from '~/shared/components/page-header/PageHeader';
import { getFilteredRecipesByAllergens } from '~/shared/lib/getFilteredRecipesByAllergens';
import { getFoundRecipesTitle } from '~/shared/lib/getFoundRecipeTitle';
import { getRecipeCardHandler } from '~/shared/lib/getRecipeCardHandler';
import { recipes } from '~/shared/recipes';
import { Recipe } from '~/shared/types/recipe';
import { selectAllergenFilter } from '~/widgets/drawer/model/selectors/selectAllergenFilter';

import { mainPageData } from '../model/mockData';
import { CulinaryBlogs } from './culinary-blogs/CulinaryBlogs';
import { JuisiestBlock } from './juisiest-block/JuisiestBlock';

export const MainPage: FC = () => {
    const [foundRecipes, setFoundRecipes] = useState<Recipe[]>();
    const [inputValue, setInputValue] = useState<string>('');
    const navigate = useNavigate();
    const allergens = useSelector(selectAllergenFilter);

    const filteredRecipesByAllergen = getFilteredRecipesByAllergens(recipes, allergens);

    const handleRecipeSearch = () => {
        const recipes = filteredRecipesByAllergen.filter((recip) => {
            const reg = new RegExp(inputValue, 'i');
            return recip.title.match(reg);
        });
        setFoundRecipes(recipes);
    };

    let cards;
    if (foundRecipes && foundRecipes.length > 0) {
        cards = foundRecipes.map((data, idx) => {
            let index;
            const reg = new RegExp(inputValue, 'i');
            const match = data.title.match(reg);
            if (match) {
                index = match['index'];
            }
            const updatedTitle: ReactElement = getFoundRecipesTitle(
                data.title,
                index!,
                inputValue.length,
            );
            const handleCook = getRecipeCardHandler(data, navigate);
            return (
                <HorizontalCard
                    id={data.id}
                    category={data.category[0]}
                    key={idx}
                    title={updatedTitle}
                    text={data.description}
                    image={data.image}
                    bookmarkCount={data.bookmarks}
                    likesCount={data.likes}
                    onCook={handleCook}
                />
            );
        });
    } else {
        cards = filteredRecipesByAllergen.map((data, idx) => {
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
                />
            );
        });
    }
    const handleInputChange = (value: string) => {
        setInputValue(value);
        if (!value) {
            setFoundRecipes([]);
        }
    };
    // const inputBorderStyle =
    //     foundRecipes?.length === 0 && inputValue.length !== 0 && '1px solid red';

    return (
        <Page>
            <VStack align='center'>
                <PageHeader
                    // inputBorderStyle={inputBorderStyle ? inputBorderStyle : ''}
                    title={mainPageData.headerPage.title}
                    onSearch={handleRecipeSearch}
                    inputValue={inputValue}
                    onChange={handleInputChange}
                />
                <VStack spacing={{ base: '32px', lg: '40px' }} w='100%'>
                    {/* {(recipes.length !== filteredRecipesByAllergen.length &&
                        !foundRecipes || length === 0) ||
                    (foundRecipes && foundRecipes.length > 0 && inputValue.length !== 0)  */}
                    {recipes.length !== filteredRecipesByAllergen.length ||
                    (foundRecipes && foundRecipes.length > 0 && inputValue.length !== 0) ? (
                        <>
                            <Stack
                                direction='row'
                                wrap='wrap'
                                columnGap={{ base: '16px', lg: '24px' }}
                                rowGap='16px'
                                mt='32px'
                            >
                                {cards}
                            </Stack>
                            <Button
                                variant='solid'
                                bg='lime.400'
                                size='l'
                                color='primaryColor'
                                mt='16px'
                            >
                                Загрузить еще
                            </Button>
                        </>
                    ) : (
                        <>
                            <NewRecipesBlock items={recipes} />
                            <JuisiestBlock />
                            <CulinaryBlogs />
                            <PageFooter
                                title={mainPageData.footerPage.title}
                                text={mainPageData.footerPage.text}
                                withoutImageCardData={mainPageData.footerPage.withoutImageCards}
                                withoutTextCardData={mainPageData.footerPage.withoutTextCards}
                            />
                        </>
                    )}
                </VStack>
            </VStack>
        </Page>
    );
};
