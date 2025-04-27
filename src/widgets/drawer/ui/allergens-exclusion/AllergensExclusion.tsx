import { Badge, Box, FormControl, FormLabel, HStack, Switch } from '@chakra-ui/react';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '~/app/store/hooks';

import { selectAllergenFilter } from '../../model/selectors/selectAllergenFilter';
import {
    removeAllAllergensAction,
    removeAllergenAction,
    setAllergenAction,
} from '../../model/slice/filtersSlice';
import { FiltersSelect } from '../filters-select/FiltersSelect';

const allergens = [
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
};
export const AllergensExclusion: FC<AllergensExclusionProps> = ({
    disableSwitch,
    direction = 'column',
    type,
}) => {
    const [enabled, setEnabled] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');

    const filteredAllergens = useSelector(selectAllergenFilter);

    const dispatch = useAppDispatch();

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
            {filteredAllergens.map((allergen) => (
                <Badge key={allergen} variant='outline_lime'>
                    {allergen}
                </Badge>
            ))}
        </HStack>
    );
    let placeholder = filteredAllergens.length === 0 ? 'Выберите из списка...' : allergensTags;

    if (!enabled) {
        placeholder = 'Выберите из списка...';
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
                    isDisabled={disableSwitch}
                    onChange={handleSwitchChange}
                    isChecked={enabled}
                    variant='lime'
                />
            </FormControl>
            <FiltersSelect
                disabled={!enabled}
                options={allergens}
                placeholder={placeholder}
                withInput
                inputValue={inputValue}
                onInputChange={handleInputChange}
                onClickInputButton={handleInputValueAddition}
                onChecked={handleChecked}
                selectedOptions={filteredAllergens}
                type={type}
            />
        </Box>
    );
};
