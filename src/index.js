import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { store } from './redux/store';
import { Provider } from 'react-redux/es/exports';

import GlobalStyles from './components/GlobalStyles';
import './components/GlobalStyles/GridSystem.scss';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
root.render(
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>,
    // </React.StrictMode>
);

reportWebVitals();
