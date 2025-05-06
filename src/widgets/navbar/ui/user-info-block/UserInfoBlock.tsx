import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Box, Button, IconButton, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useMatch } from 'react-router';

import Bookmark from '~/shared/assets/icons/components/BsBookmarkHeart';
import Emoji from '~/shared/assets/icons/components/BsEmojiHeartEyes';
import People from '~/shared/assets/icons/components/BsPeopleFill';
import { AppRoutes, routePaths } from '~/shared/config/router';

type UserInfoBlockProps = {
    bookmarkCount?: number;
    emojiCount?: number;
    peopleCount?: number;
    isOpenMobileMenu: boolean;
    onClick: () => void;
};

export const UserInfoBlock: FC<UserInfoBlockProps> = (props) => {
    const { bookmarkCount, emojiCount, peopleCount, onClick, isOpenMobileMenu } = props;
    const notFoundPath = useMatch(routePaths[AppRoutes.NOT_FOUND]);

    return (
        <Box display={{ base: 'flex', lg: 'none' }} alignItems='center'>
            {!notFoundPath ? (
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
            ) : null}

            <Button
                pointerEvents={{ base: 'auto', lg: 'none' }}
                onClick={onClick}
                h='48px'
                w='48px'
                variant='clear'
                as={IconButton}
                icon={
                    isOpenMobileMenu ? (
                        <CloseIcon data-test-id='close-icon' h='12px' w='12px' />
                    ) : (
                        <HamburgerIcon data-test-id='hamburger-icon' h='16px' w='16px' />
                    )
                }
            />
        </Box>
    );
};
