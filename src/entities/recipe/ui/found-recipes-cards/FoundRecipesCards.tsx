import React, { ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { useAppSelector } from '~/app/store/hooks';
import { useGetCategoriesQuery } from '~/entities/category';
import { HorizontalCard } from '~/shared/components/card/ui/horizontal-card/HorizontalCard';
import { FOOD_CARD } from '~/shared/constants/tests';
import { getFoundRecipesTitle } from '~/shared/lib/getFoundRecipeTitle';
import { getRecipeCardHandler } from '~/shared/lib/getRecipeCardHandler';
import { SubCategory } from '~/shared/types/categories';

import { Recipe } from '../../model/types/recipe';

type FoundRecipesCardsProps = {
    recipes: Recipe[];
};

export const FoundRecipesCards: React.FC<FoundRecipesCardsProps> = ({ recipes }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { data: categories } = useGetCategoriesQuery();
    const searchString = useAppSelector((state) => state.filters.searchString);

    const cards = recipes.map((recipe, idx) => {
        let index;
        const reg = new RegExp(searchString, 'i');
        const match = recipe.title.match(reg);
        if (match) {
            index = match['index'];
        }
        const updatedTitle: ReactElement = getFoundRecipesTitle(
            recipe.title,
            index!,
            searchString.length,
        );
        let handleCook;
        if (categories) {
            const subcategory = categories.find(
                (category) => category._id === recipe.categoriesIds[0],
            );
            const category = categories.find(
                (category) => category._id === subcategory?.rootCategoryId,
            );
            if (category) {
                handleCook = getRecipeCardHandler(
                    recipe,
                    navigate,
                    category,
                    subcategory as SubCategory,
                    pathname,
                );
            }
        }
        return (
            <HorizontalCard
                data-test-id={`${FOOD_CARD}-${idx}`}
                key={idx}
                title={updatedTitle}
                onCook={handleCook}
                recipe={recipe}
                categories={categories}
            />
        );
    });

    return cards;
};
