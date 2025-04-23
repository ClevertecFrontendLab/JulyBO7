import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    inputAnatomy.keys,
);

const baseStyle = definePartsStyle({
    field: {
        color: 'lime.800',
        _focusVisible: {
            borderTopColor: 'rgba(0, 0, 0, 0.08)',
            borderBottomColor: 'rgba(0, 0, 0, 0.08)',
            borderLeftColor: 'rgba(0, 0, 0, 0.08)',
            borderRightColor: 'rgba(0, 0, 0, 0.08)',
            boxShadow: 'none',
        },
        _focusWithin: {
            borderTopColor: 'rgba(0, 0, 0, 0.08)',
            borderBottomColor: 'rgba(0, 0, 0, 0.08)',
            borderLeftColor: 'rgba(0, 0, 0, 0.08)',
            borderRightColor: 'rgba(0, 0, 0, 0.08)',
            boxShadow: 'none',
        },
    },
});

const outline = definePartsStyle({
    field: defineStyle({
        borderStyle: 'solid',
        borderWith: '1px',
        borderColor: 'rgba(0, 0, 0, 0.08)',
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

export const inputTheme = defineMultiStyleConfig({ baseStyle, variants: { outline }, sizes });
