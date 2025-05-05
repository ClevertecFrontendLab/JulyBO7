import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router';

import { useGetCategoriesQuery } from '~/entities/category';
import { HorizontalCard } from '~/shared/components/card/ui/horizontal-card/HorizontalCard';
import { FOOD_CARD } from '~/shared/constants/tests';
import { getFoundRecipesTitle } from '~/shared/lib/getFoundRecipeTitle';
import { getRecipeCardHandler } from '~/shared/lib/getRecipeCardHandler';
import { SubCategory } from '~/shared/types/categories';

import { Recipe } from '../../model/types/recipe';

type FoundRecipesCardsProps = {
    recipes: Recipe[];
    searchString: string;
};

export const FoundRecipesCards: React.FC<FoundRecipesCardsProps> = ({ recipes, searchString }) => {
    const navigate = useNavigate();
    const { data: categories } = useGetCategoriesQuery();

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
            )!;
            const category = categories.find(
                (category) => category._id === subcategory.rootCategoryId,
            )!;
            handleCook = getRecipeCardHandler(
                recipe,
                navigate,
                category,
                subcategory as SubCategory,
            );
        }
        return (
            <HorizontalCard
                data-test-id={`${FOOD_CARD}-${idx}`}
                key={idx}
                title={updatedTitle}
                onCook={handleCook}
                recipe={recipe}
            />
        );
    });

    return cards;
};
