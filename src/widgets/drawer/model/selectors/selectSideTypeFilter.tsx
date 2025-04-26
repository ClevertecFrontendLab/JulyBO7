import { ApplicationState } from '~/app/store/configure-store';

export const selectSideTypeFilter = (state: ApplicationState) => state.filters.sideType;
