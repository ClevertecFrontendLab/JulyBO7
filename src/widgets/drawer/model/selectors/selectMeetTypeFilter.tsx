import { ApplicationState } from '~/app/store/configure-store';

export const selectMeetTypeFilter = (state: ApplicationState) => state.filters.meetType;
