import { extendTheme } from '@chakra-ui/react';

export const Button = extendTheme({
    baseStyle: {
        fontWeight: 600,
        borderRadius: '6px',
        height: '32px',
    },

    sizes: {
        xs: {
            fontSize: 'xs',
            lineHeight: '133%',
            height: '24px',
            px: '8px',
            py: 0,
        },
        s: {
            fontSize: 'xs',
            lineHeight: '133%',
            px: '8px',
            py: 0,
        },
        m: {
            fontSize: 's',
            lineHeight: '143%',
            px: '12px',
            py: 0,
        },
        l: {
            fontSize: 'm',
            lineHeight: '150%',
            px: '16px',
            py: 0,
            height: '40px',
        },
        xl: {
            fontSize: 'l',
            lineHeight: '156%',
            px: '24px',
            py: 0,
            height: '48px',
        },
    },

    variants: {
        outline: {
            bg: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(0, 0, 0, 0.48)',
            color: 'rgba(0, 0, 0, 0.8)',
        },
        solid: {
            bg: 'rgba(0, 0, 0, 0.92)',
            color: 'bgColor',
        },
        clear: {
            bg: 'inherit',
            border: 'none',
            padding: 0,
            color: 'primaryColor',
        },
    },

    defaultProps: {
        size: 'm',
        variant: 'outline',
    },
});
