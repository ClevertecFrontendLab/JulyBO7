import { Button, HStack, Image, Text } from '@chakra-ui/react';
import { FC } from 'react';

import HomeIcon from '~/shared/assets/icons/components/HomeSolid';
import Search from '~/shared/assets/icons/components/Search';
import Write from '~/shared/assets/icons/components/Write';
import avatar from '~/shared/assets/images/Avatar.png';

export const Footer: FC = () => (
    <HStack
        as='footer'
        data-test-id='footer'
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
);
