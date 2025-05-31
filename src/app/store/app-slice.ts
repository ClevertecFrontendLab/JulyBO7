import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AppState = typeof initialState;

const initialState = {
    isAuth: false,
    isInit: false,
    userId: '',
    login: '',
    successMessage: '',
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
        setUserId(state, action: PayloadAction<string>) {
            state.userId = action.payload;
        },
        setLogin(state, action: PayloadAction<string>) {
            state.login = action.payload;
        },
        setSuccessMessage(state, action: PayloadAction<string>) {
            state.successMessage = action.payload;
        },
    },
});

export const {
    setIsAuth: setIsAuthAction,
    setIsInit: setIsInitAction,
    setSuccessMessage: setSuccessMessageAction,
    setUserId: setUserIdAction,
    setLogin: setLoginAction,
} = appSlice.actions;
export default appSlice.reducer;
