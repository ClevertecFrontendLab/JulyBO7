import { Badge, Box, Image, Text } from '@chakra-ui/react';
import React from 'react';

import { Step } from '~/shared/types/recipe';

type CookingStepsProps = {
    steps: Step[];
};

export const CookingSteps: React.FC<CookingStepsProps> = ({ steps }) => (
    <Box w={{ base: '100%', md: '604px', lg: '578px', '2xl': '668px' }}>
        {steps.map((step, idx) => (
            <Box
                key={idx}
                display={step.image ? 'flex' : 'block'}
                maxH={{ base: '128px', lg: '244px' }}
                mt='20px'
                w='100%'
                border='1px solid rgba(0, 0, 0, 0.08)'
                borderRadius='8px'
            >
                {step.image && (
                    <Image
                        src={step.image}
                        w={{ base: '158px', lg: '346px' }}
                        h={{ base: '128px', lg: '244px' }}
                        borderBottomLeftRadius='8px'
                        borderTopLeftRadius='8px'
                    />
                )}
                <Box p={{ base: '8px 8px 4px 8px', lg: '20px 24px' }} overflow='hidden'>
                    <Badge
                        borderRadius='4px'
                        p='2px 8px'
                        bg={idx === steps.length - 1 ? 'lime.50' : 'gray.300'}
                        mb={{ base: '12px', lg: '16px' }}
                        fontWeight={400}
                        fontSize='s'
                        textTransform='initial'
                    >
                        Шаг {step.stepNumber}
                    </Badge>
                    <Text textStyle='s'>{step.description}</Text>
                </Box>
            </Box>
        ))}
    </Box>
);
