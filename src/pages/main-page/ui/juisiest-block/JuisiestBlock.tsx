import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, HStack, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { useNavigate } from 'react-router';

import { HorizontalCard } from '~/shared/components/card/ui/horizontal-card/HorizontalCard';
import { recipes } from '~/shared/recipes';

import { getCardHandler } from '../../model/getCardHandler';

export const JuisiestBlock: FC = () => {
    const navigate = useNavigate();
    const recipeItems = recipes.slice(0, 4);

    const handleSelection = () => {
        const state = [{ title: 'Самое сочное', path: '/juiciest' }];
        navigate('/juiciest', { state });
    };
    const juiciestCards = recipeItems.map((data, idx) => {
        const handleCook = getCardHandler(data, navigate);

        return (
            <HorizontalCard
                key={idx}
                id={data.id}
                category={data.category[0]}
                title={data.title}
                text={data.description}
                image={data.image}
                bookmarkCount={data.bookmarks}
                likesCount={data.likes}
                onCook={handleCook}
            />
        );
    });
    return (
        <Box>
            <HStack justify='space-between'>
                <Heading variant={{ base: 's', lg: 'lm', '2xl': 'xl' }}>Самое сочное </Heading>
                <Button
                    data-test-id='juiciest-link'
                    onClick={handleSelection}
                    display={{ base: 'none', lg: 'flex' }}
                    alignItems='center'
                    variant='solid'
                    bg='lime.400'
                    size='xl'
                    color='primaryColor'
                    rightIcon={<ArrowForwardIcon />}
                >
                    Вся подборка
                </Button>
            </HStack>

            <Stack
                direction={{ base: 'column', md: 'row', lg: 'column', '2xl': 'row' }}
                wrap='wrap'
                spacing={{ base: '12px', md: '16px', '2xl': '24px' }}
                mt={{ base: '12px', lg: '16px', '2xl': '24px' }}
                justify='center'
                align='center'
            >
                {juiciestCards}
                <Button
                    data-test-id='juiciest-link-mobile'
                    onClick={handleSelection}
                    display={{ base: 'flex', lg: 'none' }}
                    alignItems='center'
                    variant='solid'
                    bg='lime.400'
                    size='l'
                    color='primaryColor'
                    rightIcon={<ArrowForwardIcon />}
                >
                    Вся подборка
                </Button>
            </Stack>
        </Box>
    );
};
