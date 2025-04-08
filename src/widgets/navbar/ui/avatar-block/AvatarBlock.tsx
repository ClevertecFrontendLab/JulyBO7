import { Avatar, Box, Flex, Heading, Text } from '@chakra-ui/react';
import { FC } from 'react';

type AvatarBlockProps = {
    userName: string;
    image: string;
    userEmail: string;
};
export const AvatarBlock: FC<AvatarBlockProps> = (props) => {
    const { userName, image, userEmail } = props;
    return (
        <Flex gap='12px' alignItems='center'>
            <Avatar name={userName} src={image} display={{ base: 'none', lg: 'block' }} />

            <Box padding='0px 24px' display={{ base: 'none', lg: 'block' }}>
                <Heading fontSize='l' fontWeight={500} lineHeight='156%'>
                    {userName}
                </Heading>
                <Text fontSize='s' color='gray.150'>
                    {userEmail}
                </Text>
            </Box>
        </Flex>
    );
};
