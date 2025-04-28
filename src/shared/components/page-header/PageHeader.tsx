import { SearchIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Heading,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    VStack,
} from '@chakra-ui/react';
import { ChangeEvent, FC, KeyboardEvent, ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';

import { ApplicationState } from '~/app/store/configure-store';
import { useAppDispatch } from '~/app/store/hooks';
import FilterMenu from '~/shared/assets/icons/components/Filter';
import { AllergensExclusion, Drawer } from '~/widgets/drawer';

import { removeAllergenAction, setAllergenAction } from './model/slice/page-slice';

type PageHeaderProps = {
    isNotFoundWithoutAllergen?: boolean;
    inputValue: string;
    onChange: (value: string) => void;
    title: ReactElement | string;
    onSearch: () => void;
    text?: string;
    inputBorderStyle?: string;
    isFound?: boolean;
};

export const PageHeader: FC<PageHeaderProps> = (props) => {
    const { title, text, onSearch, inputValue, onChange, isFound, isNotFoundWithoutAllergen } =
        props;
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const allergens = useSelector((state: ApplicationState) => state.pages.allergens);

    const handleDrawerClose = () => {
        setIsOpenDrawer(false);
    };
    const handleDrawerOpen = () => {
        setIsOpenDrawer(true);
    };
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        onChange(value);
        if (!value) {
            setIsActive(false);
        }
    };
    const handleSearch = () => {
        setIsActive(true);
        onSearch();
    };
    const handleEnterClick = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter' && inputValue.length >= 3) {
            handleSearch();
        }
    };
    const handleAllergenItemRemove = (allergen: string) => {
        dispatch(removeAllergenAction(allergen));
    };
    const handleAllergenItemSet = (allergen: string) => {
        dispatch(setAllergenAction(allergen));
    };
    const inputBorder =
        isActive && !isFound
            ? '1px solid red'
            : isActive && isFound
              ? '1px solid green'
              : '1px solid gray';

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
                        data-test-id='filter-button'
                        onClick={handleDrawerOpen}
                        variant='outline'
                        h={{ base: '32px', lg: '48px' }}
                        w={{ base: '32px', lg: '48px' }}
                        p={{ base: '0 9px', lg: '0 12px' }}
                    >
                        <FilterMenu />
                    </Button>

                    <InputGroup h='100%'>
                        <Input
                            data-test-id='search-input'
                            variant='search'
                            h='100%'
                            borderColor='gray.100'
                            borderRadius='6px'
                            placeholder='Название или ингредиент...'
                            onChange={handleInputChange}
                            onKeyDown={handleEnterClick}
                            value={inputValue}
                            border={isNotFoundWithoutAllergen ? ' 2px solid #e53e3e' : inputBorder}
                        />
                        <InputRightElement h='100%'>
                            <Button
                                data-test-id='search-button'
                                variant='clear'
                                isDisabled={inputValue?.length < 3}
                                onClick={handleSearch}
                                pointerEvents={inputValue?.length < 3 ? 'none' : 'auto'}
                            >
                                <SearchIcon color='primaryColor' />
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </HStack>
                <Box display={{ base: 'none', lg: 'block' }} w='100%'>
                    <AllergensExclusion
                        forTest='allergens-switcher'
                        forTestSelect='allergens-menu-button'
                        forTestCheckbox='allergen'
                        direction='row'
                        type='header'
                        filteredAllergens={allergens}
                        onSetAllergen={handleAllergenItemSet}
                        onRemoveAllergen={handleAllergenItemRemove}
                    />
                </Box>
            </VStack>
            <Drawer isOpen={isOpenDrawer} onClose={handleDrawerClose} />
        </VStack>
    );
};
