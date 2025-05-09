import { HStack, Spinner, SpinnerProps } from '@chakra-ui/react';
import { FC } from 'react';

import { APP_LOADER } from '~/shared/constants/tests';

type LoaderProps = Partial<
    {
        width: string;
        height: string;
    } & SpinnerProps
>;

export const Loader: FC<LoaderProps> = ({ width, height, ...rest }) => (
    <HStack
        align='center'
        justify='center'
        w={width ? width : { base: '134px', md: '206px' }}
        h={height ? height : { base: '134px', md: '206px' }}
        bg='radial-gradient(50% 50% at 50% 50%, #c4ff61 0%, rgba(255, 255, 255, 0) 100%)'
    >
        <Spinner data-test-id={APP_LOADER} {...rest} />
    </HStack>
);
