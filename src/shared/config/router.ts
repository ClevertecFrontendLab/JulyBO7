export enum AppRoutes {
    MAIN = 'main',
    THE_JUICIEST = 'the-juiciest',
    NOT_PAGE = 'not page',
}

export type RoutePaths = {
    [name in AppRoutes]: string;
};
export const routePaths: RoutePaths = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.THE_JUICIEST]: '/the-juiciest',
    [AppRoutes.NOT_PAGE]: '/*',
};
