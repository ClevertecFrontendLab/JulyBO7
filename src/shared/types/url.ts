export type BreadcrumbState = { title: string; path: string; category?: string };

export type UrlState = {
    breadcrumb: BreadcrumbState[];
    fromPath?: string;
};
