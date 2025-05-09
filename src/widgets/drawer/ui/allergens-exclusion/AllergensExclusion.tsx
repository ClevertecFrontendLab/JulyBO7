import { Badge, Box, FormControl, FormLabel, HStack, Switch, Text } from '@chakra-ui/react';
import { ChangeEvent, FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '~/app/store/hooks';

import { selectAllergenFilter } from '../../model/selectors/selectAllergenFilter';
import {
    removeAllAllergensAction,
    removeAllergenAction,
    setAllergenAction,
} from '../../model/slice/filtersSlice';
import { FiltersSelect } from '../filters-select/FiltersSelect';

const allergensList = [
    'Молочные продукты',
    'Яйцо',
    'Рыба',
    'Моллюски',
    'Орехи',
    'Томат',
    'Цитрусовые',
    'Клубника (ягоды)',
    'Шоколад',
];

type AllergensExclusionProps = {
    type: 'drawer' | 'header';
    direction?: 'row' | 'column';
    disableSwitch?: boolean;
    forTest?: string;
    forTestSelect?: string;
    forTestCheckbox?: string;
};
export const AllergensExclusion: FC<AllergensExclusionProps> = (props) => {
    const {
        disableSwitch,
        direction = 'column',
        type,
        forTest,
        forTestSelect,
        forTestCheckbox,
    } = props;

    const [enabled, setEnabled] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');

    const dispatch = useAppDispatch();
    const allergens = useAppSelector(selectAllergenFilter);

    if (allergens.length > 0 && !enabled) {
        setEnabled(true);
    }

    const handleInputChange = (value: string) => {
        setInputValue(value);
    };
    const handleInputValueAddition = () => {
        if (inputValue) {
            dispatch(setAllergenAction(inputValue));
            setInputValue('');
        }
    };

    const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.currentTarget.checked;
        setEnabled(checked);
        if (!checked) {
            dispatch(removeAllAllergensAction());
            setInputValue('');
        }
    };
    const handleChecked = (checked: boolean, allergen: string) => {
        if (checked) {
            dispatch(setAllergenAction(allergen));
        } else {
            dispatch(removeAllergenAction(allergen));
        }
    };
    const allergensTags = (
        <HStack flexWrap='wrap'>
            {allergens.map((allergen) => (
                <Badge key={allergen} variant='outline_lime'>
                    {allergen}
                </Badge>
            ))}
        </HStack>
    );

    const placeholderText = (
        <Text fontSize='16px' fontWeight={400} color='gray.150'>
            Выберите из списка...
        </Text>
    );
    let placeholder = allergens.length === 0 ? placeholderText : allergensTags;

    if (!enabled) {
        placeholder = placeholderText;
    }

    useEffect(() => {
        if (disableSwitch) {
            setEnabled(false);
        }
    }, [disableSwitch]);

    return (
        <Box display='flex' flexDirection={direction} gap={{ base: '8px' }}>
            <FormControl display='flex' alignItems='center'>
                <FormLabel textStyle='m' mr='8px' mb='0'>
                    Исключить аллергены
                </FormLabel>
                <Switch
                    data-test-id={forTest}
                    isDisabled={disableSwitch}
                    onChange={handleSwitchChange}
                    isChecked={enabled}
                    variant='lime'
                />
            </FormControl>
            <FiltersSelect
                isClose={!enabled}
                disabled={!enabled}
                options={allergensList}
                placeholder={placeholder}
                withInput
                inputValue={inputValue}
                onInputChange={handleInputChange}
                onClickInputButton={handleInputValueAddition}
                onChecked={handleChecked}
                selectedOptions={allergens}
                type={type}
                forTest={forTestSelect}
                forTestCheckbox={forTestCheckbox}
            />
        </Box>
    );
};
