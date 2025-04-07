import { Box, Button, Card, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { FC, SVGProps } from 'react';

import Bookmark from '~/shared/assets/icons/components/BsBookmarkHeart';
import Emoji from '~/shared/assets/icons/components/BsEmojiHeartEyes';
import Teftels from '~/shared/assets/images/image.jpg';

import { Badge } from '../../../badge/ui/Badge';
import cls from './VerticalCard.module.scss';

type HorizontalCardProps = {
    title: string;
    text: string;

    BadgeIcon: FC<SVGProps<SVGSVGElement>>;
    badgeText: string;
    image?: string;
    alt?: string;
    bookmarkCount?: number;
    emojiCount?: number;
};

export const VerticalCard: FC<HorizontalCardProps> = (props) => {
    const {
        alt,
        title,
        text,
        BadgeIcon,
        bookmarkCount,
        emojiCount,
        badgeText,
        image = Teftels,
    } = props;

    return (
        <Card
            as='article'
            borderRadius='8px'
            width={{ base: '158px', lg: '277px', '2xl': '322px' }}
            height={{ base: '220px', lg: '402px', '2xl': '414px' }}
        >
            <Image
                width={{ base: '158px', lg: '279px', '2xl': '322px' }}
                height={{ base: '128px', lg: '230px', '2xl': '230px' }}
                objectFit='cover'
                borderBottomLeftRadius='8px'
                borderTopLeftRadius='8px'
                src={image}
                alt={alt}
            />

            <VStack
                border='1px solid green'
                padding={{ base: '8px 8px 4px 8px', lg: '12px', '2xl': '16px 24px 20px 24px' }}
                spacing={{ base: '8px', lg: '24px' }}
            >
                <Box w='100%' height={{ base: '48px', lg: '100px' }}>
                    <Heading
                        fontSize={{ base: 'm', lg: 'l', '2xl': 'xl' }}
                        fontWeight={500}
                        lineHeight={{ base: '150%', lg: '156%', '2xl': '140%' }}
                        whiteSpace={{ base: 'wrap', lg: 'nowrap' }}
                        overflow='hidden'
                        textOverflow='ellipsis'
                        // mb={{ base: '20px', lg: 0 }}
                        className={cls.title}
                    >
                        {title}
                    </Heading>
                    <Text
                        display={{ base: 'none', lg: 'block' }}
                        lineHeight='143%'
                        fontSize='s'
                        textOverflow='ellipsis'
                        overflow='hidden'
                        fontWeight={400}
                        marginTop='8px'
                        height='4.5em'
                        className={cls.text}
                    >
                        {text}
                    </Text>
                </Box>
                <Box display='flex' justifyContent='space-between' w='100%'>
                    <Badge Icon={BadgeIcon} text={badgeText} style={{ bg: 'lime.150' }} />
                    <Box display='flex' gap='8px'>
                        {bookmarkCount && (
                            <Button variant='withIcon' color='lime.600'>
                                <Bookmark width={12} height={12} />
                                <Text fontSize='12px'>123</Text>
                            </Button>
                        )}
                        {emojiCount && (
                            <Button variant='withIcon' color='lime.600'>
                                <Emoji width={12} height={12} />
                                <Text fontSize='12px'>12</Text>
                            </Button>
                        )}
                    </Box>
                </Box>
            </VStack>
        </Card>
    );
};
