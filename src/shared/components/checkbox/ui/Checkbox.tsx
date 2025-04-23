import { Checkbox as CheckboxChakra, CheckboxProps } from '@chakra-ui/react';
import { ChangeEvent, FC, ReactNode, useEffect, useState } from 'react';

type CheckboxPropsType = CheckboxProps & {
    onChecked?: (value: boolean) => void;
    label?: ReactNode;
    clear?: boolean;
};
export const Checkbox: FC<CheckboxPropsType> = ({ onChecked, label, clear, ...rest }) => {
    const [checked, setChecked] = useState<boolean>(false);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setChecked(!checked);
        onChecked?.(e.currentTarget.checked);
    };

    useEffect(() => {
        if (clear) {
            setChecked(false);
        }
    }, [clear]);

    return (
        <CheckboxChakra isChecked={checked} onChange={onChange} {...rest}>
            {label}
        </CheckboxChakra>
    );
};
