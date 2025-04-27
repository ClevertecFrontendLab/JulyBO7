import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    inputAnatomy.keys,
);

const baseStyle = definePartsStyle({
    field: {
        color: 'lime.800',
    },
});

const outline = definePartsStyle({
    field: defineStyle({
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: 'gray.200',
        _focusVisible: {
            borderTopColor: 'gray.200',
            borderBottomColor: 'gray.200',
            borderLeftColor: 'gray.200',
            borderRightColor: 'gray.200',
            boxShadow: 'none',
        },
        _focusWithin: {
            borderTopColor: 'gray.200',
            borderBottomColor: 'gray.200',
            borderLeftColor: 'gray.200',
            borderRightColor: 'gray.200',
            boxShadow: 'none',
        },
    }),
});
const search = definePartsStyle({
    field: defineStyle({
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: 'gray.100',
    }),
});
const s = defineStyle({
    borderRadius: '4px',
    p: '0px 12px',
    h: '32px',
    textStyle: 's',
});

const sizes = {
    s: definePartsStyle({ field: s, addon: s }),
};

export const inputTheme = defineMultiStyleConfig({
    baseStyle,
    variants: { outline, search },
    sizes,
});
