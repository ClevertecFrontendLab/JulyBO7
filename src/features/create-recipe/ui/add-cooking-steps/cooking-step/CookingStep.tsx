import { Badge, Box, Button, HStack, Image, Stack, Textarea } from '@chakra-ui/react';
import { ChangeEvent, FC } from 'react';

import Basket from '~/shared/assets/icons/components/Basket';
import ImageIcon from '~/shared/assets/icons/components/Image';
import { IMAGE_API } from '~/shared/constants/imageApi';

type CookingStepProps = {
    step: number;
    invalid: boolean;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onImageAddition: () => void;
    imageSrc?: string | null;
    onDelete?: () => void;
    value?: string;

    imageBlockDataTestId?: string;
    descriptionDataTestId?: string;
    imageDataTestId?: string;
    deleteBtnDataTestId?: string;
};

export const CookingStep: FC<CookingStepProps> = (props) => {
    const {
        value,
        onChange,
        step,
        onDelete,
        invalid,
        onImageAddition,
        imageSrc,
        imageBlockDataTestId,
        imageDataTestId,
        descriptionDataTestId,
        deleteBtnDataTestId,
    } = props;

    return (
        <Stack
            w='100%'
            minH='160px'
            flexDirection={{ base: 'column', md: 'row' }}
            borderRadius='8px'
            border='1px solid rgba(0, 0, 0, 0.08)'
            gap={0}
        >
            <Box data-test-id={imageBlockDataTestId} onClick={onImageAddition}>
                {imageSrc ? (
                    <Image
                        data-test-id={imageDataTestId}
                        src={`${IMAGE_API}${imageSrc}`}
                        alt='фото шага'
                        borderRadius='8px'
                        objectFit='cover'
                        minH='160px'
                        w={{ base: '100%', md: '346px' }}
                    />
                ) : (
                    <HStack
                        minH={{ base: '160px', md: '100%' }}
                        w={{ base: '100%', md: '346px' }}
                        bg='gray.200'
                        alignItems='center'
                        justifyContent='center'
                    >
                        <ImageIcon />
                    </HStack>
                )}
            </Box>

            <Box p='20px' flexGrow={1}>
                <HStack w='100%' justifyContent='space-between' alignItems='center' mb='16px'>
                    <Badge
                        borderRadius='4px'
                        p='2px 8px'
                        bg='gray.300'
                        fontWeight={400}
                        fontSize='s'
                        textTransform='initial'
                        mb={0}
                    >
                        {`Шаг ${step}`}
                    </Badge>
                    {onDelete && (
                        <Button
                            data-test-id={deleteBtnDataTestId}
                            onClick={onDelete}
                            variant='clear'
                            minW='32px'
                            h='32px'
                        >
                            <Basket fill='lime.600' />
                        </Button>
                    )}
                </HStack>

                <Textarea
                    data-test-id={descriptionDataTestId}
                    textStyle='s'
                    placeholder='Шаг'
                    value={value}
                    onChange={onChange}
                    p='12px'
                    minH='84px'
                    h='auto'
                    borderStyle='solid'
                    borderWidth={invalid ? '2px' : '1px'}
                    borderColor={invalid ? 'rgb(229, 62, 62)' : 'gray.50'}
                    _hover={{
                        borderColor: invalid ? 'rgb(229, 62, 62)' : 'gray.200',
                        boxShadow: 'none',
                    }}
                    _focus={{
                        borderColor: invalid ? 'rgb(229, 62, 62)' : 'gray.200',
                        boxShadow: 'none',
                    }}
                    resize='vertical'
                    overflow='hidden'
                />
            </Box>
        </Stack>
    );
};
