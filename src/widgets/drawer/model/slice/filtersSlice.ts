import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AppState = typeof initialState;

type InitialState = {
    allergen: string[];
    meetType: string[];
    sideType: string[];
    category: string[];
    author: string[];
};
const initialState: InitialState = {
    ['allergen']: [],
    meetType: [],
    sideType: [],
    category: [],
    author: [],
};
export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setAllergen(state, action: PayloadAction<string>) {
            // state.allergen = [...state.allergen, action.payload];
            state.allergen.push(action.payload);
        },
        removeAllergen(state, action: PayloadAction<string>) {
            const index = state.allergen.findIndex((type) => type === action.payload);
            if (index !== -1) {
                state.allergen.splice(index, 1);
            }
        },
        removeAllAllergens(state) {
            // state.allergen.splice(0, state.allergen.length);
            state.allergen = [];
        },
        setMeetType(state, action: PayloadAction<string>) {
            // state.meetType = [...state.meetType, action.payload];
            state.meetType.push(action.payload);
        },
        removeMeetType(state, action: PayloadAction<string>) {
            const index = state.meetType.findIndex((type) => type === action.payload);
            if (index !== -1) {
                state.meetType.splice(index, 1);
            }
        },
        setSideType(state, action: PayloadAction<string>) {
            // state.sideType = [...state.sideType, action.payload];
            state.sideType.push(action.payload);
        },
        removeSideType(state, action: PayloadAction<string>) {
            const index = state.sideType.findIndex((type) => type === action.payload);
            if (index !== -1) {
                state.sideType.splice(index, 1);
            }
        },
        setCategory(state, action: PayloadAction<string>) {
            // state.category = [...state.category, action.payload];
            state.category.push(action.payload);
        },
        removeCategory(state, action: PayloadAction<string>) {
            const index = state.category.findIndex((type) => type === action.payload);
            if (index !== -1) {
                state.category.splice(index, 1);
            }
        },
        setAuthor(state, action: PayloadAction<string>) {
            // state.author = [...state.author, action.payload];
            state.author.push(action.payload);
        },
        removeAuthor(state, action: PayloadAction<string>) {
            const index = state.author.findIndex((type) => type === action.payload);
            if (index !== -1) {
                state.author.splice(index, 1);
            }
        },
        removeAllFilters(state) {
            state.allergen = [];
            state.author = [];
            state.category = [];
            state.meetType = [];
            state.sideType = [];
        },
    },
});

export const {
    setAllergen: setAllergenAction,
    setCategory: setCategoryAction,
    setMeetType: setMeetTypeAction,
    setSideType: setSideTypeAction,
    setAuthor: setAuthorAction,
    removeMeetType: removeMeetTypeAction,
    removeSideType: removeSideTypeAction,
    removeCategory: removeCategoryAction,
    removeAllAllergens: removeAllAllergensAction,
    removeAllergen: removeAllergenAction,
    removeAllFilters: removeAllFiltersAction,
    removeAuthor: removeAuthorAction,
} = filtersSlice.actions;

export const filterSliceReducer = filtersSlice.reducer;
