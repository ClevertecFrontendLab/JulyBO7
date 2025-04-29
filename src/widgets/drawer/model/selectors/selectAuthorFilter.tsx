import { ApplicationState } from '~/app/store/configure-store';

export const selectAuthorFilter = (state: ApplicationState) => state.filters.author;
