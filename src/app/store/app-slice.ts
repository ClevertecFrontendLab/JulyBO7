import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AppState = typeof initialState;

const initialState = {
    isAuth: false,
    isInit: false,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
        },
        setIsInit(state, action: PayloadAction<boolean>) {
            state.isInit = action.payload;
        },
    },
});

export const { setIsAuth: setIsAuthAction, setIsInit: setIsInitAction } = appSlice.actions;
export default appSlice.reducer;
