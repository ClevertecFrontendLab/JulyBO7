import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IMAGE_API } from '~/shared/constants/imageApi';
import { Category } from '~/shared/types/categories';

type InitialState = {
    [subcategoryId: string]: {
        rootCategoryId: string;
        categoryTitle: string;
        categoryIcon: string;
    };
};
const initialState: InitialState = {};

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        // setCategories(state, action: PayloadAction<Category[]>) {
        //     action.payload.forEach((category) => {
        //         const newSubcat = category.subCategories.map((subcat) => ({
        //             ...subcat,
        //             path: `/${category.category}/${subcat.category}`,
        //         }));
        //         const newObj = {
        //             ...category,
        //             path: `/${category.category}/${category.subCategories[0].category}`,
        //             subCategories: newSubcat,
        //         };
        //         state.categoriesData.push(newObj);
        //     });
        // },
        setIds(state, action: PayloadAction<Category[]>) {
            action.payload.forEach((category) => {
                category.subCategories.forEach((subcat) => {
                    state[subcat._id] = {
                        rootCategoryId: category._id,
                        categoryTitle: category.title,
                        categoryIcon: `${IMAGE_API}${category.icon}`,
                    };
                });
            });
        },
    },
});

export const { setIds: setIdsAction } = categoriesSlice.actions;

export const categoriesSliceReducer = categoriesSlice.reducer;
