import { Box } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router';

import cls from './AppLayout.module.scss';

type AppLayoutProps = {
    header?: ReactNode;
    menu?: ReactNode;
    footer?: ReactNode;
    sidebar?: ReactNode;
    children?: ReactNode;
};

export const AppLayout: FC<AppLayoutProps> = (props) => {
    const { header, menu, footer, sidebar, children } = props;
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
            {!!footer && footer}
        </>
    );
};
