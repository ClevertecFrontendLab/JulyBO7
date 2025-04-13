import ChildTasty from '~/shared/assets/images/icons/icons8-child-tasty.png';
import frying from '~/shared/assets/images/icons/icons8-frying-pan.png';
import FryingPan from '~/shared/assets/images/icons/icons8-frying-pan.png';
import international from '~/shared/assets/images/icons/icons8-international-food.png';
import Dishwasher from '~/shared/assets/images/icons/mortar.png';
import pot from '~/shared/assets/images/icons/pot.png';
import avatar1 from '~/shared/assets/images/main-page-images/Avatarblog.png';
import avatar2 from '~/shared/assets/images/main-page-images/AvatarBlog2.png';
import kneli from '~/shared/assets/images/main-page-images/kneli.jpg';
import lapsha from '~/shared/assets/images/main-page-images/lapsha.jpg';
import tom from '~/shared/assets/images/main-page-images/tom.jpg';
import vetchina from '~/shared/assets/images/main-page-images/vetchina.jpg';
import potato from '~/shared/assets/images/potato.jpg';
import potatoRolls from '~/shared/assets/images/potato-rolls.jpg';
import teftels from '~/shared/assets/images/teftels.jpg';
import vegetable from '~/shared/assets/images/veget.jpg';

export type PageBlock = {
    image?: string;
    title: string;
    text: string;
    badgeImage: string;
    badgeText: string;
    bookmarkCount?: number;
    emojiCount?: number;
    recomend?: { user: string; avatar: string };
};

type FooterPage = {
    title: string;
    text: string;
    withoutImageCards: PageBlock[];
    withoutTextCards: { text: string; image: string }[];
};
export type JuiciestPageData = {
    headerPage: { title: string };
    content: PageBlock[];
    footerPage: FooterPage;
};
export const juiciestPageData = {
    headerPage: {
        title: 'Самое сочное',
    },

    content: [
        {
            image: lapsha,
            title: 'Лапша с курицей и шафраном',
            text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
            badgeImage: frying,
            badgeText: 'Вторые блюда',
            bookmarkCount: 258,
            emojiCount: 342,
            recomend: {
                user: 'Alex Cook',
                avatar: avatar2,
            },
        },
        {
            image: tom,
            title: 'Том-ям с капустой кимчи',
            text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
            badgeImage: international,
            badgeText: 'Национальные',
            bookmarkCount: 124,
            emojiCount: 324,
        },
        {
            image: vetchina,
            title: 'Пряная ветчина по итальянски',
            text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
            badgeImage: frying,
            badgeText: 'Вторые блюда',
            bookmarkCount: 159,
            emojiCount: 287,
            recomend: {
                user: 'Елена Высоцкая',
                avatar: avatar1,
            },
        },
        {
            image: kneli,
            title: 'Кнели со спагетти',
            text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
            badgeImage: frying,
            badgeText: 'Вторые блюда',
            bookmarkCount: 85,
            emojiCount: 152,
        },
        {
            image: potato,
            title: 'Картошка, тушенная с болгарским перцем и фасолью в томатном соусе',
            text: 'Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, -  вариант сытного блюда на каждый день. Фасоль в данном случае заменяет  мясо, делая рагу сытным и питательным. Чтобы сократить время  приготовления, возьмём консервированную фасоль. Блюдо хоть и простое, но в полной мере наполнено ароматами и имеет выразительный вкус за счёт  добавления томатной пасты.',

            badgeImage: international,
            badgeText: 'Национальные',
            bookmarkCount: 85,
            emojiCount: 152,
        },
        {
            image: potatoRolls,
            title: 'Картофельные рулетики с грибами',
            text: 'Рекомендую всем приготовить постное блюдо из картофеля и грибов.  Готовится это блюдо без яиц, без мяса и без сыра, из самых простых  ингредиентов, а получается очень вкусно и сытно. Постный рецепт  картофельных рулетиков с грибами, в томатном соусе, - на обед, ужин и  даже на праздничный стол!',

            badgeImage: ChildTasty,
            badgeText: 'Детские блюда',
            bookmarkCount: 85,
            emojiCount: 152,
        },
        {
            image: vegetable,
            title: 'Овощная лазанья из лаваша',
            text: 'Большое, сытное блюдо для ценителей блюд без мяса! Такая лазанья  готовится с овощным соусом и соусом бешамель, а вместо листов для  лазаньи используется тонкий лаваш.',

            badgeImage: Dishwasher,
            badgeText: 'Блюда на гриле',
            bookmarkCount: 85,
            emojiCount: 152,
        },
        {
            image: teftels,

            title: 'Тефтели из булгура и чечевицы, запечённые в томатном соусе',
            text: 'Тефтели из булгура и чечевицы – яркие и питательные, отлично подходят  для постного и вегетарианского меню. Тефтели получаются нежными, а также сочными и ароматными благодаря использованию томатного соуса и душистых пряностей.',

            badgeImage: FryingPan,
            badgeText: 'Вторые блюда',
            bookmarkCount: 85,
            emojiCount: 152,
        },
    ],

    footerPage: {
        title: 'Веганская кухня',
        text: 'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.',
        withoutImageCards: [
            {
                title: 'Картошка, тушенная с болгарским перцем и фасолью в томатном соусе',
                text: 'Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, -  вариант сытного блюда на каждый день. Фасоль в данном случае заменяет мясо, делая рагу сытным и питательным. Чтобы сократить время  приготовления, возьмём консервированную фасоль. Блюдо хоть и простое, но в полной мере наполнено ароматами и имеет выразительный вкус за счёт  добавления томатной пасты.',
                badgeImage: frying,
                badgeText: 'Вторые блюда',
                bookmarkCount: 1,
                emojiCount: 1,
            },
            {
                title: 'Капустные котлеты',
                text: 'Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных  блюд.',
                badgeImage: frying,

                badgeText: 'Вторые блюда',
                bookmarkCount: 2,
                emojiCount: 1,
            },
        ],
        withoutTextCards: [
            {
                text: 'Стейк для вегетарианцев',
                image: frying,
            },
            {
                text: 'Котлеты из гречки и фасоли',
                image: frying,
            },
            {
                text: 'Сырный суп с лапшой и брокколи',
                image: pot,
            },
        ],
    },
};
