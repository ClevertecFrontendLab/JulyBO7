import { Badge, Box, FormControl, FormLabel, HStack, Switch, Text } from '@chakra-ui/react';
import { ChangeEvent, FC, useEffect, useState } from 'react';

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
    filteredAllergens: string[];
    onRemoveAllergen: (value: string) => void;
    onSetAllergen: (value: string) => void;
    type: 'drawer' | 'header';
    direction?: 'row' | 'column';
    disableSwitch?: boolean;
    onTurnOfSwitch?: () => void;
    forTest?: string;
    forTestSelect?: string;
    forTestCheckbox?: string;
};
export const AllergensExclusion: FC<AllergensExclusionProps> = (props) => {
    const {
        disableSwitch,
        direction = 'column',
        type,
        filteredAllergens,
        onRemoveAllergen,
        onSetAllergen,
        onTurnOfSwitch,
        forTest,
        forTestSelect,
        forTestCheckbox,
    } = props;

    const [enabled, setEnabled] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');

    if (filteredAllergens.length > 0 && !enabled) {
        setEnabled(true);
    }

    const handleInputChange = (value: string) => {
        setInputValue(value);
    };
    const handleInputValueAddition = () => {
        if (inputValue) {
            onSetAllergen(inputValue);
            setInputValue('');
        }
    };

    const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.currentTarget.checked;
        setEnabled(checked);
        if (!checked) {
            onTurnOfSwitch?.();
            setInputValue('');
        }
    };
    const handleChecked = (checked: boolean, allergen: string) => {
        if (checked) {
            onSetAllergen(allergen);
        } else {
            onRemoveAllergen(allergen);
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
    let placeholder =
        filteredAllergens.length === 0 ? (
            <Text fontSize='16px' fontWeight={400} color='gray.150'>
                Выберите из списка...
            </Text>
        ) : (
            allergensTags
        );

    if (!enabled) {
        placeholder = (
            <Text fontSize='16px' fontWeight={400} color='gray.150'>
                Выберите из списка...
            </Text>
        );
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
                options={allergens}
                placeholder={placeholder}
                withInput
                inputValue={inputValue}
                onInputChange={handleInputChange}
                onClickInputButton={handleInputValueAddition}
                onChecked={handleChecked}
                selectedOptions={filteredAllergens}
                type={type}
                forTest={forTestSelect}
                forTestCheckbox={forTestCheckbox}
            />
        </Box>
    );
};
