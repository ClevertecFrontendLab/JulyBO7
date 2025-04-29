import { ChevronDownIcon, ChevronUpIcon, SmallAddIcon } from '@chakra-ui/icons';
import { Box, BoxProps, HStack, Input } from '@chakra-ui/react';
import React, { ChangeEvent, KeyboardEvent, ReactNode, useEffect, useState } from 'react';

type SelectProps = BoxProps & {
    options: ReactNode[];
    placeholder?: ReactNode;
    withInput?: boolean;
    optionStyle?: BoxProps;
    selectStyle?: BoxProps;
    disabled?: boolean;
    onInputChange?: (value: string) => void;
    inputValue?: string;
    onAdditionClick?: () => void;
};

export const Select: React.FC<SelectProps> = (props) => {
    const {
        placeholder = 'Выберите значение...',
        withInput,
        options,
        optionStyle,
        selectStyle,
        disabled,
        onInputChange,
        inputValue,
        onAdditionClick,
        ...rest
    } = props;

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        onInputChange?.(e.currentTarget.value);
    };
    const handleEnterClick = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onAdditionClick?.();
        }
    };
    const handleOptionsOpen = () => {
        setIsOpen(!isOpen);
    };

    const selectOptions = options.map((option, idx: number) => (
        <Box
            key={idx}
            as='li'
            p='6px 16px'
            bg={idx % 2 === 0 ? 'gray.300' : 'bgColor'}
            {...optionStyle}
        >
            {option}
        </Box>
    ));

    useEffect(() => {
        if (disabled) {
            setIsOpen(false);
        }
    }, [disabled]);

    return (
        <Box w='100%' position='relative' pointerEvents={disabled ? 'none' : 'auto'} {...rest}>
            <HStack
                minH='40px'
                maxH='64px'
                overflowY='auto'
                w='100%'
                p='16px 10px'
                m='2px 0'
                border='1px solid rgba(0, 0, 0, 0.08)'
                borderRadius='6px'
                justify='space-between'
                align='center'
                onClick={handleOptionsOpen}
                {...selectStyle}
            >
                <Box color='gray.150'>{placeholder}</Box>
                {isOpen ? (
                    <ChevronUpIcon
                        position='absolute'
                        right='12px'
                        top='50%'
                        transform='translateY(-50%)'
                    />
                ) : (
                    <ChevronDownIcon
                        position='absolute'
                        right='12px'
                        top='50%'
                        transform='translateY(-50%)'
                    />
                )}
            </HStack>
            <Box
                as='ul'
                w='100%'
                zIndex='100'
                position='absolute'
                borderRadius='4px'
                padding='4px 0px'
                boxShadow='0 1px 2px 0 rgba(0, 0, 0, 0.06), 0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                bg='bgColor'
                opacity={isOpen ? 1 : 0}
            >
                {selectOptions}
                {withInput && (
                    <HStack p='8px 8px 8px 24px' w='100%'>
                        <Input
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={handleEnterClick}
                            placeholder='Другой аллерген'
                            variant='outline'
                            size='s'
                        />
                        <SmallAddIcon
                            as='button'
                            rounded='50%'
                            color='bgColor'
                            bg='lime.600'
                            onClick={onAdditionClick}
                        />
                    </HStack>
                )}
            </Box>
        </Box>
    );
};
