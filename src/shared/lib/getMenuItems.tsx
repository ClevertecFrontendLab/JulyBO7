// import Eggplant from '~/shared/assets/images/eggplant.png';
// import BreadAndRollingPin from '~/shared/assets/images/icons/bread.png';
// import Snacks from '~/shared/assets/images/icons/cup-of-tea.png';
// import TeaCup from '~/shared/assets/images/icons/cup-of-tea.png';
// import Nutrition from '~/shared/assets/images/icons/healthy.png';
// import ChildTasty from '~/shared/assets/images/icons/icons8-child-tasty.png';
// import FryingPan from '~/shared/assets/images/icons/icons8-frying-pan.png';
// import InternationalFood from '~/shared/assets/images/icons/icons8-international-food.png';
// import BayLeaf from '~/shared/assets/images/icons/leaf.png';
// import Grill from '~/shared/assets/images/icons/mortar.png';
// import MortarAndPestle from '~/shared/assets/images/icons/mortar.png';
// import Paste from '~/shared/assets/images/icons/pasta.png';
// import Pot from '~/shared/assets/images/icons/pot.png';
// import { routePaths } from '~/shared/config/route-config/router';
// import { Category, SubCategory } from '~/shared/types/categories';

// export type SubMenuItem = {
//     title: string;
//     routePath: string;
//     subCategory?: SubCategory;
// };
// export type MenuItem = {
//     items: SubMenuItem[];
//     icon: string;
//     title: string;
//     routePath: string;
//     category: Category;
// };
// export type MenuItems = MenuItem[];

// export const getMenuItems = () => {
//     const menuItems: MenuItems = [
//         {
//             items: [
//                 {
//                     title: 'Мясные салаты',
//                     routePath: `${routePaths.salads}meet-salads`,
//                     subCategory: 'meet-salads',
//                 },
//                 {
//                     title: 'Рыбные салаты',
//                     routePath: `${routePaths.salads}fish-salads`,
//                     subCategory: 'fish-salads',
//                 },
//                 {
//                     title: 'Овощные салаты',
//                     routePath: `${routePaths.salads}vegetable-salads`,
//                     subCategory: 'vegetable-salads',
//                 },
//                 {
//                     title: 'Теплые салаты',
//                     routePath: `${routePaths.salads}warm-salads`,
//                     subCategory: 'warm-salads',
//                 },
//             ],
//             icon: Eggplant,
//             routePath: `${routePaths.salads}meet-salads`,
//             title: 'Салаты',
//             category: 'salads',
//         },
//         {
//             items: [
//                 {
//                     title: 'Мясные закуски',
//                     routePath: `${routePaths.snacks}meet-snacks`,
//                     subCategory: 'meet-snacks',
//                 },
//                 {
//                     title: 'Рыбные закуски',
//                     routePath: `${routePaths.snacks}fish-snacks`,
//                     subCategory: 'fish-snacks',
//                 },
//                 {
//                     title: 'Овощные закуски',
//                     routePath: `${routePaths.snacks}vegetable-snacks`,
//                     subCategory: 'vegetable-snacks',
//                 },
//                 {
//                     title: 'Теплые закуски',
//                     routePath: `${routePaths.snacks}warm-snacks`,
//                     subCategory: 'warm-snacks',
//                 },
//                 {
//                     title: 'Бутерброды',
//                     routePath: `${routePaths.snacks}sandwiches`,
//                     subCategory: 'sandwiches',
//                 },
//                 {
//                     title: 'Фастфуд',
//                     routePath: `${routePaths.snacks}fast-food`,
//                     subCategory: 'fast-food',
//                 },
//             ],
//             icon: Snacks,
//             routePath: `${routePaths.snacks}meet-snacks`,
//             title: 'Закуски',
//             category: 'snacks',
//         },
//         {
//             items: [
//                 {
//                     title: 'Мясные супы',
//                     routePath: `${routePaths['first-dish']}meet-soups`,
//                     subCategory: 'meet-soups',
//                 },

//                 {
//                     title: 'Овощные супы',
//                     routePath: `${routePaths['first-dish']}vegetable-soups`,
//                     subCategory: 'vegetable-soups',
//                 },
//                 {
//                     title: 'Бульоны',
//                     routePath: `${routePaths['first-dish']}broths`,
//                     subCategory: 'broths',
//                 },
//                 {
//                     title: 'Холодные супы',
//                     routePath: `${routePaths['first-dish']}cold-soups`,
//                     subCategory: 'cold-soups',
//                 },
//                 {
//                     title: 'Диетические супы',
//                     routePath: `${routePaths['first-dish']}diet-soups`,
//                     subCategory: 'diet-soups',
//                 },
//             ],
//             icon: Pot,
//             routePath: `${routePaths['first-dish']}meet-soups`,
//             title: 'Первые блюда',
//             category: 'first-dish',
//         },
//         {
//             items: [
//                 {
//                     title: 'Мясные',
//                     routePath: `${routePaths['second-dish']}meet`,
//                     subCategory: 'meet',
//                 },

//                 {
//                     title: 'Рыбные',
//                     routePath: `${routePaths['second-dish']}fish`,
//                     subCategory: 'fish',
//                 },
//                 {
//                     title: 'Овощные',
//                     routePath: `${routePaths['second-dish']}vegetables`,
//                     subCategory: 'vegetables',
//                 },
//                 {
//                     title: 'Из птицы',
//                     routePath: `${routePaths['second-dish']}poultry-dish`,
//                     subCategory: 'poultry-dish',
//                 },
//                 {
//                     title: 'Из грибов',
//                     routePath: `${routePaths['second-dish']}mashroom`,
//                     subCategory: 'mashroom',
//                 },
//                 {
//                     title: 'Из субпродуктов',
//                     routePath: `${routePaths['second-dish']}offal`,
//                     subCategory: 'offal',
//                 },
//                 {
//                     title: 'На пару',
//                     routePath: `${routePaths['second-dish']}steamed-dishes`,
//                     subCategory: 'steamed-dishes',
//                 },
//                 {
//                     title: 'Пельмени, вареники',
//                     routePath: `${routePaths['second-dish']}dumplings`,
//                     subCategory: 'dumplings',
//                 },
//                 {
//                     title: 'Мучные гарниры',
//                     routePath: `${routePaths['second-dish']}flour-side-dishes`,
//                     subCategory: 'flour-side-dishes',
//                 },
//                 {
//                     title: 'Овощные гарниры',
//                     routePath: `${routePaths['second-dish']}vegetable-garnish`,
//                     subCategory: 'vegetable-garnish',
//                 },
//                 {
//                     title: 'Пицца',
//                     routePath: `${routePaths['second-dish']}pizza`,
//                     subCategory: 'pizza',
//                 },
//                 {
//                     title: 'Суши',
//                     routePath: `${routePaths['second-dish']}sushi`,
//                     subCategory: 'sushi',
//                 },
//             ],
//             icon: FryingPan,
//             routePath: `${routePaths['second-dish']}meet`,
//             title: 'Вторые блюда',
//             category: 'second-dish',
//         },
//         {
//             items: [
//                 {
//                     title: 'Блины и оладьи',
//                     routePath: `${routePaths['desert-bakery']}pancakes`,
//                 },
//                 {
//                     title: 'Пироги и пончики',
//                     routePath: `${routePaths['desert-bakery']}pies-and-donuts`,
//                 },
//                 {
//                     title: 'Торты',
//                     routePath: `${routePaths['desert-bakery']}cakes`,
//                 },
//                 {
//                     title: 'Рулеты',
//                     routePath: `${routePaths['desert-bakery']}rolls`,
//                 },
//                 {
//                     title: 'Кексы и маффины',
//                     routePath: `${routePaths['desert-bakery']}cupcakes-and-Muffins`,
//                 },
//                 {
//                     title: 'Сырники и ватрушки',
//                     routePath: `${routePaths['desert-bakery']}cheesecakes-and-vatrushki`,
//                 },
//                 {
//                     title: 'Из слоеного теста',
//                     routePath: `${routePaths['desert-bakery']}from-puff-pastry`,
//                 },
//                 {
//                     title: 'Из заварного теста',
//                     routePath: `${routePaths['desert-bakery']}from-choux-pastry`,
//                 },
//                 {
//                     title: 'Из дрожжевого теста',
//                     routePath: `${routePaths['desert-bakery']}from-yeast-dough`,
//                 },
//                 {
//                     title: 'Булочки и сдоба',

//                     routePath: `${routePaths['desert-bakery']}buns-and-pastries`,
//                 },
//                 {
//                     title: 'Хлеб',
//                     routePath: `${routePaths['desert-bakery']}bread`,
//                 },
//                 {
//                     title: 'Тесто на пиццу',
//                     routePath: `${routePaths['desert-bakery']}pizza-dough',`,
//                 },
//                 {
//                     title: 'Кремы',
//                     routePath: `${routePaths['desert-bakery']}creams'`,
//                 },
//             ],
//             icon: BreadAndRollingPin,
//             routePath: `${routePaths['desert-bakery']}pancakes`,
//             title: 'Десерты, выпечка',
//             category: 'desert-bakery',
//         },
//         {
//             items: [
//                 {
//                     title: 'Свинина',
//                     routePath: `${routePaths.grill}pork`,
//                 },
//                 {
//                     title: 'Птица',
//                     routePath: `${routePaths.grill}bird`,
//                 },
//                 {
//                     title: 'Рыба',
//                     routePath: `${routePaths.grill}fish`,
//                 },
//                 {
//                     title: 'Грибы',
//                     routePath: `${routePaths.grill}mashroom`,
//                 },
//                 {
//                     title: 'Овощи',
//                     routePath: `${routePaths.grill}vegetables`,
//                 },
//             ],
//             icon: Grill,
//             routePath: `${routePaths.grill}pork`,
//             title: 'Блюда на грилe',
//             category: 'grill',
//         },
//         {
//             items: [
//                 {
//                     title: 'Закуски',
//                     routePath: `${routePaths['vegan']}snacks`,
//                     subCategory: 'snacks',
//                 },
//                 {
//                     title: 'Первые блюда',
//                     routePath: `${routePaths['vegan']}first-dish`,
//                     subCategory: 'first-dish',
//                 },
//                 {
//                     title: 'Вторые блюда',
//                     routePath: `${routePaths['vegan']}second-dish`,
//                     subCategory: 'second-dish',
//                 },
//                 {
//                     title: 'Гарниры',
//                     routePath: `${routePaths['vegan']}side-dishes`,
//                     subCategory: 'side-dishes',
//                 },
//                 {
//                     title: 'Десерты',
//                     routePath: `${routePaths['vegan']}deserts`,
//                     subCategory: 'deserts',
//                 },
//                 {
//                     title: 'Выпечка',
//                     routePath: `${routePaths['vegan']}bakery`,
//                     subCategory: 'bakery',
//                 },
//                 {
//                     title: 'Сыроедческие блюда',
//                     routePath: `${routePaths['vegan']}vegetables`,
//                     subCategory: 'vegetables',
//                 },
//                 {
//                     title: 'Напитки',
//                     routePath: `${routePaths['vegan']}drinks`,
//                     subCategory: 'drinks',
//                 },
//             ],
//             icon: BayLeaf,
//             routePath: `${routePaths['vegan']}snacks`,
//             title: 'Веганская кухня',
//             category: 'vegan',
//         },
//         {
//             items: [
//                 {
//                     title: 'Вторые блюда',
//                     routePath: `${routePaths['children-dish']}secondary-dishes`,
//                 },
//                 {
//                     title: 'Гарниры',
//                     routePath: `${routePaths['children-dish']}side-dishes`,
//                 },
//                 {
//                     title: 'Выпечка',
//                     routePath: `${routePaths['children-dish']}bakery`,
//                 },
//                 {
//                     title: 'Без глютена',
//                     routePath: `${routePaths['children-dish']}gluten-free`,
//                 },
//                 {
//                     title: 'Без сахара',
//                     routePath: `${routePaths['children-dish']}sugar-free`,
//                 },
//                 {
//                     title: 'Без аллергенов',
//                     routePath: `${routePaths['children-dish']}allergen-free`,
//                 },
//                 {
//                     title: 'Блюда для прикорма',
//                     routePath: `${routePaths['children-dish']}complementary-feeding-dishes`,
//                 },
//             ],
//             icon: ChildTasty,
//             routePath: `${routePaths['children-dish']}secondary-dishes`,
//             title: 'Детские блюда',
//             category: 'children-dish',
//         },
//         {
//             items: [
//                 {
//                     title: 'Детская диета',
//                     routePath: `${routePaths['medical-nutrition']}children-diet`,
//                 },
//                 {
//                     title: 'Диета №1',
//                     routePath: `${routePaths['medical-nutrition']}diet-1`,
//                 },
//                 {
//                     title: 'Диета №2',
//                     routePath: `${routePaths['medical-nutrition']}diet-2`,
//                 },
//                 {
//                     title: 'Диета №3',
//                     routePath: `${routePaths['medical-nutrition']}diet-3`,
//                 },
//                 {
//                     title: 'Диета №4',
//                     routePath: `${routePaths['medical-nutrition']}diet-4`,
//                 },
//                 {
//                     title: 'Диета №5',
//                     routePath: `${routePaths['medical-nutrition']}diet-5`,
//                 },
//                 {
//                     title: 'Диета №6',
//                     routePath: `${routePaths['medical-nutrition']}diet-6`,
//                 },
//                 {
//                     title: 'Диета №7',
//                     routePath: `${routePaths['medical-nutrition']}diet-7`,
//                 },
//                 {
//                     title: 'Диета №8',
//                     routePath: `${routePaths['medical-nutrition']}diet-8`,
//                 },
//                 {
//                     title: 'Диета №9',
//                     routePath: `${routePaths['medical-nutrition']}diet-9`,
//                 },
//                 {
//                     title: 'Диета №10',
//                     routePath: `${routePaths['medical-nutrition']}diet-10`,
//                 },
//                 {
//                     title: 'Диета №11',
//                     routePath: `${routePaths['medical-nutrition']}diet-11`,
//                 },
//                 {
//                     title: 'Диета №12',
//                     routePath: `${routePaths['medical-nutrition']}diet-12`,
//                 },
//                 {
//                     title: 'Диета №13',
//                     routePath: `${routePaths['medical-nutrition']}diet-13`,
//                 },
//                 {
//                     title: 'Диета №14',
//                     routePath: `${routePaths['medical-nutrition']}diet-14`,
//                 },
//                 {
//                     title: 'Без глютена',
//                     routePath: `${routePaths['medical-nutrition']}gluten-free`,
//                 },
//                 {
//                     title: 'Без аллергенов',
//                     routePath: `${routePaths['medical-nutrition']}allergen-free`,
//                 },
//             ],
//             icon: Nutrition,
//             routePath: `${routePaths['medical-nutrition']}children-diet`,
//             title: 'Лечебное питание',
//             category: 'medical-nutrition',
//         },
//         {
//             items: [
//                 {
//                     title: 'Греческая кухня',
//                     routePath: `${routePaths.national}greek-cuisine`,
//                 },
//                 {
//                     title: 'Грузинская кухня',
//                     routePath: `${routePaths.national}georgian-cuisine`,
//                 },
//                 {
//                     title: 'Итальянская кухня',
//                     routePath: `${routePaths.national}italian-cuisine`,
//                 },
//                 {
//                     title: 'Испанская кухня',
//                     routePath: `${routePaths.national}spanish-cuisine`,
//                 },
//                 {
//                     title: 'Испанская кухня',
//                     routePath: `${routePaths.national}spanish-cuisine`,
//                 },
//                 {
//                     title: 'Китайская кухня',
//                     routePath: `${routePaths.national}china-cuisine`,
//                 },
//                 {
//                     title: 'Мексиканская кухня',
//                     routePath: `${routePaths.national}mexican-cuisine`,
//                 },
//                 {
//                     title: 'Паназиатская кухня',
//                     routePath: `${routePaths.national}pan-Asian-cuisine`,
//                 },
//                 {
//                     title: 'Русская кухня',
//                     routePath: `${routePaths.national}russian-cuisine`,
//                 },
//                 {
//                     title: 'Турецкая кухня',
//                     routePath: `${routePaths.national}turkish-cuisine`,
//                 },
//                 {
//                     title: 'Французская кухня',
//                     routePath: `${routePaths.national}french-cuisine`,
//                 },
//                 {
//                     title: 'Шведская кухня',
//                     routePath: `${routePaths.national}swedan-cuisine`,
//                 },
//                 {
//                     title: 'Японская кухня',
//                     routePath: `${routePaths.national}japanese-cuisine`,
//                 },
//                 {
//                     title: 'Другая кухня',
//                     routePath: `${routePaths.national}another-cuisine`,
//                 },
//             ],
//             icon: InternationalFood,
//             routePath: `${routePaths.national}greek-cuisine`,
//             title: 'Национальные',
//             category: 'national',
//         },
//         {
//             items: [
//                 {
//                     title: 'Соусы мясные',
//                     routePath: `${routePaths.sauces}meet-sauces`,
//                 },
//                 {
//                     title: 'Соусы сырные',
//                     routePath: `${routePaths.sauces}cheese-sauces`,
//                 },
//                 {
//                     title: 'Маринады',
//                     routePath: `${routePaths.sauces}marinades`,
//                 },
//             ],
//             icon: MortarAndPestle,
//             routePath: `${routePaths.sauces}meet-sauces`,
//             title: 'Соусы',
//             category: 'sauces',
//         },
//         {
//             items: [
//                 {
//                     title: 'Мяcные заготовки',
//                     routePath: `${routePaths.provisions}meat-provisions`,
//                 },
//                 {
//                     title: 'Рыбные заготовки',
//                     routePath: `${routePaths.provisions}fish-provisions`,
//                 },
//                 {
//                     title: 'Из огурцов',
//                     routePath: `${routePaths.provisions}from-cucumbers-provisions`,
//                 },
//                 {
//                     title: 'Из томатов',

//                     routePath: `${routePaths.provisions}from-tomato-provisions`,
//                 },
//                 {
//                     title: 'Из грибов',
//                     routePath: `${routePaths.provisions}from-mashrooms-provisions`,
//                 },
//                 {
//                     title: 'Овощные заготовки',
//                     routePath: `${routePaths.provisions}vegetables-provisions`,
//                 },
//                 {
//                     title: 'Салаты, икра',
//                     routePath: `${routePaths.provisions}salads-caviar-provisions`,
//                 },
//                 {
//                     title: 'Из фруктов и ягод',
//                     routePath: `${routePaths.provisions}from-fruits-and-berries-provisions`,
//                 },
//             ],
//             icon: Paste,
//             routePath: `${routePaths.provisions}meat-provisions`,
//             title: 'Заготовки',
//             category: 'provisions',
//         },
//         {
//             items: [
//                 {
//                     title: 'Соки и фреши',
//                     routePath: `${routePaths.drinks}juices-and-fresh-juices`,
//                 },
//                 {
//                     title: 'Смузи',
//                     routePath: `${routePaths.drinks}smoothie`,
//                 },
//                 {
//                     title: 'Компоты',
//                     routePath: `${routePaths.drinks}compotes`,
//                 },
//                 {
//                     title: 'Кисели',
//                     routePath: `${routePaths.drinks}kiseli`,
//                 },
//                 {
//                     title: 'Кофе',
//                     routePath: `${routePaths.drinks}coffee`,
//                 },

//                 {
//                     title: 'Лечебный чай',
//                     routePath: `${routePaths.drinks}nutrition-tea`,
//                 },
//                 {
//                     title: 'Квас',
//                     routePath: `${routePaths.drinks}kvass`,
//                 },
//                 {
//                     title: 'Коктейли',
//                     routePath: `${routePaths.drinks}coctails`,
//                 },
//                 {
//                     title: 'Алкогольные',
//                     routePath: `${routePaths.drinks}alcohol`,
//                 },
//             ],
//             icon: TeaCup,
//             routePath: `${routePaths.drinks}juices-and-fresh-juices`,
//             title: 'Напитки',
//             category: 'drinks',
//         },
//     ];

//     return menuItems;
// };
