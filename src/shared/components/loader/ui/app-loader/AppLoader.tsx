import { HStack } from '@chakra-ui/react';
import { FC } from 'react';

import { Loader } from '../Loader';

export const AppLoader: FC = () => (
    <HStack
        align='center'
        justify='center'
        position='absolute'
        bottom={0}
        top={0}
        right={0}
        left={0}
        zIndex={10000}
        backdropFilter='blur(4px)'
        bg='rgba(0, 0, 0, 0.16)'
    >
        <Loader />
    </HStack>
);
