import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    AccordionProps,
    Box,
    Image,
    Tab,
    Tabs,
    Text,
} from '@chakra-ui/react';
import { FC, MouseEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import ArrowNavbar from '~/shared/assets/icons/components/ArrowNavbar';
import ArrowNavbarDown from '~/shared/assets/icons/components/ArrowNavbarDown';
import { getCurrentCategoryByPath } from '~/shared/lib/getCurrentCategoryByPath';
import { getMenuItems } from '~/shared/lib/getMenuItems';

import cls from './MenuArea.module.scss';

type MenuAreaProps = AccordionProps & { isMobile?: boolean };

export const MenuArea: FC<MenuAreaProps> = ({ isMobile = false, ...rest }) => {
    const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>();
    const [activeSubCategoryIndex, setActiveSubCategoryIndex] = useState(0);
    const { pathname } = useLocation();

    const menuItems = getMenuItems();
    const navigate = useNavigate();

    const onClickMenuItem = (path: string) => (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        navigate(path);
    };

    const onChangeCategory = (expandedIndex: number) => {
        setActiveCategoryIndex(expandedIndex);
    };

    const onChangeSubCategory = (index: number) => {
        setActiveSubCategoryIndex(index);
    };

    useEffect(() => {
        const tabIndex = getCurrentCategoryByPath(pathname);
        if (tabIndex !== undefined) {
            setActiveSubCategoryIndex(tabIndex);
        } else {
            setActiveCategoryIndex(-1);
            setActiveSubCategoryIndex(0);
        }
    }, [pathname]);

    const accordeonItems = menuItems.map((menuItem, idx) => (
        <AccordionItem border='none' key={idx}>
            {({ isExpanded }) => (
                <>
                    <AccordionButton
                        data-test-id={menuItem.category}
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
                        <Tabs
                            variant='unstyled'
                            index={activeSubCategoryIndex}
                            onChange={onChangeSubCategory}
                        >
                            {menuItem.items.map((item, idx) => (
                                <Tab
                                    data-test-id={
                                        activeSubCategoryIndex === idx
                                            ? `tab-${item.subCategory}-active`
                                            : ''
                                    }
                                    key={idx}
                                    onClick={onClickMenuItem(item.routePath)}
                                    w='100%'
                                    display='flex'
                                    justifyContent='start'
                                    alignItems='center'
                                    textStyle='m'
                                    padding='6px 0 6px 52px'
                                    position='relative'
                                    _hover={{ bg: 'lime.50', textDecoration: 'none' }}
                                    _selected={{
                                        fontWeight: '700',
                                        _after: {
                                            w: '8px',
                                            left: '33px',
                                        },
                                    }}
                                    _after={{
                                        display: 'block',
                                        content: `""`,
                                        w: '1px',
                                        h: '24px',
                                        position: 'absolute',
                                        top: '6px',
                                        left: '40px',

                                        bg: 'lime.300',
                                    }}
                                >
                                    {item.title}
                                </Tab>
                            ))}
                        </Tabs>
                    </AccordionPanel>
                </>
            )}
        </AccordionItem>
    ));

    return (
        <Accordion
            onChange={onChangeCategory}
            index={activeCategoryIndex}
            allowToggle
            w='100%'
            bg='bgColor'
            padding={activeCategoryIndex !== -1 ? '10px 4px 10px 10px' : '10px 16px 10px 10px'}
            borderRadius='12px'
            overflowY='auto'
            overflowX='hidden'
            boxShadow={
                activeCategoryIndex !== -1 && !isMobile
                    ? '0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    : ''
            }
            className={cls.menuArea}
            {...rest}
        >
            {accordeonItems}
        </Accordion>
    );
};
