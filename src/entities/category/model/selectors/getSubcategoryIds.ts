import { ApplicationState } from '~/app/store/configure-store';

export const getSubcategoryIds = (state: ApplicationState) => Object.keys(state.categories);
