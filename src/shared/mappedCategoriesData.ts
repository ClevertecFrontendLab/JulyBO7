import eggplant from './assets/images/eggplant.png';
import child from './assets/images/icons/icons8-child-tasty.png';
import frying from './assets/images/icons/icons8-frying-pan.png';
import international from './assets/images/icons/icons8-international-food.png';
import snacks from './assets/images/icons/mortar.png';
import { Category, SubCategory } from './types/categories';

type SubcategoryData = {
    [name in SubCategory]: { title: string };
};
export type CategoryData = {
    image: string;
    defaultPath: string;
    title: string;
    subcategory?: SubCategory[];
    subcategoryData?: Partial<SubcategoryData>;
};
type MappedCategoryData = {
    [name in Category]: Partial<CategoryData>; // partial - из-за незаполненных данных
};

export const mappedCategoryData: MappedCategoryData = {
    ['vegan']: {
        image: eggplant,
        title: 'Веганская кухня',
        defaultPath: '/vegan/snacks',
        subcategory: [
            'snacks',
            'second-dish',
            'first-dish',
            'side-dishes',
            'deserts',
            'bakery',
            'vegetables',
            'drinks',
        ],
        subcategoryData: {
            ['snacks']: { title: 'Закуски' },
            ['second-dish']: { title: 'Вторые блюда' },
            ['first-dish']: { title: 'Первые блюда' },
            ['side-dishes']: { title: 'Гарниры' },
            ['deserts']: { title: 'Десерты' },
            ['bakery']: { title: 'Выпечка' },
            ['vegetables']: { title: 'Сыроедческие блюда' },
            ['drinks']: { title: 'Напитки' },
        },
    },
    ['second-dish']: {
        image: frying,
        title: 'Вторые блюда',
        defaultPath: '/second-dish/meet',
        subcategory: [
            'meet',
            'fish',
            'vegetables',
            'poultry-dish',
            'mashroom',
            'offal',
            'steamed-dishes',
            'dumplings',
            'flour-side-dishes',
            'vegetable-garnish',
            'pizza',
            'sushi',
        ],
        subcategoryData: {
            ['meet']: { title: 'Мясные' },
            ['fish']: { title: 'Рыбные' },
            ['vegetables']: { title: 'Овощные' },
            ['poultry-dish']: { title: 'Из птицы' },
            ['mashroom']: { title: 'Из грибов' },
            ['steamed-dishes']: { title: 'На пару' },
            ['dumplings']: { title: 'Пельмени, вареники' },
            ['flour-side-dishes']: { title: 'Мучные гарниры' },
            ['vegetable-garnish']: { title: 'Овощные гарниры' },
            ['pizza']: { title: 'Пицца' },
            ['sushi']: { title: 'Суши' },
        },
    },
    ['snacks']: {
        image: snacks,
        title: 'Закуски',
    },
    ['children-dish']: {
        image: child,
        title: 'Детские блюда',
    },
    ['national']: {
        image: international,
        title: 'Национальные',
    },
};
