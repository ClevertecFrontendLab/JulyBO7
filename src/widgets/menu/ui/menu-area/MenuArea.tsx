import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Image,
    Text,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';

import ArrowNavbar from '~/shared/assets/icons/components/ArrowNavbar';
import ArrowNavbarDown from '~/shared/assets/icons/components/ArrowNavbarDown';
import { classNames } from '~/shared/lib/classNames';

import { getMenuItems } from '../../model/getMenuItems';
import { MenuFilter } from '../../model/types/filters-types';
import cls from './MenuArea.module.scss';

export const MenuArea: FC = () => {
    const [isActivated, setIsActivated] = useState(false);
    const menuItems = getMenuItems();
    const navigate = useNavigate();
    const onClickMenuItem = (path: string) => () => navigate(path);
    const onActivateMenu = (expandedIndex: number) => {
        if (expandedIndex >= 0) {
            setIsActivated(true);
        } else {
            setIsActivated(false);
        }
        console.log('expandedIndex: ', expandedIndex);
    };

    const accordeonItems = menuItems.map((menuItem, idx) => (
        <AccordionItem border='none' key={idx} w='230px'>
            {({ isExpanded }) => (
                <>
                    <AccordionButton
                        data-test-id={menuItem.title === MenuFilter.VEGAN ? 'vegan-cuisine' : ''}
                        onClick={onClickMenuItem(menuItem.routePath)}
                        padding='12px 8px'
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'
                        _hover={{ bg: 'lime.50' }}
                        _expanded={{ bg: 'lime.100', fontWeight: '700' }}
                    >
                        <Box display='flex' gap='12px'>
                            <Image src={menuItem.icon} />
                            <Text textStyle='m' fontWeight={isExpanded ? '700' : '500'}>
                                {menuItem.title}
                            </Text>
                        </Box>

                        {isExpanded ? <ArrowNavbarDown /> : <ArrowNavbar />}
                    </AccordionButton>

                    <AccordionPanel padding='0'>
                        {menuItem.items.map((item, idx) => (
                            <Box
                                display='flex'
                                alignItems='center'
                                key={idx}
                                _hover={{ bg: 'lime.50' }}
                                padding='6px 8px 6px 52px'
                            >
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? classNames(cls.link, { [cls.activeLink]: isActive })
                                            : cls.link
                                    }
                                    to={item.routePath}
                                >
                                    <Text as='span' />
                                    <Text textStyle='m'>{item.title}</Text>
                                </NavLink>
                            </Box>
                        ))}
                    </AccordionPanel>
                </>
            )}
        </AccordionItem>
    ));

    return (
        <Accordion
            onChange={onActivateMenu}
            allowToggle
            maxHeight='872px'
            w='100%'
            padding={isActivated ? '10px 4px 10px 10px' : '10px 16px 10px 10px'}
            borderRadius='12px'
            overflowY='auto'
            boxShadow={
                isActivated
                    ? '0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    : ''
            }
        >
            {accordeonItems}
        </Accordion>
    );
};
