import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Box, Button, Checkbox, HStack, Menu, MenuButton, MenuList, Text } from '@chakra-ui/react';
import { ChangeEvent, FC, useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

import { Category } from '~/shared/types/categories';

import { SELECT_AT_LEAST_3_TAGS } from '../../model/constants/formText';
import { CreateDraftFormSchema } from '../../model/schemas/createDraftFormSchema';
import { CreateNewRecipeFormData } from '../../model/schemas/createNewRecipeFormSchema';
import { Placeholder } from './placeholder/Placeholder';

export type SelectedOption = { title: string; id: string };

type FormSelectProps = {
    options?: Category[];
    isClose?: boolean;
} & UseControllerProps<CreateNewRecipeFormData | CreateDraftFormSchema, 'categoriesIds'>;

export const FormSelect: FC<FormSelectProps> = (props) => {
    const { options, isClose, ...rest } = props;

    const { field, fieldState } = useController(rest);

    const defaultSelectedOptions = !field.value
        ? []
        : field.value
              .map((subcatId) => {
                  const option = options?.find((option) => option._id === subcatId);
                  return option ? { title: option.title, id: option._id } : undefined;
              })
              .filter((selectedOption) => selectedOption !== undefined);

    const [selectedOptions, setSelectedOptions] =
        useState<SelectedOption[]>(defaultSelectedOptions);

    const handleCheckedOption = (option: Category) => (e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.currentTarget.checked;
        if (checked) {
            let fieldValue;
            if (field.value) {
                fieldValue = [...field.value, option._id];
            } else {
                fieldValue = [option._id];
            }

            field.onChange(fieldValue);
            setSelectedOptions([...selectedOptions, { title: option.title, id: option._id }]);
        } else {
            const fieldValue = field.value?.filter((subcatId) => subcatId !== option._id);
            field.onChange(fieldValue);
            setSelectedOptions(
                selectedOptions.filter((selectedOption) => selectedOption?.id !== option._id),
            );
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
                isChecked={!!field.value?.find((subcatId) => subcatId === option._id)}
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
