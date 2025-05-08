import { Box, Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { FC, ReactElement, useEffect, useState } from 'react';

import { setAppError } from '~/app/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/app/store/hooks';
import { getSubcategoriesIdsFilter, useGetCategoriesQuery } from '~/entities/category';
import { Recipe, useGetRecipesQuery } from '~/entities/recipe';
import FilterMenu from '~/shared/assets/icons/components/Filter';
import { Loader } from '~/shared/components/loader';
import {
    ALLERGEN,
    ALLERGENS_MENU_BUTTON,
    ALLERGENS_SWITCHER,
    FILTER_BUTTON,
    LOADER_SEARCH_BLOCK,
} from '~/shared/constants/tests';
import { Category } from '~/shared/types/categories';
import {
    AllergensExclusion,
    Drawer,
    removeAllAllergensAction,
    removeAllergenAction,
    removeAllFiltersAction,
    selectFilters,
    setAllergenAction,
} from '~/widgets/drawer';

import { SearchInput } from './search-input/SearchInput';

type SearchPanelProps = {
    getFoundRecipes: (items: Recipe[]) => void;
    title?: ReactElement | string;
    text?: string;
    withinCategory?: Category;
};

export const SearchPanel: FC<SearchPanelProps> = (props) => {
    const { title, text, getFoundRecipes, withinCategory } = props;
    const dispatch = useAppDispatch();

    const { data: categories } = useGetCategoriesQuery();
    const [canSearch, setCanSearch] = useState(false);

    const {
        allergen,
        meetType,
        sideType,
        searchString,
        category: categoryFilter,
    } = useAppSelector(selectFilters);

    let subcategoriesIds: string[] = [];

    if (withinCategory) {
        subcategoriesIds = withinCategory.subCategories.map((subcat) => subcat._id);
    }

    if (!withinCategory && categories) {
        subcategoriesIds = getSubcategoriesIdsFilter(categoryFilter, categories);
    }

    const {
        data: recipes,
        isLoading,
        isError,
    } = useGetRecipesQuery(
        {
            allergens: allergen.join(',') === '' ? undefined : allergen.join(','),
            searchString: searchString,
            meat: meetType.join(',') === '' ? undefined : meetType.join(','),
            garnish: sideType.join(',') === '' ? undefined : sideType.join(','),
            subcategoriesIds:
                subcategoriesIds.join(',') === '' ? undefined : subcategoriesIds.join(','),
            sortBy: undefined,
            sortOrder: undefined,
        },
        { skip: !canSearch },
    );
    const handleRecipesSearch = () => {
        setCanSearch(true);
    };

    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isActive, setIsActive] = useState<boolean>(false);

    const handleDrawerClose = () => {
        setIsOpenDrawer(false);
    };
    const handleDrawerOpen = () => {
        setIsOpenDrawer(true);
        setCanSearch(false);
    };

    const handleSearch = () => {
        setCanSearch(true);
    };
    // const handleEnterClick = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.code === 'Enter' && inputValue.length >= 3) {
    //         handleSearch();
    //     }
    // };
    const handleAllergenItemRemove = (allergen: string) => {
        dispatch(removeAllergenAction(allergen));
    };
    const handleAllergenItemSet = (allergen: string) => {
        dispatch(setAllergenAction(allergen));
    };
    const handleAllAllergenRemove = () => {
        dispatch(removeAllAllergensAction());
    };

    const handleInputFocus = () => {
        setIsActive(true);
    };

    useEffect(() => {
        if (recipes?.data) {
            getFoundRecipes(recipes.data);
        }
        if (recipes?.data.length === 0) {
            dispatch(removeAllFiltersAction());
            setCanSearch(false);
        }
        if (recipes && recipes.data.length !== 0) {
            setIsActive(false);
        }
    }, [getFoundRecipes, dispatch, recipes?.data, recipes]);

    useEffect(() => {
        if (isError) {
            dispatch(setAppError('на сервере произошла ошибка попробуйте позже'));
        }
    }, [isError, dispatch]);

    return (
        <VStack
            w={{ base: '360px', md: '480px', lg: '578px', '2xl': '898px' }}
            paddingTop={{ base: '16px', lg: '32px' }}
            paddingBottom={{ lg: '32px' }}
            align='center'
            borderRadius='24px'
            transition='box-shadow 1s'
            boxShadow={
                isActive
                    ? '0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    : 'none'
            }
        >
            {recipes && recipes.data.length === 0 ? (
                <Text
                    textStyle='m'
                    fontWeight={600}
                    textAlign='center'
                    mb={{ base: '16px', lg: '32px' }}
                >
                    По вашему запросу ничего не найдено.
                    <br /> Попробуйте другой запрос
                </Text>
            ) : (
                <>
                    <Heading
                        mb={isLoading ? '10px' : { base: '16px', lg: '32px' }}
                        fontSize={{ base: '24px', lg: '2xl' }}
                        fontWeight={700}
                        lineHeight={{ base: '133%', lg: '100%' }}
                    >
                        {title}
                    </Heading>
                    {text && (
                        <Text
                            color='gray.100'
                            textStyle={{ base: 's', lg: 'm' }}
                            textAlign='center'
                            mb={{ base: '16px', lg: '32px' }}
                        >
                            {text}
                        </Text>
                    )}
                </>
            )}
            <VStack w={{ base: '328px', md: '448px', lg: '520px' }} gap='16px'>
                {isLoading ? (
                    <Loader
                        data-test-id={LOADER_SEARCH_BLOCK}
                        height='134px'
                        width='134px'
                        size='sm'
                    />
                ) : (
                    <>
                        <HStack spacing='12px' h={{ base: '32px', lg: '48px' }} w='100%'>
                            <Button
                                data-test-id={FILTER_BUTTON}
                                onClick={handleDrawerOpen}
                                variant='outline'
                                h={{ base: '32px', lg: '48px' }}
                                w={{ base: '32px', lg: '48px' }}
                                p={{ base: '0 9px', lg: '0 12px' }}
                            >
                                <FilterMenu />
                            </Button>
                            <SearchInput
                                onSearch={handleSearch}
                                onFocus={handleInputFocus}
                                clearInput={recipes?.data.length === 0}
                                borderColor={recipes && recipes.data.length > 0 ? 'lime.600' : ''}
                            />
                        </HStack>
                        <Box display={{ base: 'none', lg: 'block' }} w='100%'>
                            <AllergensExclusion
                                forTest={ALLERGENS_SWITCHER}
                                forTestSelect={ALLERGENS_MENU_BUTTON}
                                forTestCheckbox={ALLERGEN}
                                direction='row'
                                type='header'
                                filteredAllergens={allergen}
                                onSetAllergen={handleAllergenItemSet}
                                onRemoveAllergen={handleAllergenItemRemove}
                                onTurnOfSwitch={handleAllAllergenRemove}
                                disableSwitch={recipes?.data.length === 0}
                            />
                        </Box>
                    </>
                )}
            </VStack>
            <Drawer
                isOpen={isOpenDrawer}
                onFindRecipe={handleRecipesSearch}
                onClose={handleDrawerClose}
            />
        </VStack>
    );
};
