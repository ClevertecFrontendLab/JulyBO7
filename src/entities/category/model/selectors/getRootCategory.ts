import { ApplicationState } from '~/app/store/configure-store';

export const getRootCategory = (subcategoryId: string) => (state: ApplicationState) =>
    state.categories[subcategoryId];
