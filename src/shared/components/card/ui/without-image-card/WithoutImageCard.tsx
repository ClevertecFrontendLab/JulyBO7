import { Box, Button, Heading, IconProps, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';

import Bookmark from '~/shared/assets/icons/components/BsBookmarkHeart';
import Emoji from '~/shared/assets/icons/components/BsEmojiHeartEyes';
import { Badge } from '~/shared/components/badge/ui/Badge';

import cls from './WithoutImageCard.module.scss';

export type WithoutImageCardProps = {
    title: string;
    text: string;
    BadgeIcon: FC<IconProps>;
    badgeText: string;

    bookmarkCount?: number;
    emojiCount?: number;
};

export const WithoutImageCard: FC<WithoutImageCardProps> = (props) => {
    const { title, text, BadgeIcon, bookmarkCount, emojiCount, badgeText } = props;

    return (
        <VStack
            as='article'
            justify='space-between'
            borderColor='gray.200'
            borderWidth='1px'
            borderStyle='solid'
            borderRadius='8px'
            padding={{ base: '8px 8px 4px 8px', lg: '12px', '2xl': '16px 24px 20px 24px' }}
            spacing={{ base: '8px', lg: '24px' }}
            h={{ base: '168px', lg: '180px', '2xl': '192px' }}
            w={{ base: '328px', md: '232px', lg: '282px', '2xl': '322px' }}
        >
            <Box w='100%' height={{ base: '48px', lg: '100px' }}>
                <Heading
                    fontSize={{ base: 'm', lg: 'l', '2xl': 'xl' }}
                    fontWeight={500}
                    lineHeight={{ base: '150%', lg: '156%', '2xl': '140%' }}
                    whiteSpace='nowrap'
                    overflow='hidden'
                    textOverflow='ellipsis'
                    className={cls.title}
                >
                    {title}
                </Heading>
                <Text
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
            <Box
                display='flex'
                justifyContent='space-between'
                w='100%'
                mb={{ base: '12px', md: '14px', lg: '16px', '2xl': '24px' }}
            >
                <Badge Icon={BadgeIcon} text={badgeText} style={{ bg: 'lime.50' }} />
                <Box display='flex' gap='8px'>
                    {bookmarkCount && (
                        <Button
                            variant='withIcon'
                            color='lime.600'
                            w={{ base: '34px', md: '32px', lg: '34px' }}
                        >
                            <Bookmark width='12px' height='12px' />
                            <Text fontSize='12px'>{bookmarkCount}</Text>
                        </Button>
                    )}
                    {emojiCount && (
                        <Button
                            variant='withIcon'
                            color='lime.600'
                            padding={{ base: '0 4px', md: '0 2px', lg: '0 4px' }}
                            w={{ base: '34px', md: '32px', lg: '34px' }}
                        >
                            <Emoji width='12px' height='12px' />
                            <Text fontSize='12px'>{emojiCount}</Text>
                        </Button>
                    )}
                </Box>
            </Box>
        </VStack>
    );
};
