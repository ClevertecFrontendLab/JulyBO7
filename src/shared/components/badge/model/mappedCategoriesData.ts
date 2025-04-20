import eggplant from '../../../assets/images/eggplant.png';
// import bread from '../../assets/images/icons/bread.png';
import child from '../../../assets/images/icons/icons8-child-tasty.png';
import frying from '../../../assets/images/icons/icons8-frying-pan.png';
import international from '../../../assets/images/icons/icons8-international-food.png';
import { Category } from '../../../types/categories';
// import leaf from '../../assets/images/icons/leaf.png';
// import pot from '../../assets/images/icons/pot.png';
// import avatar1 from '../../assets/images/main-page-images/Avatarblog.png';
// import kneli from '../../assets/images/main-page-images/kneli.jpg';

type MappedCategoryData = {
    [name in Category]: { image: string; text: string };
};

export const mappedCategoryData: MappedCategoryData = {
    ['vegan']: {
        image: eggplant,
        text: 'Веганская кухня',
    },
    ['children-dish']: {
        image: child,
        text: 'Детские блюда',
    },
    ['national']: {
        image: international,
        text: 'Национальные',
    },
    ['second-dish']: {
        image: frying,
        text: 'Вторые блюда',
    },
};
