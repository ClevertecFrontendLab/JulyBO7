import { SearchIcon } from '@chakra-ui/icons';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { ChangeEvent, FC, useState } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '~/app/store/hooks';
import { SEARCH_BUTTON, SEARCH_INPUT } from '~/shared/constants/tests';
import { selectAllergenFilter, setSearchStringAction } from '~/widgets/drawer';

type SearchInputProps = {
    onChange?: (value: string) => void;
    onSearch?: () => void;
};

export const SearchInput: FC<SearchInputProps> = (props) => {
    const { onChange, onSearch } = props;
    const allergens = useSelector(selectAllergenFilter);
    const dispatch = useAppDispatch();

    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setInputValue(value);
        onChange?.(value);
    };
    const handleSearch = () => {
        dispatch(setSearchStringAction(inputValue));
        onSearch?.();
    };

    return (
        <InputGroup h='100%'>
            <Input
                data-test-id={SEARCH_INPUT}
                variant='search'
                h='100%'
                borderColor='gray.100'
                borderRadius='6px'
                placeholder='Название или ингредиент...'
                onChange={handleInputChange}
                // onKeyDown={handleEnterClick}
                value={inputValue}
                // border={isNotFoundWithoutAllergen ? ' 2px solid #e53e3e' : inputBorder}
            />
            <InputRightElement h='100%'>
                <Button
                    data-test-id={SEARCH_BUTTON}
                    variant='clear'
                    isDisabled={
                        (inputValue && inputValue.length > 2) || allergens.length > 0 ? false : true
                    }
                    onClick={handleSearch}
                    pointerEvents={
                        (inputValue && inputValue.length > 2) || allergens.length > 0
                            ? 'auto'
                            : 'none'
                    }
                >
                    <SearchIcon color='primaryColor' />
                </Button>
            </InputRightElement>
        </InputGroup>
    );
};
