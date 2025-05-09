import { HStack } from '@chakra-ui/react';
import { FC } from 'react';

import { APP_LOADER } from '~/shared/constants/tests';

import { Loader } from '../Loader';

export const AppLoader: FC = () => (
    <HStack
        align='center'
        justify='center'
        position='fixed'
        bottom={0}
        top={0}
        right={0}
        left={0}
        zIndex={10000}
        backdropFilter='blur(4px)'
        bg='rgba(0, 0, 0, 0.16)'
    >
        <Loader data-test-id={APP_LOADER} />
    </HStack>
);
