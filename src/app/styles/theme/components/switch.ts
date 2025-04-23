import { switchAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    switchAnatomy.keys,
);

const lime = definePartsStyle({
    track: {
        bg: 'gray.350',
        _checked: {
            bg: 'lime.400',
        },
    },
});

export const switchTheme = defineMultiStyleConfig({ variants: { lime } });
