export enum AppRoutes {
    MAIN = 'main',
    THE_JUICIEST = 'the-juiciest',
    LOGIN = 'login',
    SIGNUP = 'signup',
    NOT_FOUND = 'not-found',
    VERIFICATION = 'verification',
    NEW_RECIPE = 'new-recipe',
}

export type RoutePaths = {
    [name in AppRoutes]: string;
};
export const routePaths: RoutePaths = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.THE_JUICIEST]: '/the-juiciest',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.SIGNUP]: '/signup',
    [AppRoutes.VERIFICATION]: '/verification',
    [AppRoutes.NEW_RECIPE]: '/new-recipe',

    [AppRoutes.NOT_FOUND]: '/not-found',
};
