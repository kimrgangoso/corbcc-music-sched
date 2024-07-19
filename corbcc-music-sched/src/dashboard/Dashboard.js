// src/dashboard/Dashboard.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog } from '@fortawesome/free-solid-svg-icons'; // Import the user settings icon
import '../styles/Dashboard.css'; // Import CSS for styling

function Dashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [username, setUsername] = useState('User'); // Replace with actual username
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Create a ref for the dropdown menu

  // Handle logout
  const handleLogout = () => {
    // Handle logout logic here (e.g., clearing tokens, etc.)
    // Redirect to login page after logout
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

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="dropdown" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="dropdown-button">
            <FontAwesomeIcon icon={faUserCog} size="lg" />
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu-container">
              <div className="dropdown-menu">
                <div className="welcome-message">
                  <p className="welcome-text">Welcome, {username}</p>
                  <p className="date-time">{currentDateTime}</p>
                </div>
                <button onClick={handleLogout} className="dropdown-item">Logout</button>
              </div>
            </div>
          )}
        </div>
      </header>
      <main className="dashboard-content">
        {/* Your dashboard content goes here */}
        <p>Welcome to your dashboard!</p>
      </main>
    </div>
  );
}

export default Dashboard;
