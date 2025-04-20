import { Avatar, Box, Button, HStack, Text } from '@chakra-ui/react';
import React from 'react';

import Subscribe from '../../../../assets/icons/components/Subscribe';
import Subscribers from '../../../../assets/icons/components/Subscribers';

type UserCardProps = {
    avatar?: string;
    userName?: string;
    email?: string;
    subscribersCount?: number;
};

export const UserCard: React.FC<UserCardProps> = (props) => {
    const { avatar, userName, email, subscribersCount } = props;

    return (
        <HStack
            w={{ base: '100%', md: '604px', lg: '578px', '2xl': '668px' }}
            bg='lime.300'
            borderRadius='8px'
            gap={{ base: '8px', md: '16px' }}
            padding={{ base: '12px', md: '24px' }}
            position='relative'
        >
            <Avatar w='96px' h='96px' name='Ryan Florence' src={avatar} />
            <Box w='100%'>
                <HStack w='100%' justifyContent='space-between' align='start' mb='16px'>
                    <Box pt={{ base: '8px', md: 0 }}>
                        <Text
                            fontSize={{ base: '18px', md: '24px' }}
                            fontWeight={{ base: '600', md: '700' }}
                        >
                            {userName}
                        </Text>

                        <Text textStyle='s' color='gray.150'>
                            {email}
                        </Text>
                    </Box>
                    <Text
                        as='span'
                        textStyle={{ base: 'xs', md: 's' }}
                        position={{ base: 'absolute', md: 'static' }}
                        top='12px'
                        right='12px'
                    >
                        Автор рецепта
                    </Text>
                </HStack>
                <HStack justifyContent='space-between'>
                    <Button size='xs' variant='solid' leftIcon={<Subscribe />}>
                        Подписаться
                    </Button>
                    <Box>
                        <Subscribers />
                        <Text pl='6px' as='span' fontSize='12px' fontWeight='600' color='lime.600'>
                            {subscribersCount}
                        </Text>
                    </Box>
                </HStack>
            </Box>
        </HStack>
    );
};
