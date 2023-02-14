import React from 'react';
import ReactDom from 'react-dom/client'; //react 18.0

import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider
        theme={{
            token: {
                colorPrimary: 'black',
            },
        }}
    >
        <BrowserRouter>
            <App></App>
        </BrowserRouter>
    </ConfigProvider>
);
