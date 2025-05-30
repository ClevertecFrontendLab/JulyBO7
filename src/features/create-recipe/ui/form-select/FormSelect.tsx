import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Box, Button, Checkbox, HStack, Menu, MenuButton, MenuList, Text } from '@chakra-ui/react';
import { ChangeEvent, FC, useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

import { Category } from '~/shared/types/categories';

import { SELECT_AT_LEAST_3_TAGS } from '../../model/constants/formText';
import { CreateDraftFormSchema } from '../../model/schemas/createDraftFormSchema';
import { CreateNewRecipeFormData } from '../../model/schemas/createNewRecipeFormSchema';
import { Placeholder } from './placeholder/Placeholder';

type FormSelectProps = {
    options?: Category[];
    isClose?: boolean;
} & UseControllerProps<CreateNewRecipeFormData | CreateDraftFormSchema, 'categoriesIds'>;

export const FormSelect: FC<FormSelectProps> = (props) => {
    const { options, isClose, ...rest } = props;

    const { field, fieldState } = useController(rest);
    const [selectedOptions, setSelectedOptions] = useState<Category[]>([]);
    console.log('field form select: ', field.value);

    const handleCheckedOption = (option: Category) => (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.checked;
        if (value) {
            const fieldValue = [...selectedOptions.map((options) => options._id), option._id];
            setSelectedOptions([...selectedOptions, option]);
            field.onChange(fieldValue);
        } else {
            const value = selectedOptions.filter(
                (selectedOption) => selectedOption._id !== option._id,
            );
            setSelectedOptions(value);
            field.onChange(value.map((item) => item._id));
        }
    };
    const optionsList = options?.map((option, idx) => (
        <Box
            key={idx}
            _hover={{ bg: 'lime.100' }}
            h='32px'
            px='16px'
            bg={idx % 2 ? 'bgColor' : 'gray.300'}
        >
            <Checkbox
                isChecked={
                    !!selectedOptions.find((selectedOption) => selectedOption._id === option._id)
                }
                onChange={handleCheckedOption(option)}
                variant='lime'
                autoFocus={false}
            >
                <Text textStyle='s'>{option.title}</Text>
            </Checkbox>
        </Box>
    ));

    return (
        <HStack gap={{ base: '16px', lg: '24px' }} align='center' w='100%'>
            <Text textStyle={{ base: 's', lg: 'm' }} fontWeight={600} flexGrow={1}>
                {SELECT_AT_LEAST_3_TAGS}
            </Text>
            <Menu closeOnSelect={false}>
                {({ isOpen }) => (
                    <Box
                        position='relative'
                        w={{ base: '196px', md: '232px', lg: '350px' }}
                        flexShrink={0}
                    >
                        <MenuButton
                            _hover={{ bg: 'transparent' }}
                            _active={{ bg: 'transparent' }}
                            // isDisabled={disabled}
                            as={Button}
                            w='100%'
                            variant='outline'
                            minH='40px'
                            h='auto'
                            bg='bgColor'
                            border={
                                isOpen
                                    ? '1px solid #c4ff61'
                                    : fieldState.invalid
                                      ? '1px solid red'
                                      : '1px solid  rgba(0, 0, 0, 0.08)'
                            }
                            px='16px'
                            rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                            display='flex'
                            justifyContent='space-between'
                            alignItems='center'
                            textAlign='left'
                            p='10px 16px'
                            textStyle='s'
                        >
                            <Placeholder selectedOptions={selectedOptions} />
                        </MenuButton>
                        {!isOpen || isClose ? null : (
                            <MenuList
                                w={{ base: '196px', md: '232px', lg: '350px' }}
                                minW='196px'
                                zIndex='1000'
                                height='300px'
                                overflowY='auto'
                            >
                                {optionsList}
                            </MenuList>
                        )}
                    </Box>
                )}
            </Menu>
        </HStack>
    );
};
