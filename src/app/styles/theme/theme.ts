import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
    styles: {
        global: {
            'html, body': {
                fontFamily: 'Inter, sans-serif',
                bg: 'bgColor',
                color: 'primaryColor',
            },
        },
    },
    colors: {
        primaryColor: '#000',
        bgColor: '#fff',
        lime: {
            50: '#ffffd3',
            100: '#eaffc7',
            150: '#d7ff94',
            300: '#c4ff61',
            600: '#2db100',
            700: '#207e00',
            800: '#134b00',
        },
        gray: {
            50: ' rgba(0, 0, 0, 0.24)',
            100: '  rgba(0, 0, 0, 0.48)',
            150: 'rgba(0, 0, 0, 0.64)',
        },
    },
    fontSizes: {
        xs: '12px',
        s: '14px',
        m: '16px',
        l: '18px',
        xl: '20px',
        '2xl': '48px',
    },
    textStyles: {
        xs: {
            fontSize: '12px',
            fontWeight: 400,
            lineHeight: '16px',
            fontFamily: 'Inter, sans-serif',
        },
        s: {
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '20px',
            fontFamily: 'Inter, sans-serif',
        },
        m: {
            fontSize: '16px',
            lineHeight: '24px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
        },
        l: {
            fontSize: '18px',
            lineHeight: '28px',
            fontFamily: 'Inter, sans-serif',
        },
        xl: {
            fontSize: '20px',
            lineHeight: '28px',
            fontWeight: 500,
            fontFamily: 'Inter, sans-serif',
        },
        '2xl': {
            fontSize: '48px',
            lineHeight: '100%',
            fontWeight: 700,
            fontFamily: 'Inter, sans-serif',
        },
    },
    breakpoints: {
        base: '0px',
        sm: '360px',
        md: '768px',
        lg: '1440px',
        '2xl': '1536px',
    },
    components: {
        Button: {
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
        },
    },
});
