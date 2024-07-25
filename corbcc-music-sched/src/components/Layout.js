// src/components/Layout.js

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog } from '@fortawesome/free-solid-svg-icons';
import { NotificationManager } from 'react-notifications';
import { getProfileDetails } from '../services/ProfileService';
import '../styles/Layout.css';

function Layout({ children }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [hasUserMaintenanceModule, setHasUserMaintenanceModule] = useState(false);
  const [hasProfileMaintenanceModule, setHasProfileMaintenanceModule] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/login');
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Update date and time every second
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const dateTime = now.toLocaleDateString(undefined, options) + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setCurrentDateTime(dateTime);
    };
    
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fetch user data and profile details on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
          setFirstName(userData.firstName);
          setLastName(userData.lastName);

          if (userData.profileIdList.length > 0) {
            const profileDetails = await getProfileDetails(userData.profileIdList[0]);
            const modules = profileDetails.module.map(mod => ({
              moduleName: mod.moduleName,
              actions: mod.actions
            }));

            setHasUserMaintenanceModule(modules.some(mod => mod.moduleName === 'User Maintenance'));
            setHasProfileMaintenanceModule(modules.some(mod => mod.moduleName === 'Profile Maintenance'));
          }
        } else {
          NotificationManager.error('User data not found, please log in again.');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching profile details:', error);
        NotificationManager.error('An error occurred. Please try again later.');
      }
    };

    fetchData();
  }, [navigate]);

  // Handle click outside of dropdown menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle header click
  const handleHeaderClick = () => {
    navigate('/');
  };

  return (
    <div className="layout">
      <header className="layout-header">
        <h1 onClick={handleHeaderClick} style={{ cursor: 'pointer' }}>
          CORMS
        </h1>
        <div className="dropdown" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="dropdown-button">
            <FontAwesomeIcon icon={faUserCog} size="lg" />
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu-container">
              <div className="dropdown-menu">
                <div className="welcome-message">
                  <p className="welcome-text">Welcome, {firstName} {lastName}</p>
                  <p className="date-time">{currentDateTime}</p>
                </div>
                {hasUserMaintenanceModule && (
                  <button onClick={() => navigate('/usermaintenance')} className="dropdown-item">
                    User Maintenance
                  </button>
                )}
                {hasProfileMaintenanceModule && (
                  <button onClick={() => navigate('/profilemaintenance')} className="dropdown-item">
                    Profile Maintenance
                  </button>
                )}
                <button onClick={handleLogout} className="dropdown-item">Logout</button>
              </div>
            </div>
          )}
        </div>
      </header>
      <main className="layout-content">
        {children}
      </main>
    </div>
  );
}

export default Layout;
