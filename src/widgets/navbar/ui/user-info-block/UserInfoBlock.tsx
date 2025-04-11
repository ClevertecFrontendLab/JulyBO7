import { AddIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, RepeatIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
} from '@chakra-ui/react';
import { FC } from 'react';

import Bookmark from '~/shared/assets/icons/components/BsBookmarkHeart';
import Emoji from '~/shared/assets/icons/components/BsEmojiHeartEyes';
import People from '~/shared/assets/icons/components/BsPeopleFill';

type UserInfoBlockProps = {
    bookmarkCount?: number;
    emojiCount?: number;
    peopleCount?: number;
};

export const UserInfoBlock: FC<UserInfoBlockProps> = (props) => {
    const { bookmarkCount, emojiCount, peopleCount } = props;
    return (
        <Box display={{ base: 'flex', lg: 'none' }} alignItems='center'>
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
            <Menu>
                <MenuButton
                    h='48px'
                    w='48px'
                    padding='0px 12px'
                    as={IconButton}
                    aria-label='Options'
                    icon={<HamburgerIcon />}
                    border='none'
                    color='primaryColor'
                    bg='transparent'
                />

                <MenuList>
                    <MenuItem icon={<AddIcon />} command='⌘T'>
                        New Tab
                    </MenuItem>
                    <MenuItem icon={<ExternalLinkIcon />} command='⌘N'>
                        New Window
                    </MenuItem>
                    <MenuItem icon={<RepeatIcon />} command='⌘⇧N'>
                        Open Closed Tab
                    </MenuItem>
                    <MenuItem icon={<EditIcon />} command='⌘O'>
                        Open File...
                    </MenuItem>
                </MenuList>
            </Menu>
        </Box>
    );
};
