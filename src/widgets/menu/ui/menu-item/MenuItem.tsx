import { Collapse } from '@chakra-ui/react';
import { FC, useState } from 'react';

import { MenuItemData } from '../../model/types/filters-types';
import { Item, ItemTheme } from '../item/ui/Item';

type MenuItemProps = {
    itemData: MenuItemData;
    onClickItem?: () => void;
};

export const MenuItem: FC<MenuItemProps> = ({ itemData, onClickItem }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const active = true;

    const handleCollapseItem = () => {
        setIsCollapsed(!isCollapsed);
        onClickItem?.();
    };
    const items = itemData.items.map((item, idx) => (
        <li key={idx}>
            <Item
                active={idx % 2 ? active : false}
                path={item.routePath}
                theme={ItemTheme.SECONDARY}
                text={item.title}
            />
        </li>
    ));

    return (
        <li>
            <Item
                active={!isCollapsed}
                path={itemData.routePath}
                text={itemData.title}
                Icon={itemData.Icon}
                onClick={handleCollapseItem}
            />
            <Collapse in={!isCollapsed} animateOpacity>
                <ul>{items}</ul>
            </Collapse>
        </li>
    );
};
