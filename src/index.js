import './style.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { React, StrictMode } from 'react'
import AppRoutes from './Routes/AppRoutes';

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
    <StrictMode>
        <AppRoutes />
    </StrictMode>

);
