import { ChevronDownIcon, SmallAddIcon } from '@chakra-ui/icons';
import {
    Button,
    Checkbox,
    HStack,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import { ChangeEvent, FC, KeyboardEvent, ReactNode } from 'react';

type FiltersSelectProps = {
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
    const optionsList = options.map((option) => {
        const isChecked = selectedOptions?.find((selectedOption) => option === selectedOption);
        // debugger;
        return (
            <MenuItem key={option} _hover={{ bg: 'lime.600' }}>
                <Checkbox
                    isChecked={!!isChecked}
                    onChange={handleCheckedFilter(option)}
                    variant='lime'
                >
                    {option}
                </Checkbox>
            </MenuItem>
        );
    });
    return (
        <Menu closeOnSelect={false}>
            <MenuButton
                isDisabled={disabled}
                as={Button}
                w='100%'
                variant='outline'
                h='40px'
                bg='bgColor'
                px='16px'
                rightIcon={<ChevronDownIcon />}
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                textAlign='left'
            >
                {placeholder}
            </MenuButton>
            <MenuList w={{ base: '308px', lg: '384px' }} zIndex='1000'>
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
        </Menu>
    );
};
