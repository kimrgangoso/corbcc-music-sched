import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog } from '@fortawesome/free-solid-svg-icons';
import { getProfileDetails } from '../../services/ProfileService'; // Import the service function
import '../../styles/Dashboard.css';

function Dashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [username, setUsername] = useState('User');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileIdList, setProfileIdList] = useState([]);
  const [status, setStatus] = useState('');
  const [hasUserMaintenanceModule, setHasUserMaintenanceModule] = useState(false);
  const [hasProfileMaintenanceModule, setHasProfileMaintenanceModule] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Handle logout
  const handleLogout = () => {
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

  // Get user data from location state
  useEffect(() => {
    if (location.state && location.state.userData) {
      const userData = location.state.userData;
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setProfileIdList(userData.profileIdList);
      setStatus(userData.status);
      setUsername(userData.username);

      // Fetch profile details using the first profile ID in the list
      if (userData.profileIdList.length > 0) {
        getProfileDetails(userData.profileIdList[0])
          .then(data => {
            const modules = data.module.map(mod => ({
              moduleName: mod.moduleName,
              actions: mod.actions
            }));

            // Check if the user has "User Maintenance" and "Profile Maintenance" modules
            const hasUserMaintenance = modules.some(mod => mod.moduleName === 'User Maintenance');
            const hasProfileMaintenance = modules.some(mod => mod.moduleName === 'Profile Maintenance');
            setHasUserMaintenanceModule(hasUserMaintenance);
            setHasProfileMaintenanceModule(hasProfileMaintenance);
          })
          .catch(error => console.error('Error fetching profile details:', error));
      }
    }
  }, [location.state]);

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
      <main className="dashboard-content">
        <p>Username: {username}</p>
        <p>Status: {status}</p>
        <p>Profile IDs: {profileIdList.join(', ')}</p>
      </main>
    </div>
  );
}

export default Dashboard;
