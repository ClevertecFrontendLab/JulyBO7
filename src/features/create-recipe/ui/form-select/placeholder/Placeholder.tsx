import { Badge, HStack, Text, useMediaQuery } from '@chakra-ui/react';
import React from 'react';

import { Category } from '~/shared/types/categories';

type PlaceholderProps = {
    selectedOptions: Category[];
};

export const Placeholder: React.FC<PlaceholderProps> = (props) => {
    const { selectedOptions } = props;
    const [isSmallerThan1440] = useMediaQuery('(max-width: 1400px)');

    let tagNumber;
    let endIndex;
    if (isSmallerThan1440) {
        tagNumber = selectedOptions.length - 1 > 0 ? selectedOptions.length - 1 : null;
        endIndex = 2;
    } else {
        tagNumber = selectedOptions.length - 2 > 0 ? selectedOptions.length - 2 : null;
        endIndex = 3;
    }

    const categoriesTags = (
        <HStack flexWrap='wrap'>
            {selectedOptions.slice(0, endIndex).map((selectedOption, idx) => {
                let badgeContent;

                if (!isSmallerThan1440) {
                    badgeContent = idx === 0 || idx === 1 ? selectedOption.title : `+ ${tagNumber}`;
                } else {
                    badgeContent = idx === 0 ? selectedOption.title : `+ ${tagNumber}`;
                }

                return (
                    <Badge
                        key={selectedOption._id}
                        variant='outline_lime'
                        textStyle='xs'
                        fontWeight={500}
                    >
                        {badgeContent}
                    </Badge>
                );
            })}
        </HStack>
    );
    const placeholderText = (
        <Text fontSize='16px' fontWeight={400} color='gray.150'>
            Выберите из списка...
        </Text>
    );
    const placeholder = selectedOptions.length === 0 ? placeholderText : categoriesTags;

    return placeholder;
};
