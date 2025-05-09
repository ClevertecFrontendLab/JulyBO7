import { ApplicationState } from '~/app/store/configure-store';

export const selectCategoryFilter = (state: ApplicationState) => state.filters.category;
