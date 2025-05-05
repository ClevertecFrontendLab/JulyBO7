import { Box, Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { FC, ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';

import { ApplicationState } from '~/app/store/configure-store';
import { useAppDispatch } from '~/app/store/hooks';
import FilterMenu from '~/shared/assets/icons/components/Filter';
import {
    ALLERGEN,
    ALLERGENS_MENU_BUTTON,
    ALLERGENS_SWITCHER,
    FILTER_BUTTON,
} from '~/shared/constants/tests';
import {
    AllergensExclusion,
    Drawer,
    removeAllAllergensAction,
    removeAllergenAction,
    setAllergenAction,
} from '~/widgets/drawer';

import { SearchInput } from './search-input/SearchInput';

type SearchPanelProps = {
    isNotFoundWithoutAllergen?: boolean;
    title?: ReactElement | string;
    onSearch?: () => void;
    text?: string;
    inputBorderStyle?: string;
    isFound?: boolean;
    onOpenDrawer?: () => void;
    onClearFilters?: () => void;
};

export const SearchPanel: FC<SearchPanelProps> = (props) => {
    const { title, text, onSearch, onOpenDrawer, onClearFilters } = props;
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [_, setIsActive] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const allergens = useSelector((state: ApplicationState) => state.filters.allergen);

    const handleDrawerClose = () => {
        setIsOpenDrawer(false);
    };
    const handleDrawerOpen = () => {
        setIsOpenDrawer(true);
    };
    const handleInputChange = (value: string) => {
        if (!value) {
            setIsActive(false);
        }
    };
    const handleSearch = () => {
        setIsActive(true);
        onSearch && onSearch();
    };
    // const handleEnterClick = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.code === 'Enter' && inputValue.length >= 3) {
    //         handleSearch();
    //     }
    // };
    const handleAllergenItemRemove = (allergen: string) => {
        dispatch(removeAllergenAction(allergen));
    };
    const handleAllergenItemSet = (allergen: string) => {
        dispatch(setAllergenAction(allergen));
    };
    const handleAllAllergenRemove = () => {
        dispatch(removeAllAllergensAction());
    };
    // const inputBorder =
    //     isActive && !isFound
    //         ? '1px solid red'
    //         : isActive && isFound
    //           ? '1px solid green'
    //           : '1px solid gray';

    return (
        <VStack
            w={{ base: '328px', md: '727px' }}
            paddingTop={{ base: '16px', lg: '32px' }}
            paddingBottom={{ lg: '32px' }}
            align='center'
            borderRadius='24px'
        >
            <Heading
                mb={{ base: '16px', lg: '32px' }}
                fontSize={{ base: '24px', lg: '2xl' }}
                fontWeight={700}
                lineHeight={{ base: '133%', lg: '100%' }}
            >
                {title}
            </Heading>
            {text && (
                <Text
                    color='gray.100'
                    textStyle={{ base: 's', lg: 'm' }}
                    textAlign='center'
                    mb={{ base: '16px', lg: '32px' }}
                >
                    {text}
                </Text>
            )}
            <VStack w={{ base: '328px', md: '448px', lg: '520px' }} gap='16px'>
                <HStack spacing='12px' h={{ base: '32px', lg: '48px' }} w='100%'>
                    <Button
                        data-test-id={FILTER_BUTTON}
                        onClick={handleDrawerOpen}
                        variant='outline'
                        h={{ base: '32px', lg: '48px' }}
                        w={{ base: '32px', lg: '48px' }}
                        p={{ base: '0 9px', lg: '0 12px' }}
                    >
                        <FilterMenu />
                    </Button>
                    <SearchInput onChange={handleInputChange} onSearch={handleSearch} />
                </HStack>
                <Box display={{ base: 'none', lg: 'block' }} w='100%'>
                    <AllergensExclusion
                        forTest={ALLERGENS_SWITCHER}
                        forTestSelect={ALLERGENS_MENU_BUTTON}
                        forTestCheckbox={ALLERGEN}
                        direction='row'
                        type='header'
                        filteredAllergens={allergens}
                        onSetAllergen={handleAllergenItemSet}
                        onRemoveAllergen={handleAllergenItemRemove}
                        onTurnOfSwitch={handleAllAllergenRemove}
                    />
                </Box>
            </VStack>
            <Drawer
                isOpen={isOpenDrawer}
                onFindRecipe={onSearch}
                onClose={handleDrawerClose}
                onOpen={onOpenDrawer}
                onClearFilters={onClearFilters}
            />
        </VStack>
    );
};
