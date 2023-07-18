import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/User.jsx';

import App from './components/App.jsx';
import './css/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <UserProvider>
            <App />
        </UserProvider>
    </BrowserRouter>
);