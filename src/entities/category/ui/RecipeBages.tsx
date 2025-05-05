import { BoxProps } from '@chakra-ui/react';
import { FC } from 'react';

import { useAppSelector } from '~/app/store/hooks';
import { Recipe } from '~/entities/recipe';
import { Badge, BadgeColor } from '~/shared/components/badge/ui/Badge';

type RecipeBagesProps = {
    onlyFirstCategory: boolean;
    recipe?: Recipe;
    badgeStyle?: BoxProps;
    badgeColor?: BadgeColor;
};

export const RecipeBages: FC<RecipeBagesProps> = ({
    recipe,
    onlyFirstCategory,
    badgeStyle,
    badgeColor,
}) => {
    const ids = useAppSelector((state) => state.categories);

    let badges;

    if (onlyFirstCategory && recipe) {
        const categoryData = ids[recipe?.categoriesIds[0]];
        badges = (
            <Badge
                categoryTitle={categoryData.categoryTitle}
                categoryIcon={categoryData.categoryIcon}
                style={badgeStyle}
                badgeColor={badgeColor}
            />
        );
    } else {
        const rootCategories: string[] = [];
        badges = recipe?.categoriesIds.map((subcatId, idx) => {
            const res = rootCategories.find((catId) => ids[subcatId].rootCategoryId === catId);
            console.log(
                'RecipeBages',
                'ids[subcatId].categoryTitle: ',
                ids[subcatId].categoryTitle,
            );
            if (!res) {
                rootCategories.push(ids[subcatId].rootCategoryId);
                return (
                    <Badge
                        key={idx}
                        categoryTitle={ids[subcatId].categoryTitle}
                        categoryIcon={ids[subcatId].categoryIcon}
                        style={badgeStyle}
                        badgeColor={badgeColor}
                    />
                );
            } else {
                return null;
            }
        });
    }

    return badges;
};
