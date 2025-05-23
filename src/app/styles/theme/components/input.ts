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

const outlineLime = definePartsStyle({
    field: defineStyle({
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: 'lime.150',
        _placeholder: { opacity: 1, color: 'lime.800' },
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
const m = defineStyle({
    borderRadius: '6px',
    p: '0px 16px',
    h: '48px',
    textStyle: 'l',
});

const sizes = {
    s: definePartsStyle({ field: s, addon: s }),
    m: definePartsStyle({ field: m, addon: m }),
};

export const inputTheme = defineMultiStyleConfig({
    baseStyle,
    variants: { outline, search, outlineLime },
    sizes,
});
