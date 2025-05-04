import { ApplicationState } from '~/app/store/configure-store';

export const getAllCategoriesData = (state: ApplicationState) => state.categories.categoriesData;
