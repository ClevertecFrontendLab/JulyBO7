import { useCallback, useMemo } from 'react';
import { Route, RouteProps, Routes } from 'react-router';

import { routeConfig } from '~/shared/config/route-config/router';

export const AppRouter = () => {
    const getRouteElements = useCallback(
        (route: RouteProps) => <Route key={route.path} path={route.path} element={route.element} />,
        [],
    );

    const routes = useMemo(() => routeConfig.map(getRouteElements), [getRouteElements]);

    return <Routes>{routes}</Routes>;
};
