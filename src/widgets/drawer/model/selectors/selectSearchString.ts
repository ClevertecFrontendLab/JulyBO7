import { ApplicationState } from '~/app/store/configure-store';

export const selectSearchString = (state: ApplicationState) => state.filters.searchString;
