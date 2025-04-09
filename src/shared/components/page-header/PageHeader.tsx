import { SearchIcon } from '@chakra-ui/icons';
import {
    Box,
    FormControl,
    FormLabel,
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
    Select,
    Switch,
    Text,
    VStack,
} from '@chakra-ui/react';
import { FC } from 'react';

import FilterButton from '~/shared/assets/icons/components/Filter';

type PageHeaderProps = {
    title?: string;
    text?: string;
};

export const PageHeader: FC<PageHeaderProps> = (props) => {
    const { title, text } = props;
    return (
        <VStack w={{ base: '328px', md: '727px' }} align='center'>
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
                <HStack
                    spacing='12px'
                    // w={{ base: '328px', md: '448px', lg: '518px' }}
                    h={{ base: '32px', lg: '48px' }}
                >
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
                <HStack display={{ base: 'none', lg: 'flex' }} mt='16px' h='40px'>
                    <FormControl display='flex' alignItems='center'>
                        <FormLabel textStyle='m' htmlFor='my-allergen' mr='8px' mb='0'>
                            Исключить мои аллергены
                        </FormLabel>
                        <Switch id='my-allergen' />
                    </FormControl>
                    <Select textStyle='m' color='gray.150' placeholder='Выберите из списка...'>
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                    </Select>
                </HStack>
            </Box>
        </VStack>
    );
};
