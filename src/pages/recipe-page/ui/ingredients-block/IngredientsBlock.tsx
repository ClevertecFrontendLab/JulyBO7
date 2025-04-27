import {
    Box,
    HStack,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import { Ingredient } from '~/shared/types/recipe';

type IngredientsBlockProps = {
    items: Ingredient[];
    portions: number;
};

export const IngredientsBlock: React.FC<IngredientsBlockProps> = ({ items, portions }) => {
    const [portionCount, setPortionCount] = useState(portions);
    const handleChangePortion = (count: string) => {
        setPortionCount(Number(count));
    };
    const ingredients = items.map((item, idx) => {
        const ingredientCount = (Number(item.count) / portions) * portionCount;

        const roundedCount = Math.round(ingredientCount * 10) / 10;

        const ingredientCountWithMeasureUnit =
            roundedCount === 0 ? '' : roundedCount + ' ' + item.measureUnit;
        return (
            <HStack
                key={idx}
                w='100%'
                h={{ base: '40px', lg: '52px' }}
                align='center'
                pr={{ base: '12px', md: '24px' }}
                pl={{ base: '8px', md: '24px' }}
                justifyContent='space-between'
                bg={idx % 2 ? 'inherit' : 'gray.300'}
                textStyle='md'
            >
                <Text>{item.title}</Text>
                <Text data-test-id={`ingredient-quantity-${idx}`} as='span' textStyle='s'>
                    {ingredientCountWithMeasureUnit}
                </Text>
            </HStack>
        );
    });

    return (
        <Box w={{ base: '100%', md: '604px', lg: '578px', '2xl': '668px' }}>
            <HStack
                w='100%'
                h='56px'
                color='lime.600'
                justify='space-between'
                textStyle='xs'
                fontWeight={700}
                pl={{ base: '8px', md: '24px' }}
            >
                <Text textTransform='uppercase'>Ингредиенты</Text>

                <HStack>
                    <Text textTransform='uppercase'>порций </Text>
                    <NumberInput
                        w={{ base: '73px', md: '90px' }}
                        h='40px'
                        value={portionCount}
                        onChange={handleChangePortion}
                        defaultValue={portions}
                        min={1}
                        color='primaryColor'
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper data-test-id='increment-stepper' />
                            <NumberDecrementStepper data-test-id='decrement-stepper' />
                        </NumberInputStepper>
                    </NumberInput>
                </HStack>
            </HStack>
            {ingredients}
        </Box>
    );
};
