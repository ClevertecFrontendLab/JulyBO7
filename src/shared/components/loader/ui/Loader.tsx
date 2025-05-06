import { HStack, Spinner } from '@chakra-ui/react';
import { FC } from 'react';

import { APP_LOADER } from '~/shared/constants/tests';

export const Loader: FC = () => (
    <HStack
        align='center'
        justify='center'
        w={{ base: '134px', md: '206px' }}
        h={{ base: '134px', md: '206px' }}
        bg='radial-gradient(50% 50% at 50% 50%, #c4ff61 0%, rgba(255, 255, 255, 0) 100%)'
    >
        <Spinner data-test-id={APP_LOADER} />
    </HStack>
);
