import ChildTasty from '~/shared/assets/images/icons/icons8-child-tasty.png';
import international from '~/shared/assets/images/icons/icons8-international-food.png';
import leaf from '~/shared/assets/images/icons/leaf.png';

export const veganPageData = {
    headerPage: {
        title: 'Веганская кухня',
        text: 'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.',
    },
    footerPage: {
        title: 'Десерты, выпечка',
        text: 'Без них невозможно представить себе ни современную, ни традиционную  кулинарию. Пироги и печенья, блины, пончики, вареники и, конечно, хлеб - рецепты изделий из теста многообразны и невероятно популярны.',
        withoutImageCards: [
            {
                title: 'Бананово-молочное желе',
                text: 'Молочное желе – это просто, вкусно и полезно, ведь для его приготовления в качестве основы используется молоко.',
                badgeImage: ChildTasty,
                badgeText: 'Детские блюда',
                bookmarkCount: 1,
                emojiCount: 1,
            },
            {
                title: 'Нежный сливочно-сырный крем для кексов',
                text: 'Сливочно-сырным кремом можно украсить кексы, либо другую выпечку, а также этим кремом можно наполнить заварные пирожные.',
                badgeImage: ChildTasty,
                badgeText: 'Детские блюда',
                bookmarkCount: 2,
                emojiCount: 1,
            },
        ],
        withoutTextCards: [
            {
                text: 'Домашние сырные палочки',
                image: ChildTasty,
            },
            {
                text: 'Панкейки',
                image: international,
            },
            {
                text: 'Воздушное банановое печенье на сковороде',
                image: leaf,
            },
        ],
    },
};
