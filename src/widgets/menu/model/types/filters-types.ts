import { FC, SVGProps } from 'react';

export enum MenuFilter {
    SALADS = 'Салаты',
    SNACKS = 'Закуски',
    FIRST_DISHES = 'Первые блюда',
    SECONDARY_DISHES = 'Вторые блюда',
    DESERTS = 'Десерты и выпечка',
    GRILL = 'Блюда на грилe',
    VEGAN = 'Веганские блюда',
    CHILDREN_DISHES = 'Детские блюда',
    MEDICAL_NUTRITION = 'Лечебное питание',
    NATIONAL_DISHES = 'Национальные блюда',
    SAUCES = 'Соусы',
    PROVISIONS = 'Заготовки',
    DRINKS = 'Напитки',
}

export type MenuFilterItem = {
    title: string;
    routePath: string;
};
export type MenuItemData = {
    items: MenuFilterItem[];
    Icon: FC<SVGProps<SVGSVGElement>>;
    title: MenuFilter;
    routePath: string;
};
