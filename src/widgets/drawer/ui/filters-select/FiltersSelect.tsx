import { ChevronDownIcon, ChevronUpIcon, SmallAddIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Checkbox,
    HStack,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
} from '@chakra-ui/react';
import { ChangeEvent, FC, KeyboardEvent, ReactNode } from 'react';

type FiltersSelectProps = {
    type: 'drawer' | 'header';
    placeholder: ReactNode;
    options: string[];
    selectedOptions?: string[];
    onChecked?: (cheked: boolean, filterValue: string) => void;
    disabled?: boolean;
    withInput?: boolean;
    inputValue?: string;
    onInputChange?: (value: string) => void;
    onClickInputButton?: () => void;
};

export const FiltersSelect: FC<FiltersSelectProps> = (props) => {
    const {
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
    } = props;

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
    };
    const optionsList = options.map((option, idx) => {
        const isChecked = selectedOptions?.find((selectedOption) => option === selectedOption);

        return (
            <MenuItem
                key={option}
                _hover={{ bg: 'lime.100' }}
                h='32px'
                px='16px'
                bg={idx % 2 ? 'bgColor' : 'gray.300'}
            >
                <Checkbox
                    isChecked={!!isChecked}
                    onChange={handleCheckedFilter(option)}
                    variant='lime'
                >
                    <Text textStyle='s'>{option}</Text>
                </Checkbox>
            </MenuItem>
        );
    });
    return (
        <Menu closeOnSelect={false}>
            {({ isOpen }) => (
                <Box position='relative' w='100%'>
                    <MenuButton
                        _hover={{ bg: 'transparent' }}
                        _active={{ bg: 'transparent' }}
                        isDisabled={disabled}
                        as={Button}
                        w={type === 'drawer' ? { base: '308px', lg: '400px' } : '234px'}
                        variant='outline'
                        minH='40px'
                        h='auto'
                        bg='bgColor'
                        border={isOpen ? '1px solid #c4ff61' : '1px solid  rgba(0, 0, 0, 0.48)'}
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
                    <MenuList
                        w={type === 'drawer' ? { base: '308px', lg: '400px' } : '234px'}
                        zIndex='1000'
                    >
                        {optionsList}
                        {withInput && (
                            <HStack p='8px 8px 8px 24px' w='100%'>
                                <Input
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onKeyDown={handleEnterClick}
                                    placeholder='Другой аллерген'
                                    variant='outline'
                                    size='s'
                                />
                                <SmallAddIcon
                                    as='button'
                                    rounded='50%'
                                    color='bgColor'
                                    bg='lime.600'
                                    onClick={onClickInputButton}
                                />
                            </HStack>
                        )}
                    </MenuList>
                </Box>
            )}
        </Menu>
    );
};
