import { ApplicationState } from '~/app/store/configure-store';

export const selectAllergenFilter = (state: ApplicationState) => state.filters.allergen;
