import { FC, useCallback, useState } from 'react';

import { classNames } from '~/shared/lib/classNames';

import { getMenuItems } from '../../model/getMenuItems';
import { MenuItem } from '../menu-item/MenuItem';
import cls from './MenuArea.module.scss';

export const MenuArea: FC = () => {
    const [isFocusable, setIsFocusable] = useState(false);
    const menuItems = getMenuItems();

    const handleClickItemMenu = useCallback(() => {
        setIsFocusable(true);
    }, []);

    const items = menuItems.map((menuItem, idx) => (
        <MenuItem key={idx} itemData={menuItem} onClickItem={handleClickItemMenu} />
    ));
    return (
        <menu className={classNames(cls.menu, { [cls.active]: isFocusable })}>
            <ul>{items}</ul>
        </menu>
    );
};
