import { Box, useMediaQuery } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router';

import cls from './AppLayout.module.scss';

type AppLayoutProps = Partial<{
    header: ReactNode;
    menu: ReactNode;
    footer: ReactNode;
    sidebar: ReactNode;
    children: ReactNode;
}>;

export const AppLayout: FC<AppLayoutProps> = (props) => {
    const { header, menu, footer, sidebar, children } = props;

    const [isSmallerThan1440] = useMediaQuery('(max-width: 1400px)');

    return (
        <>
            {!!header && header}
            <Box
                display='flex'
                className={header ? cls.wrapperHeightWithHeader : cls.wrapperHeight}
            >
                {!!menu && menu}
                {children ? children : <Outlet />}
                {!!sidebar && sidebar}
            </Box>
            {!!footer && isSmallerThan1440 && footer}
        </>
    );
};
