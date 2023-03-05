import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import ThemeDefault from './styles/ThemeOverride';
import ErrorPage from './routes/ErrorPage';
import SearchInterfacePage from './routes/SearchInterfacePage';
import URLTablePage from './routes/URLTablePage';

import './index.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <SearchInterfacePage />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/:cryptoPair',
        element: <URLTablePage />,
        errorElement: <ErrorPage />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ThemeProvider theme={ThemeDefault}>
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
