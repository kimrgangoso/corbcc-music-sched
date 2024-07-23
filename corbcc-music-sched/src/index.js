import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import Dashboard from './pages/dashboard/Dashboard';
import UserMaintenance from './pages/usermaintenance/UserMaintenance';
import ProfileMaintenance from './pages/profilemaintenance/ProfileMaintenance';
import './index.css';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <NotificationContainer />
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* Default route */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/usermaintenance" element={<UserMaintenance />} />
        <Route path="/profilemaintenance" element={<ProfileMaintenance />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
