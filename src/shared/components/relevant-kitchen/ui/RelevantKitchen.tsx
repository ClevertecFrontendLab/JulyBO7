import { Heading, Stack, Text, VStack } from '@chakra-ui/react';
import { memo, useMemo, useState } from 'react';

import { useGetCategoriesQuery } from '~/entities/category';
import { useGetCategoryRecipesQuery } from '~/entities/recipe';
import { WithoutImageCard } from '~/shared/components/card/ui/without-image-card/WithoutImageCard';
import { ERROR_MESSAGE } from '~/shared/constants/commonErrorMessages';
import { IMAGE_API } from '~/shared/constants/imageApi';

import { Alert } from '../../alert';
import { WithoutTextCard } from '../../card/ui/without-text-card/WithoutTextCard';
import { getRandomId } from '../model/lib/getRandomId';

type RelevantKitchenProps = Partial<{ category: string }>;

export const RelevantKitchen = memo<RelevantKitchenProps>((props) => {
    const { category } = props;
    const { data: categories } = useGetCategoriesQuery();
    const [errorMessage, setErrorMessage] = useState('');

    const limit = 5;

    const { randomSubcategoryId, randomCategoryId } = useMemo(
        () => getRandomId(categories),
        [categories, category],
    );

    const { data: randomSubcategoryRecipes, error: getCategoryRecipesError } =
        useGetCategoryRecipesQuery(
            {
                categoryId: randomSubcategoryId,
                limit,
            },
            { skip: !randomSubcategoryId && !categories },
        );

    const randomCategory = Array.isArray(categories)
        ? categories.find((category) => category._id === randomCategoryId)
        : undefined;

    if (getCategoryRecipesError && !errorMessage) {
        setErrorMessage(ERROR_MESSAGE);
    }

    return (
        <VStack
            as='section'
            w='100%'
            spacing={{ base: '16px', lg: '24px' }}
            pt={{ base: '8px', lg: '24px' }}
            borderTop='1px solid rgba(0, 0, 0, 0.08)'
            mb={{ base: '16px', lg: '0' }}
            mt={{ base: '32px', lg: '40px' }}
        >
            <Stack
                w='100%'
                direction={{ base: 'column', lg: 'row' }}
                justify='space-between'
                gap={{ lg: '12px' }}
            >
                <Heading
                    mb={{ base: '16px', lg: '32px' }}
                    variant={{ base: 's', lg: 'lm', '2xl': 'xl' }}
                    flexShrink={0}
                >
                    {randomCategory?.title}
                </Heading>
                <Text
                    w={{ lg: '578px', '2xl': '668px' }}
                    color='gray.100'
                    textStyle={{ base: 's', lg: 'm' }}
                    mb={{ base: '16px', lg: '32px' }}
                >
                    {randomCategory?.description}
                </Text>
            </Stack>
            <Stack
                direction={{ base: 'column', md: 'row' }}
                w='100%'
                spacing={{ base: '12px', lg: '16px', '2xl': '24px' }}
            >
                {randomSubcategoryRecipes?.data
                    .slice(0, 2)
                    .map((recipe, idx) =>
                        categories ? (
                            <WithoutImageCard categories={categories} key={idx} recipe={recipe} />
                        ) : null,
                    )}
                <VStack spacing={{ base: '12px', md: '6px', lg: '12px' }}>
                    {randomSubcategoryRecipes?.data
                        .slice(2, 5)
                        .map((recipe, idx) => (
                            <WithoutTextCard
                                key={idx}
                                text={recipe.title}
                                image={`${IMAGE_API}${randomCategory?.icon}`}
                            />
                        ))}
                </VStack>
            </Stack>
            {errorMessage && (
                <Alert onClose={() => setErrorMessage('')} title={errorMessage} type='error' />
            )}
        </VStack>
    );
});
