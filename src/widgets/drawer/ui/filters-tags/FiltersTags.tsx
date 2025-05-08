import { CloseIcon as CloseIconChakra, Text } from '@chakra-ui/icons';
import { Badge } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '~/app/store/hooks';
import { FILTER_TAG } from '~/shared/constants/tests';

import { selectFilters } from '../../model/selectors/selectFilters';
import {
    removeAllergenAction,
    removeAuthorAction,
    removeCategoryAction,
    removeMeetTypeAction,
    removeSideTypeAction,
} from '../../model/slice/filtersSlice';

type FiltersTagsProps = {
    withAllergens?: boolean;
};

export const FiltersTags: React.FC<FiltersTagsProps> = ({ withAllergens = true }) => {
    const filters = useSelector(selectFilters);
    const dispatch = useAppDispatch();

    let filtersTags = [
        ...filters.author,
        ...filters.category,
        ...filters.meetType,
        ...filters.sideType,
    ];
    filtersTags = withAllergens ? [...filtersTags, ...filters.allergen] : filtersTags;

    const handleFilterRemove = (filterValue: string) => () => {
        const meet = filters.meetType.find((type) => type === filterValue);
        const side = filters.sideType.find((type) => type === filterValue);
        const author = filters.author.find((type) => type === filterValue);
        const category = filters.category.find((type) => type === filterValue);
        const allergen = filters.allergen.find((type) => type === filterValue);

        if (meet) {
            dispatch(removeMeetTypeAction(filterValue));
        }
        if (side) {
            dispatch(removeSideTypeAction(filterValue));
        }
        if (author) {
            dispatch(removeAuthorAction(filterValue));
        }
        if (category) {
            dispatch(removeCategoryAction(filterValue));
        }
        if (allergen) {
            dispatch(removeAllergenAction(filterValue));
        }
    };
    const tagsList = filtersTags.map((tag) => (
        <Badge data-test-id={FILTER_TAG} key={tag} variant='solidWithIcon'>
            <Text as='span'>{tag}</Text>
            <CloseIconChakra
                onClick={handleFilterRemove(tag)}
                as='button'
                fill='lime.700'
                w='10px'
                h='10px'
                opacity='50%'
            />
        </Badge>
    ));
    return tagsList;
};
