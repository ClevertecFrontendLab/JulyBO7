import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardProps,
    Heading,
    Image,
    Stack,
    Text,
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

import { RecipeBages } from '~/entities/category';
import { Recipe } from '~/entities/recipe';
import Bookmark from '~/shared/assets/icons/components/BsBookmarkHeart';
import Emoji from '~/shared/assets/icons/components/BsEmojiHeartEyes';
import { IMAGE_API } from '~/shared/constants/imageApi';
import { Category } from '~/shared/types/categories';

import { Badge, BadgeColor, BadgeTheme } from '../../../badge/ui/Badge';

type HorizontalCardProps = {
    title: ReactNode;
    recipe: Recipe;
    categories?: Category[];
    onCook?: () => void;
    recomend?: { user: string; avatar: string };
    indexForTest?: number;
    onSave?: () => void;
} & CardProps;

export const HorizontalCard: FC<HorizontalCardProps> = (props) => {
    const { title, onSave, onCook, recomend, indexForTest, recipe, categories, ...rest } = props;

    return (
        <Card
            as='article'
            direction={{ base: 'row' }}
            fontSize='s'
            fontWeight='400'
            borderRadius='8px'
            width={{ base: '328px', md: '356px', lg: '880px', '2xl': '668px' }}
            height={{ base: '128px', lg: '244px' }}
            position='relative'
            {...rest}
        >
            <Image
                width={{ base: '158px', lg: '346px' }}
                height={{ base: '128px', lg: '244px' }}
                objectFit='cover'
                borderBottomLeftRadius='8px'
                borderTopLeftRadius='8px'
                src={`${IMAGE_API}${recipe?.image}`}
            />

            {recomend && (
                <Badge
                    theme={BadgeTheme.RECOMEND}
                    avatar={recomend.avatar}
                    userName={recomend.user}
                    badgeColor={BadgeColor.SECONDARY}
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '24px',
                    }}
                />
            )}
            <Stack
                padding={{ base: '8px 8px 4px 8px', lg: '20px 24px' }}
                spacing={{ base: 0, lg: '24px' }}
                w={{ base: '170px', md: '198px', lg: '534px', '2xl': '322px' }}
                border='1px solid gray.200'
            >
                <Box display='flex' justifyContent='space-between'>
                    <Box
                        position={{ base: 'absolute', lg: 'static' }}
                        top={{ base: '8px' }}
                        left={{ base: '8px' }}
                    >
                        {categories && (
                            <RecipeBages
                                recipe={recipe}
                                categories={categories}
                                onlyFirstCategory
                            />
                        )}
                    </Box>

                    <Box display='flex' gap='8px'>
                        <Button variant='withIcon' color='lime.600' h='24px'>
                            <Bookmark />
                            <Text fontSize='12px'>{recipe?.bookmarks}</Text>
                        </Button>
                        <Button variant='withIcon' color='lime.600' h='24px'>
                            <Emoji />
                            <Text fontSize='12px'>{recipe?.likes}</Text>
                        </Button>
                    </Box>
                </Box>

                <Box width={{ md: '166px', lg: '486px', '3xl': '274px' }} height={{ lg: '100px' }}>
                    {typeof title === 'string' ? (
                        <Heading
                            fontSize={{ base: 'm', lg: 'xl' }}
                            fontWeight={500}
                            noOfLines={{ base: 2, lg: 1 }}
                            mb={{ base: '20px', lg: 0 }}
                            textAlign='left'
                        >
                            {title}
                        </Heading>
                    ) : (
                        title
                    )}

                    <Text
                        textStyle='s'
                        marginTop='8px'
                        height='4.5em'
                        noOfLines={3}
                        textAlign='left'
                        position={{ base: 'absolute', lg: 'static' }}
                        color={{ base: 'transparent', lg: 'primaryColor' }}
                        top='-1000%'
                    >
                        {recipe?.description}
                    </Text>
                </Box>

                <ButtonGroup gap={{ base: '12px', lg: '8px' }} justifyContent='flex-end' mt='auto'>
                    <Button variant='outline' size={{ base: 's', lg: 'm' }} onClick={onSave}>
                        <Bookmark />
                        <Text ml='8px' display={{ base: 'none', lg: 'block' }} fontWeight={600}>
                            Сохранить
                        </Text>
                    </Button>
                    <Button
                        data-test-id={`card-link-${indexForTest}`}
                        onClick={onCook}
                        variant='solid'
                        size={{ base: 's', lg: 'm' }}
                    >
                        <Text fontWeight={600}>Готовить</Text>
                    </Button>
                </ButtonGroup>
            </Stack>
        </Card>
    );
};
