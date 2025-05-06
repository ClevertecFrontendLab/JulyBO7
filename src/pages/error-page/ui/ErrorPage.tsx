import { Box, Image, Link as ChakraLink, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router';

import not_found from '~/shared/assets/images/not-found.png';
import { AppRoutes, routePaths } from '~/shared/config/router';

export const ErrorPage: FC = () => (
    <VStack alignItems='center' justify='center' h='100%' gap='32px'>
        <Image src={not_found} h={{ base: '108px', lg: '206px' }} />
        <Box w={{ base: '252px', lg: '332px' }}>
            <Text fontSize='24px' fontWeight='700' textAlign='center' mb='16px'>
                Упс! Такой страницы нет
            </Text>
            <Text fontSize='16px' fontWeight='400' color='gray.150' textAlign='center'>
                Можете поискать другой рецепт
                <ChakraLink
                    as={Link}
                    textDecoration='underline'
                    data-test-id='error-page-go-home'
                    to={routePaths[AppRoutes.MAIN]}
                >
                    {' здесь.'}
                </ChakraLink>
            </Text>
        </Box>
    </VStack>
);
