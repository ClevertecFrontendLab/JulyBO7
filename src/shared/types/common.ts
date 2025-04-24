import { Recipe } from './recipe';

export type OutletContext = {
    recipes: Recipe[];
    allergenFilter: string[];
};
