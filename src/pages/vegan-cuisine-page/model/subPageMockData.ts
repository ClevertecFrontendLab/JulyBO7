import { IconProps } from '@chakra-ui/react';
import { FC } from 'react';

import ChildTasty from '~/shared/assets/icons/components/MenuItemChildTasty';
import Dishwasher from '~/shared/assets/icons/components/MenuItemDishwasher';
import FryingPan from '~/shared/assets/icons/components/MenuItemFryingPan';
import InternationalFood from '~/shared/assets/icons/components/MenuItemInternationalFood';
import potato from '~/shared/assets/images/potato.jpg';
import potatoRolls from '~/shared/assets/images/potato-rolls.jpg';
import potato2 from '~/shared/assets/images/potato2.jpg';
import puri from '~/shared/assets/images/puri.jpg';
import teftels from '~/shared/assets/images/teftels.jpg';
import tom from '~/shared/assets/images/tom.jpg';
import vegetable from '~/shared/assets/images/veget.jpg';

type SubPageMockDataType = {
    image: string;
    title: string;
    text: string;
    BadgeIcon: FC<IconProps>;
    badgeText: string;
    bookmarkCount: number;
    emojiCount: number;
};
export const subPageMockData: SubPageMockDataType[] = [
    {
        image: potato,
        title: 'Картошка, тушенная с болгарским перцем и фасолью в томатном соусе',
        text: 'Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, -  вариант сытного блюда на каждый день. Фасоль в данном случае заменяет  мясо, делая рагу сытным и питательным. Чтобы сократить время  приготовления, возьмём консервированную фасоль. Блюдо хоть и простое, но в полной мере наполнено ароматами и имеет выразительный вкус за счёт  добавления томатной пасты.',

        BadgeIcon: InternationalFood,
        badgeText: 'Национальные',
        bookmarkCount: 85,
        emojiCount: 152,
    },

    {
        image: potatoRolls,
        title: 'Картофельные рулетики с грибами',
        text: 'Рекомендую всем приготовить постное блюдо из картофеля и грибов.  Готовится это блюдо без яиц, без мяса и без сыра, из самых простых  ингредиентов, а получается очень вкусно и сытно. Постный рецепт  картофельных рулетиков с грибами, в томатном соусе, - на обед, ужин и  даже на праздничный стол!',

        BadgeIcon: ChildTasty,
        badgeText: 'Детские блюда',
        bookmarkCount: 85,
        emojiCount: 152,
    },
    {
        image: tom,
        title: 'Том-ям с капустой кимчи',
        text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',

        BadgeIcon: InternationalFood,
        badgeText: 'Национальные',
        bookmarkCount: 124,
        emojiCount: 324,
    },
    {
        image: vegetable,
        title: 'Овощная лазанья из лаваша',
        text: 'Большое, сытное блюдо для ценителей блюд без мяса! Такая лазанья  готовится с овощным соусом и соусом бешамель, а вместо листов для  лазаньи используется тонкий лаваш.',

        BadgeIcon: Dishwasher,
        badgeText: 'Блюда на гриле',
        bookmarkCount: 85,
        emojiCount: 152,
    },
    {
        image: teftels,

        title: 'Тефтели из булгура и чечевицы, запечённые в томатном соусе',
        text: 'Тефтели из булгура и чечевицы – яркие и питательные, отлично подходят  для постного и вегетарианского меню. Тефтели получаются нежными, а также сочными и ароматными благодаря использованию томатного соуса и душистых пряностей.',

        BadgeIcon: FryingPan,
        badgeText: 'Вторые блюда',
        bookmarkCount: 85,
        emojiCount: 152,
    },
    {
        image: teftels,

        title: 'Тефтели из булгура и чечевицы, запечённые в томатном соусе',
        text: 'Тефтели из булгура и чечевицы – яркие и питательные, отлично подходят  для постного и вегетарианского меню. Тефтели получаются нежными, а также сочными и ароматными благодаря использованию томатного соуса и душистых пряностей.',

        BadgeIcon: FryingPan,
        badgeText: 'Вторые блюда',
        bookmarkCount: 85,
        emojiCount: 152,
    },
    {
        image: potato2,
        title: 'Чесночная картошка',
        text: 'Такая картошечка украсит любой семейный обед! Все будут в полном  восторге, очень вкусно! Аромат чеснока, хрустящая корочка на картошечке - просто объедение! Отличная идея для обеда или ужина, готовится просто!',

        BadgeIcon: InternationalFood,
        badgeText: 'Национальные',
        bookmarkCount: 124,
        emojiCount: 324,
    },
    {
        image: puri,
        title: 'Пури',
        text: 'Пури - это индийские жареные лепешки, которые готовятся из пресного  теста. Рецепт лепешек пури требует самых доступных ингредиентов, и  времени на приготовление хрустящих лепешек уйдет мало.',
        BadgeIcon: InternationalFood,
        badgeText: 'Национальные',
        bookmarkCount: 124,
        emojiCount: 324,
    },
];
