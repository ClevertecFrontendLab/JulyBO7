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
    },
    textStyles: {
        s: {
            fontSize: '14px',
            fontLine: '20px',
            fontFamily: 'Inter, sans-serif',
        },
        m: {
            fontSize: '16px',
            fontLine: '24px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
        },
        l: {
            fontSize: '18px',
            fontLine: '28px',
            fontFamily: 'Inter, sans-serif',
        },
        xl: {
            fontSize: '20px',
            fontLine: '28px',
            fontWeight: 500,
            fontFamily: 'Inter, sans-serif',
        },
        '2xl': {
            fontSize: '48px',
            fontLine: '100%',
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
        '3xl': '1920px',
    },
});
