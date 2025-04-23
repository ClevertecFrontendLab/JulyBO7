import { checkboxAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    checkboxAnatomy.keys,
);

const baseStyle = definePartsStyle({
    label: {
        color: 'primaryColor',
    },
    control: {
        borderRadius: '2px',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: 'lime.150',
        bg: 'inherit',
        _hover: { bg: 'lime.400', borderColor: 'lime.400' },
        _checked: { bg: 'lime.400', borderColor: 'lime.400' },
    },
    icon: {
        color: 'primaryColor',
    },
});

const lime = definePartsStyle({
    control: defineStyle({
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: 'lime.150',
        bg: 'inherit',
        _hover: { bg: 'lime.400', borderColor: 'lime.400' },
        _checked: { bg: 'lime.400', borderColor: 'lime.400' },
    }),
});

export const checkboxTheme = defineMultiStyleConfig({ baseStyle, variants: { lime } });
