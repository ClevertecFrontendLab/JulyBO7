import { Box, Heading, Image, Link as ChakraLink, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router';

import not_found from '~/shared/assets/images/not-found.png';
import { AppRoutes, routePaths } from '~/shared/config/router';
import { ERROR_PAGE_GO_HOME } from '~/shared/constants/tests';

import { ERROR_HEADING, ERROR_TEXT } from '../model/constants/pageText';

export const ErrorPage: FC = () => (
    <VStack alignItems='center' justify='center' h='100%' gap='32px'>
        <Image src={not_found} h={{ base: '108px', lg: '206px' }} />
        <Box w={{ base: '252px', lg: '332px' }}>
            <Heading as='h1' fontSize='24px' fontWeight='700' textAlign='center' mb='16px'>
                {ERROR_HEADING}
            </Heading>
            <Text fontSize='16px' fontWeight='400' color='gray.150' textAlign='center'>
                {ERROR_TEXT}
                <ChakraLink
                    data-test-id={ERROR_PAGE_GO_HOME}
                    as={Link}
                    textDecoration='underline'
                    to={routePaths[AppRoutes.MAIN]}
                >
                    {' здесь.'}
                </ChakraLink>
            </Text>
        </Box>
    </VStack>
);
