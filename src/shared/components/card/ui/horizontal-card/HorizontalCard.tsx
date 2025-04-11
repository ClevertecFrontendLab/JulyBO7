import { Box, Button, ButtonGroup, Card, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { FC } from 'react';

import Bookmark from '~/shared/assets/icons/components/BsBookmarkHeart';
import Emoji from '~/shared/assets/icons/components/BsEmojiHeartEyes';

import { Badge } from '../../../badge/ui/Badge';
import cls from './HorizontalCard.module.scss';

type HorizontalCardProps = {
    title: string;
    text: string;
    onSave?: () => void;
    onCook?: () => void;
    badgeImage: string;
    badgeText: string;
    image?: string;
    alt?: string;
    bookmarkCount?: number;
    emojiCount?: number;
};

export const HorizontalCard: FC<HorizontalCardProps> = (props) => {
    const { title, onSave, onCook, text, badgeImage, badgeText, image, emojiCount, bookmarkCount } =
        props;

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
        >
            <Image
                width={{ base: '158px', lg: '346px' }}
                height={{ base: '128px', lg: '244px' }}
                objectFit='cover'
                borderBottomLeftRadius='8px'
                borderTopLeftRadius='8px'
                src={image}
                alt='Noodles with chicken'
            />

            <Stack
                padding={{ base: '8px 8px 4px 8px', lg: '20px 24px' }}
                spacing={{ base: 0, lg: '24px' }}
                w={{ base: '170px', md: '198px', lg: '534px', '2xl': '322px' }}
                border='1px solid gray.200'
            >
                <Box display='flex' justifyContent='space-between'>
                    <Badge
                        image={badgeImage}
                        text={badgeText}
                        style={{
                            position: { base: 'absolute', lg: 'static' },
                            top: { base: '8px' },
                            left: { base: '8px' },
                        }}
                    />
                    <Box display='flex' gap='8px'>
                        <Button variant='withIcon' color='lime.600' h='24px'>
                            <Bookmark />
                            <Text fontSize='12px'>{bookmarkCount}</Text>
                        </Button>
                        <Button variant='withIcon' color='lime.600' h='24px'>
                            <Emoji />
                            <Text fontSize='12px'>{emojiCount}</Text>
                        </Button>
                    </Box>
                </Box>

                <Box width={{ md: '166px', lg: '486px', '3xl': '274px' }} height={{ lg: '100px' }}>
                    <Heading
                        fontSize={{ base: 'm', lg: 'xl' }}
                        fontWeight={500}
                        whiteSpace={{ base: 'wrap', lg: 'nowrap' }}
                        overflow='hidden'
                        textOverflow='ellipsis'
                        mb={{ base: '20px', lg: 0 }}
                        className={cls.title}
                        textAlign='left'
                    >
                        {title}
                    </Heading>
                    <Text
                        display={{ base: 'none', lg: 'block' }}
                        textStyle='s'
                        marginTop='8px'
                        height='4.5em'
                        textOverflow='ellipsis'
                        textAlign='left'
                        className={cls.text}
                    >
                        {text}
                    </Text>
                </Box>

                <ButtonGroup gap={{ base: '12px', lg: '8px' }} justifyContent='flex-end' mt='auto'>
                    <Button variant='outline' size={{ base: 's', lg: 'm' }} onClick={onSave}>
                        <Bookmark />
                        <Text ml='8px' display={{ base: 'none', lg: 'block' }} fontWeight={600}>
                            Сохранить
                        </Text>
                    </Button>
                    <Button onClick={onCook} variant='solid' size={{ base: 's', lg: 'm' }}>
                        <Text fontWeight={600}>Готовить</Text>
                    </Button>
                </ButtonGroup>
            </Stack>
        </Card>
    );
};
