import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './view'
import  {Provider}  from 'react-redux';
import {store} from './view/antd/redux'

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Provider store = {store}><App tab="home" /></Provider>);

