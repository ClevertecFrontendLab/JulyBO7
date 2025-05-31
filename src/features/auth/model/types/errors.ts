export type ApiError = {
    message: string | string[];
    error: string;
    statusCode: number;
};
export type AuthErrorMessage = {
    title: string;
    description?: string;
};
export type AuthResponse = {
    statusText: string;
    message: string;
    decodedToken?: { userId: string; login: string };
};
