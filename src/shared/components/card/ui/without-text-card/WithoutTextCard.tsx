import { Button, Heading, HStack, IconProps } from '@chakra-ui/react';
import { FC } from 'react';

export type WithoutTextCardProps = {
    text: string;
    Icon: FC<IconProps>;
};

export const WithoutTextCard: FC<WithoutTextCardProps> = (props) => {
    const { text, Icon } = props;

    return (
        <HStack
            as='article'
            justify='space-between'
            h={{ base: '52px', '2xl': '57px' }}
            w={{ base: '328px', md: '240px', lg: '282px', '2xl': '668px' }}
            border='1px solid rgba(0, 0, 0, 0.08);'
            borderRadius='8px'
            padding={{ base: '12px', md: ' 16px 12px', '2xl': '16px 24px' }}
        >
            <HStack spacing={{ base: '8px', '2xl': '12px' }}>
                <Icon />
                <Heading
                    fontSize='l'
                    fontWeight='500'
                    whiteSpace='nowrap'
                    overflow='hidden'
                    textOverflow='ellipsis'
                >
                    {text}
                </Heading>
            </HStack>

            <Button
                variant='outline'
                borderColor='lime.600'
                color='lime.600'
                h='32px'
                size={{ base: 'xs', '2xl': 'm' }}
                fontWeight={600}
            >
                Готовить
            </Button>
        </HStack>
    );
};
