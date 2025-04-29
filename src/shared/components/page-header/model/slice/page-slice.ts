import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AppState = typeof initialState;

type InitialState = {
    allergens: string[];
};
const initialState: InitialState = {
    allergens: [],
};
export const pagesSlice = createSlice({
    name: 'pages',
    initialState,
    reducers: {
        setAllergen(state, action: PayloadAction<string>) {
            // state.allergen = [...state.allergen, action.payload];
            state.allergens.push(action.payload);
        },
        removeAllergen(state, action: PayloadAction<string>) {
            const index = state.allergens.findIndex((type) => type === action.payload);
            if (index !== -1) {
                state.allergens.splice(index, 1);
            }
        },
        removeAllAllergens(state) {
            state.allergens = [];
        },
    },
});

export const {
    setAllergen: setAllergenAction,
    removeAllergen: removeAllergenAction,
    removeAllAllergens: removeAllAllergensAction,
} = pagesSlice.actions;

export const pagesSliceReducer = pagesSlice.reducer;
