import eggplant from '~/shared/assets/images/eggplant.png';
import bread from '~/shared/assets/images/icons/bread.png';
import frying from '~/shared/assets/images/icons/icons8-frying-pan.png';
import international from '~/shared/assets/images/icons/icons8-international-food.png';
import leaf from '~/shared/assets/images/icons/leaf.png';
import pot from '~/shared/assets/images/icons/pot.png';
import avatar1 from '~/shared/assets/images/main-page-images/Avatarblog.png';
import avatar2 from '~/shared/assets/images/main-page-images/AvatarBlog2.png';
import avatar3 from '~/shared/assets/images/main-page-images/Avatarblog3.png';
import kneli from '~/shared/assets/images/main-page-images/kneli.jpg';
import kotleta from '~/shared/assets/images/main-page-images/kotleta.jpg';
import lapsha from '~/shared/assets/images/main-page-images/lapsha.jpg';
import oladi from '~/shared/assets/images/main-page-images/oladi.jpg';
import salat from '~/shared/assets/images/main-page-images/salat.jpg';
import solyanka from '~/shared/assets/images/main-page-images/solyanka.jpg';
import tom from '~/shared/assets/images/main-page-images/tom.jpg';
import vetchina from '~/shared/assets/images/main-page-images/vetchina.jpg';

export type PageBlock = {
    image?: string;
    title: string;
    text: string;
    badgeImage: string;
    badgeText: string;
    bookmarkCount?: number;
    emojiCount?: number;
    recomend?: { user: string };
};
type Blog = {
    authorName: string;
    image: string;
    email: string;
    text: string;
};
type FooterPage = {
    title: string;
    text: string;
    withoutImageCards: PageBlock[];
    withoutTextCards: { text: string; image: string }[];
};
export type MainPageData = {
    headerPage: { title: string };
    newRecipe: PageBlock[];
    juiciest: PageBlock[];
    blogs: Blog[];
    footerPage: FooterPage;
};
export const mainPageData = {
    headerPage: {
        title: 'Приятного аппетита!',
    },
    //add 5 for swiper
    newRecipe: [
        {
            image: solyanka,
            title: 'Солянка с грибами',
            text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
            badgeImage: pot,
            badgeText: 'Первые блюда',
            bookmarkCount: 1,
        },
        {
            image: kotleta,
            title: 'Капустные котлеты',
            text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
            badgeImage: leaf,
            badgeText: 'Веганские блюда',
            bookmarkCount: 2,
            emojiCount: 1,
        },
        {
            image: oladi,
            title: 'Оладьи на кефире "Пышные"',
            text: 'Очень вкусные и нежные оладьи на кефире. Настоятельно рекомендую пышные кефирные оладьи на завтрак.',
            badgeImage: bread,
            badgeText: 'Десерты,выпечка',
            emojiCount: 1,
        },
        {
            image: salat,
            title: 'Салат "Здоровье"',
            text: 'Сельдерей очень полезен для здоровья, пора набираться витаминов. Не  салат, а сплошное удовольствие:) Вкусный, необычный, а главное быстрый.',
            badgeImage: eggplant,
            badgeText: 'Десерты,выпечка',
            emojiCount: 1,
        },
        {
            image: oladi,
            title: 'Оладьи на кефире "Пышные"',
            text: 'Очень вкусные и нежные оладьи на кефире. Настоятельно рекомендую пышные кефирные оладьи на завтрак.',
            badgeImage: bread,
            badgeText: 'Десерты,выпечка',
            emojiCount: 1,
        },
        {
            image: solyanka,
            title: 'Солянка с грибами',
            text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
            badgeImage: pot,
            badgeText: 'Первые блюда',
            bookmarkCount: 1,
        },
        {
            image: kotleta,
            title: 'Капустные котлеты',
            text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
            badgeImage: leaf,
            badgeText: 'Веганские блюда',
            bookmarkCount: 2,
            emojiCount: 1,
        },
        {
            image: oladi,
            title: 'Оладьи на кефире "Пышные"',
            text: 'Очень вкусные и нежные оладьи на кефире. Настоятельно рекомендую пышные кефирные оладьи на завтрак.',
            badgeImage: bread,
            badgeText: 'Десерты,выпечка',
            emojiCount: 1,
        },
        {
            image: salat,
            title: 'Салат "Здоровье"',
            text: 'Сельдерей очень полезен для здоровья, пора набираться витаминов. Не  салат, а сплошное удовольствие:) Вкусный, необычный, а главное быстрый.',
            badgeImage: eggplant,
            badgeText: 'Десерты,выпечка',
            emojiCount: 1,
        },
        {
            image: oladi,
            title: 'Оладьи на кефире "Пышные"',
            text: 'Очень вкусные и нежные оладьи на кефире. Настоятельно рекомендую пышные кефирные оладьи на завтрак.',
            badgeImage: bread,
            badgeText: 'Десерты,выпечка',
            emojiCount: 1,
        },
    ],
    juiciest: [
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
            recomend: {
                user: 'Alex Cook',
                avatar: avatar2,
            },
        },
    ],
    blogs: [
        {
            authorName: 'Елена Высоцкая',
            image: avatar1,
            email: '@elenapovar',
            text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        },
        {
            authorName: 'Alex Cook',
            image: avatar2,
            email: '@funtasticooking',
            text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        },
        {
            authorName: 'Екатерина Константинопольская',
            image: avatar3,
            email: '@bake_and_pie',
            text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
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
