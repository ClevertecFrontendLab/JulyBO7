import { Box, Button, HStack, Image, Text, useMediaQuery } from '@chakra-ui/react';
import { FC } from 'react';
import { useNavigate } from 'react-router';

import HomeIcon from '~/shared/assets/icons/components/HomeSolid';
import Search from '~/shared/assets/icons/components/Search';
import Write from '~/shared/assets/icons/components/Write';
import avatar from '~/shared/assets/images/Avatar.png';
import { FOOTER } from '~/shared/constants/tests';
import { handleNewRecipeCreation } from '~/widgets/sidebar';

export const Footer: FC = () => {
    const navigate = useNavigate();
    const handleWriteRecipe = () => handleNewRecipeCreation(navigate);
    const [isSmallerThan1440] = useMediaQuery('(max-width: 1400px)');

    return (
        <Box
            as='footer'
            data-test-id={FOOTER}
            position='fixed'
            bottom='0px'
            left='0px'
            right='0px'
            zIndex={100}
        >
            {!isSmallerThan1440 ? null : (
                <HStack
                    display={{ base: 'flex', lg: 'none' }}
                    gap='0'
                    h='84px'
                    w='100%'
                    bg='lime.50'
                >
                    <Button
                        variant='menu'
                        w={{ base: '90px', md: '192px' }}
                        _focus={{
                            background:
                                'radial-gradient(50% 50% at 50% 50%, #d7ff94 0%, rgba(255, 255, 255, 0) 100%)',
                        }}
                    >
                        <HomeIcon />
                        <Text textStyle='xs'>Главная</Text>
                    </Button>
                    <Button
                        variant='menu'
                        w={{ base: '90px', md: '192px' }}
                        _focus={{
                            background:
                                'radial-gradient(50% 50% at 50% 50%, #d7ff94 0%, rgba(255, 255, 255, 0) 100%)',
                        }}
                    >
                        <Search />
                        <Text textStyle='xs' color='gray.150'>
                            Поиск
                        </Text>
                    </Button>
                    <Button
                        onClick={handleWriteRecipe}
                        variant='menu'
                        w={{ base: '90px', md: '192px' }}
                        _focus={{
                            background:
                                'radial-gradient(50% 50% at 50% 50%, #d7ff94 0%, rgba(255, 255, 255, 0) 100%)',
                        }}
                    >
                        <Write />
                        <Text textStyle='xs' color='gray.150'>
                            Записать
                        </Text>
                    </Button>
                    <Button
                        variant='menu'
                        w={{ base: '90px', md: '192px' }}
                        _focus={{
                            background:
                                'radial-gradient(50% 50% at 50% 50%, #d7ff94 0%, rgba(255, 255, 255, 0) 100%)',
                        }}
                    >
                        <Image src={avatar} />
                        <Text textStyle='xs' color='gray.150'>
                            Мой профиль
                        </Text>
                    </Button>
                </HStack>
            )}
        </Box>
    );
};
