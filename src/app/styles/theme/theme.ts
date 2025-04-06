import { extendTheme } from '@chakra-ui/react';

import { Button } from './components/button';

const theme = extendTheme({
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
    fontSizes: {
        xs: '12px',
        s: '14px',
        m: '16px',
        l: '18px',
        xl: '20px',
        '2xl': '48px',
    },
    textStyles: {
        s: {
            fontSize: '14px',
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
        '3xl': '1920px',
    },
    components: {
        Button,
    },
});
export default theme;
