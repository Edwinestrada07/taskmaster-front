//index.js. Este archivo es el punto de entrada de tu aplicación, y es 
//el lugar adecuado para incluir configuraciones globales y efectos secundarios

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { ThemeDarkMode } from './themeDarkMode/themeDark';

ThemeDarkMode();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

reportWebVitals();



