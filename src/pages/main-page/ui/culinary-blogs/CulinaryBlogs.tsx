import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, HStack, Stack } from '@chakra-ui/react';
import { FC } from 'react';

import { CommentCard } from '~/shared/components/card/ui/comment-card/CommentCard';

import { mainPageData } from '../../model/mockData';

export const CulinaryBlogs: FC = () => {
    const commentCards = mainPageData.blogs.map((data, idx) => (
        <CommentCard
            key={idx}
            text={data.text}
            avatar={data.image}
            email={data.email}
            name={data.authorName}
        />
    ));

    return (
        <Box borderRadius='16px' padding={{ base: '12px', lg: '24px' }} bg='lime.300'>
            <HStack justify='space-between'>
                <Heading variant={{ base: 's', lg: 'm', '2xl': 'l' }}>Кулинарные блоги </Heading>
                <Button
                    display={{ base: 'none', lg: 'flex' }}
                    alignItems='center'
                    variant='clear'
                    size='xl'
                    color='primaryColor'
                    rightIcon={<ArrowForwardIcon />}
                >
                    Все авторы
                </Button>
            </HStack>

            <Stack
                direction={{ base: 'column', md: 'row', lg: 'row', '2xl': 'row' }}
                wrap='wrap'
                spacing={{ base: '12px', md: '16px', '2xl': '24px' }}
                mt={{ base: '12px', lg: '16px', '2xl': '24px' }}
                gap={{ base: '12px', lg: '16px' }}
            >
                {commentCards}
            </Stack>
            <Button
                display={{ base: 'flex', lg: 'none' }}
                margin='0 auto'
                fontSize='m'
                alignItems='center'
                variant='clear'
                size='l'
                color='primaryColor'
                rightIcon={<ArrowForwardIcon />}
            >
                Все авторы
            </Button>
        </Box>
    );
};
