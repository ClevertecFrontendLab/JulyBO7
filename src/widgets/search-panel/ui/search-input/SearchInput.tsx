import { SearchIcon } from '@chakra-ui/icons';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '~/app/store/hooks';
import { SEARCH_BUTTON, SEARCH_INPUT } from '~/shared/constants/tests';
import { selectAllergenFilter, selectSearchString, setSearchStringAction } from '~/widgets/drawer';

type SearchInputProps = {
    onFocus: () => void;
    onSearch?: () => void;
    clearInput?: boolean;
    borderColor?: string;
};

export const SearchInput: FC<SearchInputProps> = (props) => {
    const { onSearch, clearInput, onFocus, borderColor } = props;

    const allergens = useSelector(selectAllergenFilter);
    const searchString = useSelector(selectSearchString);

    const dispatch = useAppDispatch();

    const [inputValue, setInputValue] = useState<string>(searchString);
    const inputRef = useRef<null | HTMLInputElement>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setInputValue(value);
    };
    const handleSearch = () => {
        dispatch(setSearchStringAction(inputValue));
        onSearch?.();
    };

    useEffect(() => {
        if (clearInput) {
            setInputValue('');
        }
    }, [clearInput]);

    useEffect(() => {
        if (inputRef.current) {
            const input: HTMLInputElement = inputRef.current;
            inputRef.current.addEventListener('focus', onFocus);
            return () => {
                input.removeEventListener('focus', onFocus);
            };
        }
    }, [onFocus]);

    return (
        <InputGroup h='100%'>
            <Input
                data-test-id={SEARCH_INPUT}
                ref={inputRef}
                variant='search'
                h='100%'
                borderColor={borderColor ? borderColor : 'gray.100'}
                borderRadius='6px'
                placeholder='Название или ингредиент...'
                onChange={handleInputChange}
                value={inputValue}
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
