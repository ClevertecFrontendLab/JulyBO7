import { Avatar, Box, Flex, Heading, Text } from '@chakra-ui/react';
import { FC } from 'react';

export type CommentCardProps = {
    text: string;
    avatar: string;
    email: string;
    name: string;
};

export const CommentCard: FC<CommentCardProps> = (props) => {
    const { text, name, avatar, email } = props;

    return (
        <Box
            border='1px solid rgba(0, 0, 0, 0.08)'
            borderRadius='8px'
            h={{ base: '152px', lg: '160px', '2xl': '184px' }}
            w={{ base: '304px', md: '226px', lg: '266px', '2xl': '426px' }}
            bg='bgColor'
        >
            <Flex
                gap={{ base: '8px', lg: '12px' }}
                alignItems='center'
                h={{ base: '64px', lg: '72px', '2xl': '88px' }}
                p={{ base: '16px 16px 8px 16px', '2xl': '24px 24px 16px 24px' }}
            >
                <Avatar name={name} src={avatar} size={{ base: '32px', lg: '48px' }} />

                <Box>
                    <Heading
                        fontSize={{ base: 'm', lg: 'l' }}
                        fontWeight={500}
                        // noOfLines={1}
                        lineHeight='156%'
                        isTruncated
                        maxWidth={{ base: '223px', md: '150px', lg: '170px', '2xl': '318px' }}
                    >
                        {name}
                    </Heading>
                    <Text textStyle={{ base: 'xs', lg: 's' }} color='gray.150'>
                        {email}
                    </Text>
                </Box>
            </Flex>

            <Text
                // h={{ base: '88px', '2xl': '96px' }}

                // p={{ base: '8px 16px 16px 16px', '2xl': '12px 24px 20px 24px' }}
                p={{ base: '8px 16px 0 16px', '2xl': '12px 24px 20px 24px' }}
                textStyle='s'
                noOfLines={3}
                // className={cls.text}
            >
                {text}
            </Text>
        </Box>
    );
};
