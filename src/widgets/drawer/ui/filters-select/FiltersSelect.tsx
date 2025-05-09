import { ChevronDownIcon, ChevronUpIcon, SmallAddIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Checkbox,
    HStack,
    Input,
    Menu,
    MenuButton,
    MenuList,
    Text,
} from '@chakra-ui/react';
import { ChangeEvent, FC, KeyboardEvent, ReactNode, useRef } from 'react';

import {
    ADD_ALLERGEN_BUTTON,
    ADD_OTHER_ALLERGENS,
    ALLERGEN,
    ALLERGENS_MENU,
    CHECKBOX_VEGAN_CUISINE,
} from '~/shared/constants/tests';

type FiltersSelectProps = {
    type: 'drawer' | 'header';
    placeholder: ReactNode;
    options: string[];
    isClose?: boolean;
    selectedOptions?: string[];
    onChecked?: (cheked: boolean, filterValue: string) => void;
    disabled?: boolean;
    withInput?: boolean;
    inputValue?: string;
    onInputChange?: (value: string) => void;
    onClickInputButton?: () => void;
    forTest?: string;
    forTestCheckbox?: string;
};

export const FiltersSelect: FC<FiltersSelectProps> = (props) => {
    const {
        isClose,
        placeholder,
        options,
        disabled,
        withInput,
        inputValue,
        onInputChange,
        onClickInputButton,
        selectedOptions,
        onChecked,
        type,
        forTest,
        forTestCheckbox,
    } = props;
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        onInputChange?.(e.currentTarget.value);
    };

    const handleEnterClick = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickInputButton?.();
        }
    };

    const handleCheckedFilter = (filterValue: string) => (e: ChangeEvent<HTMLInputElement>) => {
        onChecked?.(e.currentTarget.checked, filterValue);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    const optionsList = options.map((option, idx) => {
        const isChecked = selectedOptions?.find((selectedOption) => option === selectedOption);
        let testId;
        if (forTestCheckbox === CHECKBOX_VEGAN_CUISINE && option === 'Веганская кухня') {
            testId = CHECKBOX_VEGAN_CUISINE;
        } else if (forTestCheckbox === ALLERGEN) {
            testId = `${ALLERGEN}-${idx}`;
        }

        return (
            <Box
                key={option}
                _hover={{ bg: 'lime.100' }}
                h='32px'
                px='16px'
                bg={idx % 2 ? 'bgColor' : 'gray.300'}
            >
                <Checkbox
                    data-test-id={testId}
                    isChecked={!!isChecked}
                    onChange={handleCheckedFilter(option)}
                    variant='lime'
                    autoFocus={false}
                >
                    <Text textStyle='s'>{option}</Text>
                </Checkbox>
            </Box>
        );
    });
    return (
        <Menu closeOnSelect={false}>
            {({ isOpen }) => (
                <Box position='relative' w='100%'>
                    <MenuButton
                        data-test-id={forTest}
                        _hover={{ bg: 'transparent' }}
                        _active={{ bg: 'transparent' }}
                        isDisabled={disabled}
                        as={Button}
                        w={type === 'drawer' ? { base: '308px', lg: '400px' } : '234px'}
                        variant='outline'
                        minH='40px'
                        h='auto'
                        bg='bgColor'
                        border={isOpen ? '1px solid #c4ff61' : '1px solid  rgba(0, 0, 0, 0.08)'}
                        px='16px'
                        rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        textAlign='left'
                        p='10px 16px'
                        textStyle='s'
                    >
                        {placeholder}
                    </MenuButton>
                    {!isOpen || isClose ? null : (
                        <MenuList
                            data-test-id={ALLERGENS_MENU}
                            w={type === 'drawer' ? { base: '308px', lg: '400px' } : '234px'}
                            zIndex='1000'
                        >
                            {optionsList}
                            {withInput && (
                                <HStack p='8px 8px 8px 24px' w='100%'>
                                    <Input
                                        ref={inputRef}
                                        autoFocus={true}
                                        data-test-id={ADD_OTHER_ALLERGENS}
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        onKeyDown={handleEnterClick}
                                        placeholder='Другой аллерген'
                                        variant='outline'
                                        size='s'
                                    />
                                    <SmallAddIcon
                                        data-test-id={ADD_ALLERGEN_BUTTON}
                                        as='button'
                                        rounded='50%'
                                        color='bgColor'
                                        bg='lime.600'
                                        onClick={onClickInputButton}
                                    />
                                </HStack>
                            )}
                        </MenuList>
                    )}
                </Box>
            )}
        </Menu>
    );
};
