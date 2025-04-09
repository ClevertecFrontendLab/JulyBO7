import { Button, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';

import Bookmark from '~/shared/assets/icons/components/BsBookmarkHeart';
import Emoji from '~/shared/assets/icons/components/BsEmojiHeartEyes';
import People from '~/shared/assets/icons/components/BsPeopleFill';
import ButtonIcon from '~/shared/assets/icons/components/Button';

import cls from './Sidebar.module.scss';

export const Sidebar: FC = () => (
    <VStack
        as='aside'
        display={{ base: 'none', lg: 'flex' }}
        w='208px'
        justify='space-between'
        border='1px solid red'
        className={cls.sidebar}
    >
        <VStack justify='center' padding='16px 56px 16px 16px'>
            <Button
                variant='withIcon'
                color='lime.600'
                padding='0px 16px'
                width='85px'
                height='40px'
                gap='8px'
            >
                <Bookmark width='16px' height='16px' />
                <Text textStyle='m' fontWeight={600}>
                    {185}
                </Text>
            </Button>
            <Button
                variant='withIcon'
                color='lime.600'
                padding='0px 16px'
                width='85px'
                height='40px'
                gap='8px'
            >
                <People width='16px' height='16px' />
                <Text textStyle='m' fontWeight={600}>
                    {185}
                </Text>
            </Button>
            <Button
                variant='withIcon'
                color='lime.600'
                padding='0px 16px'
                width='85px'
                height='40px'
                gap='8px'
            >
                <Emoji width='16px' height='16px' />
                <Text textStyle='m' fontWeight={600}>
                    {185}
                </Text>
            </Button>
        </VStack>
        <Button
            w='208px'
            h='208px'
            variant='clear'
            display='flex'
            flexDirection='column'
            gap='12px'
            background='radial-gradient(50% 50% at 50% 50%, #d7ff94 0%, rgba(255, 255, 255, 0) 100%)'
        >
            <ButtonIcon />
            <Text textStyle='xs' color='gray.150'>
                Записать рецепт
            </Text>
        </Button>
    </VStack>
);
