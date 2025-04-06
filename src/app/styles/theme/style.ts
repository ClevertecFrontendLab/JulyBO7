import { extendTheme } from '@chakra-ui/react';

const globalStyle = extendTheme({
    styles: {
        global: {
            'html, body': {
                fontFamily: 'Inter, sans-serif',
                bg: 'bgColor',
                color: 'primaryColor',
            },
        },
    },
});
export default globalStyle;
