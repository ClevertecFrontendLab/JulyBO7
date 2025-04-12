export enum MenuFilter {
    SALADS = 'Салаты',
    SNACKS = 'Закуски',
    FIRST_DISHES = 'Первые блюда',
    SECONDARY_DISHES = 'Вторые блюда',
    DESERTS = 'Десерты, выпечка',
    GRILL = 'Блюда на грилe',
    VEGAN = 'Веганские блюда',
    CHILDREN_DISHES = 'Детские блюда',
    MEDICAL_NUTRITION = 'Лечебное питание',
    NATIONAL_DISHES = 'Национальные',
    SAUCES = 'Соусы',
    PROVISIONS = 'Заготовки',
    DRINKS = 'Напитки',
}

export type SubMenuItem = {
    title: string;
    routePath: string;
};
export type MenuItemData = {
    items: SubMenuItem[];
    icon: string;
    title: MenuFilter;
    routePath: string;
};
