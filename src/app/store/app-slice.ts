import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AppState = typeof initialState;

const initialState = {
    isAuth: false,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
        },
    },
});

export const { setIsAuth: setIsAuthAction } = appSlice.actions;
export default appSlice.reducer;
