import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApplicationState } from './configure-store';
export type AppState = typeof initialState;

const initialState = {
    isLoading: false,
    error: '' as string | null,
    succesMessage: '' as string | null,
};
export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
        removeAppError(state) {
            state.error = '';
        },
        setSuccessMessage(state, action: PayloadAction<string | null>) {
            state.succesMessage = action.payload;
        },

        setAppLoader(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.isLoading = isLoading;
        },
    },
});
export const userLoadingSelector = (state: ApplicationState) => state.app.isLoading;
export const userErrorSelector = (state: ApplicationState) => state.app.error;

export const { setAppError, removeAppError, setAppLoader, setSuccessMessage } = appSlice.actions;
export default appSlice.reducer;
