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
import { FC, MouseEvent, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import ArrowNavbar from '~/shared/assets/icons/components/ArrowNavbar';
import ArrowNavbarDown from '~/shared/assets/icons/components/ArrowNavbarDown';
import { IMAGE_API } from '~/shared/constants/imageApi';
import { NAV } from '~/shared/constants/tests';
import { getCurrentCategoryByPath } from '~/shared/lib/getCurrentCategoryByPath';
import { UrlState } from '~/shared/types/url';

import { useGetCategoriesQuery } from '../../../../entities/category/model/services/categories';
import cls from './MenuArea.module.scss';

type MenuAreaProps = AccordionProps & { isMobile?: boolean; forTest?: boolean };

export const MenuArea: FC<MenuAreaProps> = ({ isMobile = false, forTest, ...rest }) => {
    const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>();
    const [activeSubCategoryIndex, setActiveSubCategoryIndex] = useState(0);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { data } = useGetCategoriesQuery();

    const menuCategories = useMemo(() => data?.filter((item) => !item.rootCategoryId), [data]);

    const onClickMenuItem =
        (path: string, state: UrlState) => (e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            navigate(path, { state });
        };

    const onChangeCategory = (expandedIndex: number) => {
        setActiveCategoryIndex(expandedIndex);
    };

    const onChangeSubCategory = (index: number) => {
        setActiveSubCategoryIndex(index);
    };

    useEffect(() => {
        if (menuCategories) {
            const tabIndex = getCurrentCategoryByPath(pathname, menuCategories);
            if (tabIndex !== undefined) {
                setActiveSubCategoryIndex(tabIndex);
            } else {
                setActiveCategoryIndex(-1);
                setActiveSubCategoryIndex(0);
            }
        }
    }, [pathname, menuCategories]);

    const accordeonItems = menuCategories?.map((menuItem, idx) => {
        const categoryPath = `/${menuItem.category}/${menuItem.subCategories[0].category}`;
        const state: UrlState = {
            breadcrumb: [
                {
                    title: menuItem.title,
                    path: categoryPath,
                    category: menuItem.category,
                },
                {
                    title: menuItem.subCategories[0].title,
                    path: categoryPath,
                },
            ],
        };
        const id = menuItem.category === 'vegan' ? 'vegan-cuisine' : menuItem.category;
        return (
            <AccordionItem border='none' key={idx}>
                {({ isExpanded }) => (
                    <>
                        <AccordionButton
                            data-test-id={id}
                            onClick={onClickMenuItem(categoryPath, state)}
                            padding='12px 8px'
                            display='flex'
                            alignItems='center'
                            justifyContent='space-between'
                            _hover={{ bg: 'lime.50' }}
                            _expanded={{ bg: 'lime.100', fontWeight: '700' }}
                        >
                            <Box display='flex' gap='12px'>
                                <Image src={`${IMAGE_API}${menuItem.icon}`} />
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
                                {menuItem.subCategories.map((item, idx) => {
                                    const subcatPath = `/${menuItem.category}/${item.category}`;
                                    const state: UrlState = {
                                        breadcrumb: [
                                            {
                                                title: menuItem.title,
                                                path: categoryPath,
                                                category: menuItem.category,
                                            },
                                            {
                                                title: item.title,
                                                path: subcatPath,
                                            },
                                        ],
                                    };

                                    return (
                                        <Tab
                                            data-test-id={
                                                activeSubCategoryIndex === idx
                                                    ? `${item.category}-active`
                                                    : ''
                                            }
                                            key={idx}
                                            onClick={onClickMenuItem(subcatPath, state)}
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
                                    );
                                })}
                            </Tabs>
                        </AccordionPanel>
                    </>
                )}
            </AccordionItem>
        );
    });

    return (
        <Accordion
            data-test-id={NAV}
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
