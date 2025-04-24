import { SearchIcon } from '@chakra-ui/icons';
import {
    Box,
    Heading,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    VStack,
} from '@chakra-ui/react';
import { FC, useState } from 'react';

import FilterButton from '~/shared/assets/icons/components/Filter';

import { ExcludeAllergens } from './exclude-allergens/ExcludeAllergens';

type PageHeaderProps = {
    onAllergenChange: (value: string[]) => void;
    selectedAllergens: string[];
    title?: string;
    text?: string;
};

export const PageHeader: FC<PageHeaderProps> = (props) => {
    const { title, text, onAllergenChange, selectedAllergens } = props;
    const [isActive, setIsActive] = useState(false);

    const handleBlockClick = (value: boolean) => {
        setIsActive(value);
    };

    return (
        <VStack
            w={{ base: '328px', md: '727px' }}
            paddingTop={{ base: '16px', lg: '32px' }}
            paddingBottom={{ base: '16px', lg: '32px' }}
            align='center'
            boxShadow={
                isActive
                    ? '0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    : 'none'
            }
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
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label='Options'
                            icon={<FilterButton />}
                            variant='outline'
                            h={{ base: '32px', lg: '48px' }}
                            w={{ base: '32px', lg: '48px' }}
                            p={{ base: '0 9px', lg: '0 12px' }}
                            borderColor='gray.100'
                            borderRadius='6px'
                        />
                        <MenuList>
                            <MenuItem>New Tab</MenuItem>
                            <MenuItem>New Window</MenuItem>
                            <MenuItem>Open Closed Tab</MenuItem>
                            <MenuItem>Open File...</MenuItem>
                        </MenuList>
                    </Menu>
                    <InputGroup h='100%'>
                        <Input
                            h='100%'
                            borderColor='gray.100'
                            borderRadius='6px'
                            placeholder='Название или ингредиент...'
                        />
                        <InputRightElement h='100%'>
                            <SearchIcon color='primaryColor' />
                        </InputRightElement>
                    </InputGroup>
                </HStack>
                <ExcludeAllergens
                    onSwitchClick={handleBlockClick}
                    onAllergenSelect={onAllergenChange}
                    selectedAllergens={selectedAllergens}
                />
            </Box>
        </VStack>
    );
};
