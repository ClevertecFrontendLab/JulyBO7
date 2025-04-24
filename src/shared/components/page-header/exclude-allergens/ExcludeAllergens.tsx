import { Badge, FormControl, FormLabel, HStack, Switch } from '@chakra-ui/react';
import { ChangeEvent, FC, useState } from 'react';

import { Checkbox } from '../../checkbox/ui/Checkbox';
import { Select } from '../../select/Select';

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
type ExcludeAllergensProps = {
    selectedAllergens: string[];
    onAllergenSelect: (value: string[]) => void;
    onSwitchClick?: (value: boolean) => void;
};
export const ExcludeAllergens: FC<ExcludeAllergensProps> = ({
    onSwitchClick,
    onAllergenSelect,
    selectedAllergens,
}) => {
    const [isExcludeAllergens, setIsExcludeAllergens] = useState<boolean>(false);
    // const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
    const [anotherAllergen, setAnotherAllergen] = useState<string>();

    //обработчик switch:
    const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.currentTarget.checked;
        setIsExcludeAllergens(checked);
        if (!checked) {
            // setSelectedAllergens([]);
            onAllergenSelect([]);
            // onSwitchClick?.([])
            setAnotherAllergen('');
        }
        onSwitchClick?.(checked);
    };
    //обработчик чекбокса = добавление аллергена:
    const handleAllergenSelect = (allergen: string) => (checked: boolean) => {
        if (checked) {
            // setSelectedAllergens([...selectedAllergens, allergen]);
            onAllergenSelect([...selectedAllergens, allergen]);
        } else {
            onAllergenSelect(selectedAllergens.filter((item) => item !== allergen));
        }
    };
    //обработчик кнопки = добавление своего аллергена:
    const handleAllergenAddition = () => {
        if (anotherAllergen) {
            onAllergenSelect([...selectedAllergens, anotherAllergen]);
            setAnotherAllergen('');
        }
    };
    //обработчик инпута = добавление своего аллергена:
    const handleInputChange = (value: string) => {
        if (value.trim()) {
            setAnotherAllergen(value);
        }
    };

    const selectedAllergensBadges = (
        <HStack flexWrap='wrap'>
            {selectedAllergens.map((allergen) => (
                <Badge key={allergen} variant='outline_lime'>
                    {allergen}
                </Badge>
            ))}
        </HStack>
    );
    const allergenOptions = allergens.map((allergen) => (
        <Checkbox
            key={allergen}
            onChecked={handleAllergenSelect(allergen)}
            colorScheme='green'
            variant='lime'
            label={allergen}
            w='100%'
            clear={!isExcludeAllergens}
        />
    ));
    return (
        <HStack display={{ base: 'none', lg: 'flex' }} mt='16px' h='40px'>
            <FormControl display='flex' alignItems='center'>
                <FormLabel textStyle='m' htmlFor='my-allergen' mr='8px' mb='0'>
                    Исключить мои аллергены
                </FormLabel>
                <Switch
                    id='my-allergen'
                    onChange={handleSwitchChange}
                    checked={isExcludeAllergens}
                    variant='lime'
                />
            </FormControl>
            <Select
                options={allergenOptions}
                placeholder={selectedAllergensBadges}
                disabled={!isExcludeAllergens}
                withInput
                onInputChange={handleInputChange}
                inputValue={anotherAllergen}
                onAdditionClick={handleAllergenAddition}
                selectStyle={
                    isExcludeAllergens ? { borderColor: 'lime.300' } : { borderColor: 'gray.200' }
                }
            />
        </HStack>
    );
};
