import { Box, Text } from '@chakra-ui/react';
import React from 'react';

type NutritionValueItemProps = {
    name: string;
    value: number;
    unit: string;
};

export const NutritionValueItem: React.FC<NutritionValueItemProps> = (props) => {
    const { name, value, unit } = props;
    return (
        <Box
            display={{ base: 'flex', md: 'block' }}
            alignItems='center'
            justifyContent='space-between'
            border='1px solid rgba(0, 0, 0, 0.08)'
            borderRadius='16px'
            p={{ base: '16px 12px', md: '16px' }}
            w={{ base: '100%', md: '173px', lg: '135px', '2xl': '149px' }}
            h={{ base: '64px', md: '136px' }}
        >
            <Text textStyle='s' color='gray.100' textAlign='center'>
                {name}
            </Text>

            <Text
                color='lime.800'
                fontWeight={500}
                fontSize={{ base: '24px', md: '36px' }}
                textAlign='center'
                width={{ base: '118px', md: 'auto' }}
                ml='auto'
            >
                {value}
            </Text>
            <Text
                fontSize={{ base: '12px', md: '14px' }}
                fontWeight={600}
                textTransform='uppercase'
                textAlign='center'
            >
                {unit}
            </Text>
        </Box>
    );
};
