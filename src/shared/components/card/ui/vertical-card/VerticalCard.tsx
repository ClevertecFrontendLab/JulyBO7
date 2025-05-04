import { Box, Button, Card, CardProps, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';

import { RecipeBages } from '~/entities/category';
import { Recipe } from '~/entities/recipe';
import Bookmark from '~/shared/assets/icons/components/BsBookmarkHeart';
import Emoji from '~/shared/assets/icons/components/BsEmojiHeartEyes';
import { BadgeColor } from '~/shared/components/badge/ui/Badge';
import { IMAGE_API } from '~/shared/constants/imageApi';

type VerticalCardProps = {
    recipe: Recipe;
    onClick?: () => void;
    style?: CardProps;
};

export const VerticalCard: FC<VerticalCardProps> = (props) => {
    const { recipe, style, onClick } = props;

    const handleClickCard = () => {
        onClick?.();
    };

    return (
        <Card
            as='article'
            borderRadius='8px'
            position='relative'
            width={{ base: '158px', lg: '277px', '2xl': '322px' }}
            height={{ base: '220px', lg: '402px', '2xl': '414px' }}
            flexShrink={0}
            onClick={handleClickCard}
            {...style}
        >
            <Image
                width={{ base: '158px', lg: '279px', '2xl': '322px' }}
                height={{ base: '128px', lg: '230px', '2xl': '230px' }}
                objectFit='cover'
                borderTopLeftRadius='8px'
                borderTopRightRadius='8px'
                src={`${IMAGE_API}${recipe.image}`}
            />

            <VStack
                border='1px solid rgba(0, 0, 0, 0.08)'
                padding={{ base: '8px 8px 4px 8px', lg: '12px', '2xl': '16px 24px 20px 24px' }}
                spacing={{ base: '8px', lg: '24px' }}
            >
                <Box w='100%' height={{ base: '48px', lg: '100px' }}>
                    <Heading
                        fontSize={{ base: 'm', lg: 'l', '2xl': 'xl' }}
                        fontWeight={500}
                        noOfLines={{ base: 2, lg: 1 }}
                        lineHeight={{ base: '150%', lg: '156%', '2xl': '140%' }}
                    >
                        {recipe.title}
                    </Heading>
                    <Text
                        lineHeight='143%'
                        fontSize='s'
                        noOfLines={3}
                        fontWeight={400}
                        marginTop='8px'
                        height='4.5em'
                        position={{ base: 'absolute', lg: 'static' }}
                        color={{ base: 'transparent', lg: 'primaryColor' }}
                        top='-1000%'
                    >
                        {recipe.description}
                    </Text>
                </Box>
                <Box display='flex' alignItems='flex-start' justifyContent='space-between' w='100%'>
                    <RecipeBages
                        onlyFirstCategory
                        badgeColor={BadgeColor.SECONDARY}
                        badgeStyle={{
                            position: { base: 'absolute', lg: 'static' },
                            top: '8px',
                            left: '8px',
                        }}
                        recipe={recipe}
                    />
                    <Box display='flex' gap='8px'>
                        <Button variant='withIcon' color='lime.600' h='24px'>
                            <Bookmark />
                            <Text fontSize='12px'>{recipe.bookmarks}</Text>
                        </Button>

                        <Button variant='withIcon' color='lime.600' h='24px'>
                            <Emoji />
                            <Text fontSize='12px'>{recipe.likes}</Text>
                        </Button>
                    </Box>
                </Box>
            </VStack>
        </Card>
    );
};
