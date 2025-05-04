import { CloseIcon as CloseIconChakra } from '@chakra-ui/icons';
import {
    Badge,
    Button,
    Checkbox,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    VStack,
} from '@chakra-ui/react';
import React, { ChangeEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { useAppDispatch } from '~/app/store/hooks';
import { useGetCategoriesQuery } from '~/entities/category';
import CloseIcon from '~/shared/assets/icons/components/Close';
import {
    ALLERGEN,
    ALLERGENS_MENU_BUTTON_FILTER,
    ALLERGENS_SWITCHER_FILTER,
    CHECKBOX_VEGAN_CUISINE,
    CLEAR_FILTER_BUTTON,
    CLOSE_FILTER_DRAWER,
    FILTER_DRAWER,
    FILTER_MENU_BUTTON_CATEGORY,
    FIND_RECIPE_BUTTON,
} from '~/shared/constants/tests';

import { selectFilters } from '../model/selectors/selectFilters';
import {
    removeAllergenAction,
    removeAllFiltersAction,
    removeAuthorAction,
    removeCategoryAction,
    removeMeetTypeAction,
    removeSideTypeAction,
    setAllergenAction,
    setAuthorAction,
    setCategoryAction,
    setMeetTypeAction,
    setSideTypeAction,
} from '../model/slice/filtersSlice';
import { AllergensExclusion } from './allergens-exclusion/AllergensExclusion';
import { FiltersSelect } from './filters-select/FiltersSelect';

const authors = [
    'Елена Мин',
    'Мирием Чонишвили',
    'Елена Прекрасная',
    'Alex Cook',
    'Екатерина Константинопольская',
    'Инна Высоцкая',
    'Анна Рогачева',
    'Повар Ши',
    'Иван Орлов',
];
const meets = ['Курица', 'Свинина', 'Говядина', 'Индейка', 'Утка'];
const sides = [
    'Картошка',
    'Гречка',
    'Паста',
    'Спагетти',
    'Рис',
    'Капуста',
    'Фасоль',
    'Другие овощи',
];

type DrawerProps = {
    isOpen: boolean;
    onClose: () => void;
};
export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { data: categories } = useGetCategoriesQuery();
    const optionsForSelect = categories
        ?.filter((category) => !category.rootCategoryId)
        .map((categ) => categ.title);
    // getMenuItems().map((item) => item.title)
    const filters = useSelector(selectFilters);

    const filtersTags = [
        ...filters.author,
        ...filters.category,
        ...filters.meetType,
        ...filters.sideType,
        ...filters.allergen,
    ];
    const handleMeetType = (meetType: string) => (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.checked) {
            dispatch(setMeetTypeAction(meetType));
        } else {
            dispatch(removeMeetTypeAction(meetType));
        }
    };
    const handleSideType = (sideType: string) => (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.checked) {
            dispatch(setSideTypeAction(sideType));
        } else {
            dispatch(removeSideTypeAction(sideType));
        }
    };
    const handleAllFiltersRemove = () => {
        dispatch(removeAllFiltersAction());
        // disableSwitch.current = true;
    };
    const handleCheckedAuthor = (checked: boolean, author: string) => {
        if (checked) {
            dispatch(setAuthorAction(author));
        } else {
            dispatch(removeAuthorAction(author));
        }
    };
    const handleCheckedCategory = (checked: boolean, category: string) => {
        if (checked) {
            dispatch(setCategoryAction(category));
        } else {
            dispatch(removeCategoryAction(category));
        }
    };
    const handleFilterRemove = (filterValue: string) => () => {
        // для удаления по бейджу
        const meet = filters.meetType.find((type) => type === filterValue);
        const side = filters.sideType.find((type) => type === filterValue);
        const author = filters.author.find((type) => type === filterValue);
        const category = filters.category.find((type) => type === filterValue);

        if (meet) {
            dispatch(removeMeetTypeAction(filterValue));
        }
        if (side) {
            dispatch(removeSideTypeAction(filterValue));
        }
        if (author) {
            dispatch(removeAuthorAction(filterValue));
        }
        if (category) {
            dispatch(removeCategoryAction(filterValue));
        }
    };

    const meetTypesList = meets.map((meet) => {
        const checked = filters.meetType.find((type) => type === meet);
        return (
            <Checkbox
                key={meet}
                isChecked={!!checked}
                variant='lime'
                as='li'
                onChange={handleMeetType(meet)}
            >
                <Text textStyle='s'>{meet}</Text>
            </Checkbox>
        );
    });
    const sideTypesList = sides.map((side) => {
        const checked = filters.sideType.find((type) => type === side);

        return (
            <Checkbox
                data-test-id={side === 'Картошка' && 'checkbox-картошка'}
                key={side}
                variant='lime'
                isChecked={!!checked}
                as='li'
                onChange={handleSideType(side)}
            >
                <Text textStyle='s'>{side}</Text>
            </Checkbox>
        );
    });
    const tagsList = filtersTags.map((tag) => (
        <Badge data-test-id='filter-tag' key={tag} variant='solidWithIcon'>
            <Text as='span'>{tag}</Text>
            <CloseIconChakra
                onClick={handleFilterRemove(tag)}
                as='button'
                fill='lime.700'
                w='10px'
                h='10px'
                opacity='50%'
            />
        </Badge>
    ));
    let disableFindRecipeBtn = true;

    for (const key in filters) {
        if (filters[key].length !== 0) {
            disableFindRecipeBtn = false;
            break;
        }
    }
    const handleModalClose = () => {
        handleAllFiltersRemove();
        onClose();
    };
    const handleFindRecipe = () => {
        navigate('/filtered-recipes');
        onClose();
    };
    const handleAllergenItemRemove = (allergen: string) => {
        dispatch(removeAllergenAction(allergen));
    };
    const handleAllergenItemSet = (allergen: string) => {
        dispatch(setAllergenAction(allergen));
    };
    useEffect(() => {
        if (isOpen) {
            dispatch(removeAllFiltersAction());
        }
    }, [isOpen, dispatch]);

    return (
        <>
            <Modal isOpen={isOpen} onClose={handleModalClose}>
                <ModalOverlay backdropFilter='blur(4px)' bg='rgba(0, 0, 0, 0.16)' />
                <ModalContent
                    data-test-id={FILTER_DRAWER}
                    position='absolute'
                    top={0}
                    bottom={0}
                    right={0}
                    w={{ base: '344px', lg: '463px' }}
                    mt={0}
                    mb={0}
                    p={{ base: '16px 20px 16px 16px', lg: '32px' }}
                    gap={{ base: '16px', lg: '24px' }}
                    overflow='auto'
                >
                    <ModalHeader p={0}>Фильтр</ModalHeader>
                    <ModalCloseButton
                        data-test-id={CLOSE_FILTER_DRAWER}
                        top={{ base: '16px', lg: '32px' }}
                        right={{ base: '20px', lg: '32px' }}
                        p={0}
                        onClick={handleAllFiltersRemove}
                    >
                        <CloseIcon />
                    </ModalCloseButton>
                    <ModalBody
                        p={0}
                        display='flex'
                        flexDirection='column'
                        gap={{ base: '16px', lg: '24px' }}
                    >
                        <FiltersSelect
                            placeholder={
                                <Text fontSize='16px' fontWeight={400} color='gray.150'>
                                    Категория
                                </Text>
                            }
                            options={optionsForSelect ?? []}
                            onChecked={handleCheckedCategory}
                            selectedOptions={filters.category}
                            type='drawer'
                            forTest={FILTER_MENU_BUTTON_CATEGORY}
                            forTestCheckbox={CHECKBOX_VEGAN_CUISINE}
                        />
                        <FiltersSelect
                            placeholder={
                                <Text fontSize='16px' fontWeight={400} color='gray.150'>
                                    Поиск по автору
                                </Text>
                            }
                            options={authors}
                            onChecked={handleCheckedAuthor}
                            selectedOptions={filters.author}
                            type='drawer'
                        />

                        <VStack as='ul' gap='12px' align='flex-start'>
                            <Text textStyle='m'>Тип мяса</Text>
                            {meetTypesList}
                        </VStack>

                        <VStack as='ul' gap='12px' align='flex-start'>
                            <Text textStyle='m'>Тип гарнира</Text>
                            {sideTypesList}
                        </VStack>

                        <AllergensExclusion
                            forTest={ALLERGENS_SWITCHER_FILTER}
                            type='drawer'
                            filteredAllergens={filters.allergen}
                            onRemoveAllergen={handleAllergenItemRemove}
                            onSetAllergen={handleAllergenItemSet}
                            onTurnOfSwitch={handleAllFiltersRemove}
                            forTestSelect={ALLERGENS_MENU_BUTTON_FILTER}
                            forTestCheckbox={ALLERGEN}
                        />
                        <HStack wrap='wrap' gap='16px'>
                            {tagsList}
                        </HStack>
                    </ModalBody>

                    <ModalFooter p={0}>
                        <Button
                            data-test-id={CLEAR_FILTER_BUTTON}
                            variant='outline'
                            border='1px solid rgba(0, 0, 0, 0.48)'
                            bg='bgColor'
                            size={{ base: 'm', lg: 'xl' }}
                            mr={3}
                            onClick={handleAllFiltersRemove}
                        >
                            Очистить фильтр
                        </Button>
                        <Button
                            data-test-id={FIND_RECIPE_BUTTON}
                            size={{ base: 'm', lg: 'xl' }}
                            onClick={handleFindRecipe}
                            isDisabled={disableFindRecipeBtn}
                            pointerEvents={disableFindRecipeBtn ? 'none' : 'auto'}
                        >
                            Найти рецепт
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
