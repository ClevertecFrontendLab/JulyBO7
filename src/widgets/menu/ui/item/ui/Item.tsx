import { IconProps } from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router';

import Arrow from '~/shared/assets/icons/components/Arrow';
import { classNames } from '~/shared/lib/classNames';

import cls from './Item.module.scss';

type ItemProps = {
    path: string;
    Icon?: FC<IconProps>;
    text: string;
    active?: boolean;
    onClick?: () => void;
    theme?: ItemTheme;
};

export enum ItemTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}
export const Item: FC<ItemProps> = (props) => {
    const { path, Icon, text, active, theme = ItemTheme.PRIMARY, onClick } = props;

    return (
        <div className={classNames(cls.item, {}, [cls[theme]])}>
            <Link
                to={path}
                onClick={onClick}
                className={classNames(cls.link, { [cls.active]: active }, [])}
            >
                {theme === ItemTheme.PRIMARY && Icon && <Icon />}
                <p className={cls.text}>{text}</p>
                {theme === ItemTheme.PRIMARY && <Arrow className={cls.arrowIcon} />}
            </Link>
        </div>
    );
};
