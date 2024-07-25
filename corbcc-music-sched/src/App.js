import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/login/LoginPage';
import Dashboard from './pages/dashboard/Dashboard';
import UserMaintenance from './pages/usermaintenance/UserMaintenance';
import ProfileMaintenance from './pages/profilemaintenance/ProfileMaintenance';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/usermaintenance" element={<Layout><UserMaintenance /></Layout>} />
        <Route path="/profilemaintenance" element={<Layout><ProfileMaintenance /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
