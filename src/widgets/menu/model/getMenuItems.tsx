import BayLeaf from '~/shared/assets/icons/components/MenuItemBayLeaf';
import BreadAndRollingPin from '~/shared/assets/icons/components/MenuItemBreadAndRollingPin';
import ChildTasty from '~/shared/assets/icons/components/MenuItemChildTasty';
import Grill from '~/shared/assets/icons/components/MenuItemDishwasher';
import Eggplant from '~/shared/assets/icons/components/MenuItemEggplant';
import FryingPan from '~/shared/assets/icons/components/MenuItemFryingPan';
import InternationalFood from '~/shared/assets/icons/components/MenuItemInternationalFood';
import Nutrition from '~/shared/assets/icons/components/MenuItemKitchen';
import MortarAndPestle from '~/shared/assets/icons/components/MenuItemMortarAndPestle';
import Paste from '~/shared/assets/icons/components/MenuItemPaste';
import Pot from '~/shared/assets/icons/components/MenuItemPot';
import Snacks from '~/shared/assets/icons/components/MenuItemSnacks';
import TeaCup from '~/shared/assets/icons/components/MenuItemTeaCup';
import { AppRoutes, routePaths } from '~/shared/config/route-config/router';

import { MenuFilter, MenuItemData } from './types/filters-types';
export enum MenuItem {
    SALADS = 'Салаты',
    SNACKS = 'Закуски',
    FIRST_DISHES = 'Первые блюда',
    SECONDARY_DISHES = 'Вторые блюда',
    DESERTS = 'Десерты, выпечка',
    GRILL = 'Блюда на грилe',
    VEGAN = 'Веганские блюда',
    CHILDREN_DISHES = 'Детские блюда',
    MEDICAL_NUTRITION = 'Лечебное питание',
    NATIONAL_DISHES = 'Национальные блюда',
    SAUCES = 'Соусы',
    PROVISIONS = 'Заготовки',
    DRINKS = 'Напитки',
}

export const getMenuItems = () => {
    const menuItems: MenuItemData[] = [
        {
            items: [
                {
                    title: 'Мясные салаты',
                    routePath: `${routePaths[AppRoutes.SALADS]}meet-salads`,
                },
                {
                    title: 'Рыбные салаты',
                    routePath: `${routePaths[AppRoutes.SALADS]}fish-salads`,
                },
                {
                    title: 'Овощные салаты',
                    routePath: `${routePaths[AppRoutes.SALADS]}vegetable-salads`,
                },
                {
                    title: 'Теплые салаты',
                    routePath: `${routePaths[AppRoutes.SALADS]}warm-salads`,
                },
            ],
            Icon: Eggplant,
            routePath: `${routePaths[AppRoutes.SALADS]}meet-salads`,
            title: MenuFilter.SALADS,
        },
        {
            items: [
                {
                    title: 'Мясные закуски',
                    routePath: `${routePaths[AppRoutes.SNACKS]}meet-snacks`,
                },
                {
                    title: 'Рыбные закуски',
                    routePath: `${routePaths[AppRoutes.SNACKS]}fish-snacks`,
                },
                {
                    title: 'Овощные закуски',
                    routePath: `${routePaths[AppRoutes.SNACKS]}vegetable-snacks`,
                },
                {
                    title: 'Теплые закуски',
                    routePath: `${routePaths[AppRoutes.SNACKS]}warm-snacks`,
                },
                {
                    title: 'Бутерброды',
                    routePath: `${routePaths[AppRoutes.SNACKS]}sandwiches`,
                },
                {
                    title: 'Фастфуд',
                    routePath: `${routePaths[AppRoutes.SNACKS]}fast-food`,
                },
            ],
            Icon: Snacks,
            routePath: `${routePaths[AppRoutes.SNACKS]}meet-snacks`,
            title: MenuFilter.SNACKS,
        },
        {
            items: [
                {
                    title: 'Мясные супы',
                    routePath: `${routePaths[AppRoutes.FIRST_DISHES]}meet-soups`,
                },

                {
                    title: 'Овощные супы',
                    routePath: `${routePaths[AppRoutes.FIRST_DISHES]}vegetable-soups`,
                },
                {
                    title: 'Бульоны',
                    routePath: `${routePaths[AppRoutes.FIRST_DISHES]}broths`,
                },
                {
                    title: 'Холодные супы',
                    routePath: `${routePaths[AppRoutes.FIRST_DISHES]}cold-soups`,
                },
                {
                    title: 'Диетические супы',
                    routePath: `${routePaths[AppRoutes.FIRST_DISHES]}diet-soups`,
                },
            ],
            Icon: Pot,
            routePath: `${routePaths[AppRoutes.FIRST_DISHES]}meet-soups`,
            title: MenuFilter.FIRST_DISHES,
        },
        {
            items: [
                {
                    title: 'Мясные',
                    routePath: `${routePaths[AppRoutes.SECONDARY_DISHES]}meet`,
                },

                {
                    title: 'Рыбные',
                    routePath: `${routePaths[AppRoutes.SECONDARY_DISHES]}fish`,
                },
                {
                    title: 'Овощные',
                    routePath: `${routePaths[AppRoutes.SECONDARY_DISHES]}vegetables`,
                },
                {
                    title: 'Из птицы',
                    routePath: `${routePaths[AppRoutes.SECONDARY_DISHES]}poultry`,
                },
                {
                    title: 'Из грибов',
                    routePath: `${routePaths[AppRoutes.SECONDARY_DISHES]}mashroom`,
                },
                {
                    title: 'Из субпродуктов',
                    routePath: `${routePaths[AppRoutes.SECONDARY_DISHES]}offal`,
                },
                {
                    title: 'На пару',
                    routePath: `${routePaths[AppRoutes.SECONDARY_DISHES]}for-a-couple`,
                },
                {
                    title: 'Пельмени, вареники',
                    routePath: `${routePaths[AppRoutes.SECONDARY_DISHES]}dumplings`,
                },
                {
                    title: 'Мучные гарниры',
                    routePath: `${routePaths[AppRoutes.SECONDARY_DISHES]}flour-side-dishes`,
                },
                {
                    title: 'Овощные гарниры',
                    routePath: `${routePaths[AppRoutes.SECONDARY_DISHES]}vegetable-garnish`,
                },
                {
                    title: 'Пицца',
                    routePath: `${routePaths[AppRoutes.SECONDARY_DISHES]}pizza`,
                },
                {
                    title: 'Суши',
                    routePath: `${routePaths[AppRoutes.SECONDARY_DISHES]}sushi`,
                },
            ],
            Icon: FryingPan,
            routePath: `${routePaths[AppRoutes.SECONDARY_DISHES]}meet`,
            title: MenuFilter.SECONDARY_DISHES,
        },
        {
            items: [
                {
                    title: 'Блины и оладьи',
                    routePath: `${routePaths[AppRoutes.DESERTS]}pancakes`,
                },
                {
                    title: 'Пироги и пончики',
                    routePath: `${routePaths[AppRoutes.DESERTS]}pies-and-donuts`,
                },
                {
                    title: 'Торты',
                    routePath: `${routePaths[AppRoutes.DESERTS]}cakes`,
                },
                {
                    title: 'Рулеты',
                    routePath: `${routePaths[AppRoutes.DESERTS]}rolls`,
                },
                {
                    title: 'Кексы и маффины',
                    routePath: `${routePaths[AppRoutes.DESERTS]}cupcakes-and-Muffins`,
                },
                {
                    title: 'Сырники и ватрушки',
                    routePath: `${routePaths[AppRoutes.DESERTS]}cheesecakes-and-vatrushki`,
                },
                {
                    title: 'Из слоеного теста',
                    routePath: `${routePaths[AppRoutes.DESERTS]}from-puff-pastry`,
                },
                {
                    title: 'Из заварного теста',
                    routePath: `${routePaths[AppRoutes.DESERTS]}from-choux-pastry`,
                },
                {
                    title: 'Из дрожжевого теста',
                    routePath: `${routePaths[AppRoutes.DESERTS]}from-yeast-dough`,
                },
                {
                    title: 'Булочки и сдоба',

                    routePath: `${routePaths[AppRoutes.DESERTS]}buns-and-pastries`,
                },
                {
                    title: 'Хлеб',
                    routePath: `${routePaths[AppRoutes.DESERTS]}bread`,
                },
                {
                    title: 'Тесто на пиццу',
                    routePath: `${routePaths[AppRoutes.DESERTS]}pizza-dough',`,
                },
                {
                    title: 'Кремы',
                    routePath: `${routePaths[AppRoutes.DESERTS]}creams'`,
                },
            ],
            Icon: BreadAndRollingPin,
            routePath: `${routePaths[AppRoutes.DESERTS]}pancakes`,
            title: MenuFilter.DESERTS,
        },
        {
            items: [
                {
                    title: 'Свинина',
                    routePath: `${routePaths[AppRoutes.GRILL]}pork`,
                },
                {
                    title: 'Птица',
                    routePath: `${routePaths[AppRoutes.GRILL]}bird`,
                },
                {
                    title: 'Рыба',
                    routePath: `${routePaths[AppRoutes.GRILL]}fish`,
                },
                {
                    title: 'Грибы',
                    routePath: `${routePaths[AppRoutes.GRILL]}mashroom`,
                },
                {
                    title: 'Овощи',
                    routePath: `${routePaths[AppRoutes.GRILL]}vegetables`,
                },
            ],
            Icon: Grill,
            routePath: `${routePaths[AppRoutes.GRILL]}pork`,
            title: MenuFilter.GRILL,
        },

        {
            items: [
                {
                    title: 'Закуски',
                    routePath: `${routePaths[AppRoutes.VEGAN]}snacks`,
                },
                {
                    title: 'Первые блюда',
                    routePath: `${routePaths[AppRoutes.VEGAN]}first-dishes`,
                },
                {
                    title: 'Первые блюда',
                    routePath: `${routePaths[AppRoutes.VEGAN]}side-dishes`,
                },
                {
                    title: 'Десерты',
                    routePath: `${routePaths[AppRoutes.VEGAN]}deserts`,
                },
                {
                    title: 'Выпечка',
                    routePath: `${routePaths[AppRoutes.VEGAN]}bakery`,
                },
                {
                    title: 'Сыроедческие блюда',
                    routePath: `${routePaths[AppRoutes.VEGAN]}raw-food-dishes`,
                },
                {
                    title: 'Напитки',
                    routePath: `${routePaths[AppRoutes.VEGAN]}drinks`,
                },
            ],
            Icon: BayLeaf,
            routePath: `${routePaths[AppRoutes.VEGAN]}snacks`,
            title: MenuFilter.VEGAN,
        },
        {
            items: [
                {
                    title: 'Вторые блюда',
                    routePath: `${routePaths[AppRoutes.CHILDREN_DISHES]}secondary-dishes`,
                },
                {
                    title: 'Гарниры',
                    routePath: `${routePaths[AppRoutes.CHILDREN_DISHES]}side-dishes`,
                },
                {
                    title: 'Выпечка',
                    routePath: `${routePaths[AppRoutes.CHILDREN_DISHES]}bakery`,
                },
                {
                    title: 'Без глютена',
                    routePath: `${routePaths[AppRoutes.CHILDREN_DISHES]}gluten-free`,
                },
                {
                    title: 'Без сахара',
                    routePath: `${routePaths[AppRoutes.CHILDREN_DISHES]}sugar-free`,
                },
                {
                    title: 'Без аллергенов',
                    routePath: `${routePaths[AppRoutes.CHILDREN_DISHES]}allergen-free`,
                },
                {
                    title: 'Блюда для прикорма',
                    routePath: `${routePaths[AppRoutes.CHILDREN_DISHES]}complementary-feeding-dishes`,
                },
            ],
            Icon: ChildTasty,
            routePath: `${routePaths[AppRoutes.CHILDREN_DISHES]}secondary-dishes`,
            title: MenuFilter.CHILDREN_DISHES,
        },
        {
            items: [
                {
                    title: 'Детская диета',
                    routePath: `${routePaths[AppRoutes.MEDICAL_NUTRITION]}children-diet`,
                },
                {
                    title: 'Диета №1',
                    routePath: `${routePaths[AppRoutes.MEDICAL_NUTRITION]}diet-1`,
                },
                {
                    title: 'Диета №2',
                    routePath: `${routePaths[AppRoutes.MEDICAL_NUTRITION]}diet-2`,
                },
                {
                    title: 'Диета №3',
                    routePath: `${routePaths[AppRoutes.MEDICAL_NUTRITION]}diet-3`,
                },
                {
                    title: 'Диета №4',
                    routePath: `${routePaths[AppRoutes.MEDICAL_NUTRITION]}diet-4`,
                },
                {
                    title: 'Диета №5',
                    routePath: `${routePaths[AppRoutes.MEDICAL_NUTRITION]}diet-5`,
                },
                {
                    title: 'Диета №6',
                    routePath: `${routePaths[AppRoutes.MEDICAL_NUTRITION]}diet-6`,
                },
                {
                    title: 'Диета №7',
                    routePath: `${routePaths[AppRoutes.MEDICAL_NUTRITION]}diet-7`,
                },
                {
                    title: 'Диета №8',
                    routePath: `${routePaths[AppRoutes.MEDICAL_NUTRITION]}diet-8`,
                },
                {
                    title: 'Диета №9',
                    routePath: `${routePaths[AppRoutes.MEDICAL_NUTRITION]}diet-9`,
                },
                {
                    title: 'Диета №10',
                    routePath: `${routePaths[AppRoutes.MEDICAL_NUTRITION]}diet-10`,
                },
                {
                    title: 'Диета №11',
                    routePath: `${routePaths[AppRoutes.MEDICAL_NUTRITION]}diet-11`,
                },
                {
                    title: 'Диета №12',
                    routePath: `${routePaths[AppRoutes.MEDICAL_NUTRITION]}diet-12`,
                },
                {
                    title: 'Диета №13',
                    routePath: `${routePaths[AppRoutes.MEDICAL_NUTRITION]}diet-13`,
                },
                {
                    title: 'Диета №14',
                    routePath: `${routePaths[AppRoutes.MEDICAL_NUTRITION]}diet-14`,
                },
                {
                    title: 'Без глютена',
                    routePath: `${routePaths[AppRoutes.MEDICAL_NUTRITION]}gluten-free`,
                },
                {
                    title: 'Без аллергенов',
                    routePath: `${routePaths[AppRoutes.MEDICAL_NUTRITION]}allergen-free`,
                },
            ],
            Icon: Nutrition,
            routePath: `${routePaths[AppRoutes.MEDICAL_NUTRITION]}children-diet`,
            title: MenuFilter.MEDICAL_NUTRITION,
        },
        {
            items: [
                {
                    title: 'Греческая кухня',
                    routePath: `${routePaths[AppRoutes.NATIONAL_DISHES]}greek-cuisine`,
                },
                {
                    title: 'Грузинская кухня',
                    routePath: `${routePaths[AppRoutes.NATIONAL_DISHES]}georgian-cuisine`,
                },
                {
                    title: 'Итальянская кухня',
                    routePath: `${routePaths[AppRoutes.NATIONAL_DISHES]}italian-cuisine`,
                },
                {
                    title: 'Испанская кухня',
                    routePath: `${routePaths[AppRoutes.NATIONAL_DISHES]}spanish-cuisine`,
                },
                {
                    title: 'Испанская кухня',
                    routePath: `${routePaths[AppRoutes.NATIONAL_DISHES]}spanish-cuisine`,
                },
                {
                    title: 'Китайская кухня',
                    routePath: `${routePaths[AppRoutes.NATIONAL_DISHES]}china-cuisine`,
                },
                {
                    title: 'Мексиканская кухня',
                    routePath: `${routePaths[AppRoutes.NATIONAL_DISHES]}mexican-cuisine`,
                },
                {
                    title: 'Паназиатская кухня',
                    routePath: `${routePaths[AppRoutes.NATIONAL_DISHES]}pan-Asian-cuisine`,
                },
                {
                    title: 'Русская кухня',
                    routePath: `${routePaths[AppRoutes.NATIONAL_DISHES]}russian-cuisine`,
                },
                {
                    title: 'Турецкая кухня',
                    routePath: `${routePaths[AppRoutes.NATIONAL_DISHES]}turkish-cuisine`,
                },
                {
                    title: 'Французская кухня',
                    routePath: `${routePaths[AppRoutes.NATIONAL_DISHES]}french-cuisine`,
                },
                {
                    title: 'Шведская кухня',
                    routePath: `${routePaths[AppRoutes.NATIONAL_DISHES]}swedan-cuisine`,
                },
                {
                    title: 'Японская кухня',
                    routePath: `${routePaths[AppRoutes.NATIONAL_DISHES]}japanese-cuisine`,
                },
                {
                    title: 'Другая кухня',
                    routePath: `${routePaths[AppRoutes.NATIONAL_DISHES]}another-cuisine`,
                },
            ],
            Icon: InternationalFood,
            routePath: `${routePaths[AppRoutes.NATIONAL_DISHES]}greek-cuisine`,
            title: MenuFilter.NATIONAL_DISHES,
        },
        {
            items: [
                {
                    title: 'Соусы мясные',
                    routePath: `${routePaths[AppRoutes.SAUCES]}meet-sauces`,
                },
                {
                    title: 'Соусы сырные',
                    routePath: `${routePaths[AppRoutes.SAUCES]}cheese-sauces`,
                },
                {
                    title: 'Маринады',
                    routePath: `${routePaths[AppRoutes.SAUCES]}marinades`,
                },
            ],
            Icon: MortarAndPestle,
            routePath: `${routePaths[AppRoutes.SAUCES]}meet-sauces`,
            title: MenuFilter.SAUCES,
        },
        {
            items: [
                {
                    title: 'Мяcные заготовки',
                    routePath: `${routePaths[AppRoutes.PROVISIONS]}meat-provisions`,
                },
                {
                    title: 'Рыбные заготовки',
                    routePath: `${routePaths[AppRoutes.PROVISIONS]}fish-provisions`,
                },
                {
                    title: 'Из огурцов',
                    routePath: `${routePaths[AppRoutes.PROVISIONS]}from-cucumbers-provisions`,
                },
                {
                    title: 'Из томатов',

                    routePath: `${routePaths[AppRoutes.PROVISIONS]}from-tomato-provisions`,
                },
                {
                    title: 'Из грибов',
                    routePath: `${routePaths[AppRoutes.PROVISIONS]}from-mashrooms-provisions`,
                },
                {
                    title: 'Овощные заготовки',
                    routePath: `${routePaths[AppRoutes.PROVISIONS]}vegetables-provisions`,
                },
                {
                    title: 'Салаты, икра',
                    routePath: `${routePaths[AppRoutes.PROVISIONS]}salads-caviar-provisions`,
                },
                {
                    title: 'Из фруктов и ягод',
                    routePath: `${routePaths[AppRoutes.PROVISIONS]}from-fruits-and-berries-provisions`,
                },
            ],
            Icon: Paste,
            routePath: `${routePaths[AppRoutes.PROVISIONS]}meat-provisions`,
            title: MenuFilter.PROVISIONS,
        },
        {
            items: [
                {
                    title: 'Соки и фреши',
                    routePath: `${routePaths[AppRoutes.DRINKS]}juices-and-fresh-juices`,
                },
                {
                    title: 'Смузи',
                    routePath: `${routePaths[AppRoutes.DRINKS]}smoothie`,
                },
                {
                    title: 'Компоты',
                    routePath: `${routePaths[AppRoutes.DRINKS]}compotes`,
                },
                {
                    title: 'Кисели',
                    routePath: `${routePaths[AppRoutes.DRINKS]}kiseli`,
                },
                {
                    title: 'Кофе',
                    routePath: `${routePaths[AppRoutes.DRINKS]}coffee`,
                },

                {
                    title: 'Лечебный чай',
                    routePath: `${routePaths[AppRoutes.DRINKS]}nutrition-tea`,
                },
                {
                    title: 'Квас',
                    routePath: `${routePaths[AppRoutes.DRINKS]}kvass`,
                },
                {
                    title: 'Коктейли',
                    routePath: `${routePaths[AppRoutes.DRINKS]}coctails`,
                },
                {
                    title: 'Алкогольные',
                    routePath: `${routePaths[AppRoutes.DRINKS]}alcohol`,
                },
            ],
            Icon: TeaCup,
            routePath: `${routePaths[AppRoutes.DRINKS]}juices-and-fresh-juices`,
            title: MenuFilter.DRINKS,
        },
    ];

    return menuItems;
};
