import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginPage from './pages/LoginPage';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoginPage />
  </React.StrictMode>
);

reportWebVitals();
