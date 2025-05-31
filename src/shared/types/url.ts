export type BreadcrumbState = { title: string; path: string; category?: string };

export type UrlState<T = unknown> = {
    breadcrumb: BreadcrumbState[];
    fromPath?: string;
    additionalState?: T;
};
