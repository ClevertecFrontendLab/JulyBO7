import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Box, Button, IconButton, Text } from '@chakra-ui/react';
import { FC } from 'react';

import Bookmark from '~/shared/assets/icons/components/BsBookmarkHeart';
import Emoji from '~/shared/assets/icons/components/BsEmojiHeartEyes';
import People from '~/shared/assets/icons/components/BsPeopleFill';

type UserInfoBlockProps = {
    bookmarkCount?: number;
    emojiCount?: number;
    peopleCount?: number;
    isOpenMobileMenu: boolean;
    onClick: () => void;
};

export const UserInfoBlock: FC<UserInfoBlockProps> = (props) => {
    const { bookmarkCount, emojiCount, peopleCount, onClick, isOpenMobileMenu } = props;

    return (
        <Box display={{ base: 'flex', lg: 'none' }} alignItems='center'>
            <Box display={isOpenMobileMenu ? 'none' : 'flex'}>
                <Button variant='withIcon' color='lime.600' padding='0px 8px'>
                    <Bookmark />
                    <Text fontSize='12px'>{bookmarkCount}</Text>
                </Button>
                <Button variant='withIcon' color='lime.600' padding='0px 8px'>
                    <People width='12px' height='12px' />
                    <Text fontSize='12px'>{peopleCount}</Text>
                </Button>
                <Button variant='withIcon' color='lime.600' padding='0px 8px'>
                    <Emoji />
                    <Text fontSize='12px'>{emojiCount}</Text>
                </Button>
            </Box>

            <Button
                onClick={onClick}
                h='48px'
                w='48px'
                variant='clear'
                // padding='0px 12px'
                as={IconButton}
                // aria-label='Options'
                icon={
                    isOpenMobileMenu ? (
                        <CloseIcon h='12px' w='12px' />
                    ) : (
                        <HamburgerIcon h='16px' w='16px' />
                    )
                }
                // border='none'
                // color='primaryColor'
                // bg='transparent'
            />
        </Box>
    );
};
