import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/Index/App';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import MainComponent from './pages/Main/MainComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/main" element={<MainComponent />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

