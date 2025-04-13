import { useCallback, useMemo } from 'react';
import { Route, Routes } from 'react-router';

import { RouteConfig, routeConfig } from '~/shared/config/route-config/router';

export const AppRouter = () => {
    console.log('AppRouter');
    const getRouteElements = useCallback(
        (route: RouteConfig) => (
            <Route key={route.path} path={route.path} element={route.element}>
                {route.childrenRoutes?.map((childrenRoute, idx) => (
                    <Route
                        path={childrenRoute.path}
                        index={childrenRoute.index}
                        key={idx}
                        element={childrenRoute.element}
                    />
                ))}
            </Route>
        ),
        [],
    );

    const routes = useMemo(() => routeConfig.map(getRouteElements), [getRouteElements]);
    console.log('AppRouter : ', routes);

    return <Routes>{routes}</Routes>;
};
