import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider
    domain="kwhousing.us.auth0.com"
    clientId="SQSIR0YgNtxm8fO1HZNDqTKTH7MicKd7"
    redirectUri={window.location.origin}>
    <App />
    </Auth0Provider>
);
