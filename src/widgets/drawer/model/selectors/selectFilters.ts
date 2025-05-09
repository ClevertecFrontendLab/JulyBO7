import { ApplicationState } from '~/app/store/configure-store';

export const selectFilters = (state: ApplicationState) => state.filters;
