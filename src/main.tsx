import '~/app/styles/style.scss';

import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import App from '~/app/App.tsx';
import { store } from '~/app/store/configure-store';

import { theme } from './app/styles/theme/theme';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <ChakraProvider theme={theme}>
                    <App />
                </ChakraProvider>
            </Provider>
        </BrowserRouter>
    </StrictMode>,
);
