import { ApplicationState } from '~/app/store/configure-store';

import { getCategoryData } from './getCategoryData';

export const getSubcategoryData = (path: string) => {
    const subcategoryFromPath = path.split('/')[2];
    return (state: ApplicationState) => {
        const categoryData = getCategoryData(path)(state);

        const subcategoryData = categoryData?.subCategories.find(
            (subcatdata) => subcatdata.category === subcategoryFromPath,
        );
        return subcategoryData;
    };
};
