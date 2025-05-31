import { Box, Stack, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { NutritionValue } from '~/entities/recipe';

import { CALORIES_NOTE } from '../../model/constants/recipePage';
import { NutritionValueItem } from './nutrition-value-item/NutritionValueItem';

export const NutritionValueBlock: FC<{ nutritionValue: NutritionValue }> = (props) => {
    const { protein, fats, carbohydrates, calories } = props.nutritionValue;
    return (
        <Box w={{ base: '100%', lg: '578px', '2xl': '668px' }}>
            <Text color='gray.250' mb={{ base: '12px', md: '20px' }}>
                {CALORIES_NOTE}
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} gap={{ base: '12px', '2xl': '24px' }}>
                <NutritionValueItem name='калорийность' value={calories} unit='ккал' />
                <NutritionValueItem name='белки' value={protein} unit='грамм' />
                <NutritionValueItem name='жиры' value={fats} unit='грамм' />
                <NutritionValueItem name='углеводы' value={carbohydrates} unit='грамм' />
            </Stack>
        </Box>
    );
};
