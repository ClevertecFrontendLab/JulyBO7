import { BoxProps } from '@chakra-ui/react';
import { FC } from 'react';

import { Recipe } from '~/entities/recipe';
import { Badge, BadgeColor } from '~/shared/components/badge/ui/Badge';
import { Category } from '~/shared/types/categories';

type RecipeBagesProps = {
    onlyFirstCategory: boolean;
    recipe: Recipe;
    categories: Category[];
    badgeStyle?: BoxProps;
    badgeColor?: BadgeColor;
};

export const RecipeBages: FC<RecipeBagesProps> = ({
    recipe,
    categories,
    onlyFirstCategory,
    badgeStyle,
    badgeColor,
}) => {
    let badges;
    let categoryData;

    function getCategoryData(subcategoryId: string) {
        const subcategory = categories.find((subcategory) => subcategory._id === subcategoryId);
        const category = categories.find(
            (category) => category._id === subcategory?.rootCategoryId,
        );
        return category;
    }
    if (onlyFirstCategory) {
        categoryData = getCategoryData(recipe.categoriesIds[0]);
        badges = (
            <Badge
                categoryTitle={categoryData?.title}
                categoryIcon={categoryData?.icon}
                style={badgeStyle}
                badgeColor={badgeColor}
            />
        );
    } else {
        const categoriesData = recipe.categoriesIds.map(getCategoryData);
        badges = categoriesData.map((category, idx) => (
            <Badge
                key={idx}
                categoryTitle={category?.title}
                categoryIcon={category?.icon}
                style={badgeStyle}
                badgeColor={badgeColor}
            />
        ));
    }

    return badges;
};
