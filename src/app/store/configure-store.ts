import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { apiSlice } from '~/shared/api';
import { filterSliceReducer } from '~/widgets/drawer';

import appReducer, { appSlice } from './app-slice';

const isProduction = false;

const rootReducer = combineReducers({
    [appSlice.name]: appReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    filters: filterSliceReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: !isProduction,
});
