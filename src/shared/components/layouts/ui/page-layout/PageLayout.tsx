import { Box, BoxProps } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

type PageLayoutProps = {
    children: ReactNode;
} & BoxProps;

export const PageLayout: FC<PageLayoutProps> = (props) => {
    const { children, ...rest } = props;

    return (
        <Box
            as='main'
            height='100%'
            mt={{ base: '64px', lg: '80px' }}
            mb={{ base: '84px', lg: 0 }}
            pl={{ base: '16px', md: '20px', lg: '280px' }}
            pr={{ base: '16px', md: '20px', lg: '280px' }}
            width={{ base: '360px', md: '768px', lg: '1440px', '2xl': '1920px' }}
            {...rest}
        >
            {children}
        </Box>
    );
};
