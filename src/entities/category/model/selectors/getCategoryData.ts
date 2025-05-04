import { ApplicationState } from '~/app/store/configure-store';

export const getCategoryData = (path: string) => {
    const categoryFromPath = path.split('/')[1];
    return (state: ApplicationState) => {
        const categoryData = state.categories.categoriesData.find(
            (data) => data.category === categoryFromPath,
        );
        return categoryData;
    };
};
