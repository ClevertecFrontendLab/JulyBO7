import { SearchIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Heading,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    VStack,
} from '@chakra-ui/react';
import { ChangeEvent, FC, KeyboardEvent, ReactElement, useState } from 'react';

import FilterMenu from '~/shared/assets/icons/components/Filter';
import { AllergensExclusion, Drawer } from '~/widgets/drawer';

type PageHeaderProps = {
    inputValue: string;
    onChange: (value: string) => void;
    title: ReactElement | string;
    onSearch: () => void;
    text?: string;
};

export const PageHeader: FC<PageHeaderProps> = (props) => {
    const { title, text, onSearch, inputValue, onChange } = props;
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isActive, setIsActive] = useState<boolean>(false);

    const handleDrawerClose = () => {
        setIsOpenDrawer(false);
    };
    const handleDrawerOpen = () => {
        setIsOpenDrawer(true);
    };
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.value);
    };
    const handleSearch = () => {
        onSearch();
        setIsActive(true);
    };
    const handleEnterClick = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter' && inputValue.length >= 3) {
            handleSearch();
        }
    };

    return (
        <VStack
            w={{ base: '328px', md: '727px' }}
            paddingTop={{ base: '16px', lg: '32px' }}
            paddingBottom={{ base: '16px', lg: '32px' }}
            align='center'
            // boxShadow={
            //     isActive
            //         ? '0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            //         : 'none'
            // }
            borderRadius='24px'
        >
            <Heading
                mb={{ base: '16px', lg: '32px' }}
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
            <Box w={{ base: '328px', md: '448px', lg: '520px' }}>
                <HStack spacing='12px' h={{ base: '32px', lg: '48px' }}>
                    <Button
                        onClick={handleDrawerOpen}
                        variant='outline'
                        h={{ base: '32px', lg: '48px' }}
                        w={{ base: '32px', lg: '48px' }}
                        p={{ base: '0 9px', lg: '0 12px' }}
                    >
                        <FilterMenu />
                    </Button>

                    <InputGroup h='100%'>
                        <Input
                            h='100%'
                            borderColor='gray.100'
                            borderRadius='6px'
                            placeholder='Название или ингредиент...'
                            onChange={handleInputChange}
                            onKeyDown={handleEnterClick}
                            value={inputValue}
                            borderTopColor={isActive ? ' #2db100' : 'rgba(0, 0, 0, 0.48)'}
                            borderBottomColor={isActive ? ' #2db100' : 'rgba(0, 0, 0, 0.48)'}
                            borderLeftColor={isActive ? ' #2db100' : 'rgba(0, 0, 0, 0.48)'}
                            borderRightColor={isActive ? ' #2db100' : 'rgba(0, 0, 0, 0.48)'}
                        />
                        <InputRightElement h='100%'>
                            <Button
                                variant='clear'
                                isDisabled={inputValue?.length < 3}
                                onClick={handleSearch}
                            >
                                <SearchIcon color='primaryColor' />
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </HStack>
                <AllergensExclusion />
            </Box>
            <Drawer isOpen={isOpenDrawer} onClose={handleDrawerClose} />
        </VStack>
    );
};
