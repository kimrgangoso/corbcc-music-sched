import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProfileDetails } from '../../services/ProfileService'; // Import the service function
import '../../styles/Dashboard.css';

function Dashboard() {
  const [username, setUsername] = useState('User');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileIdList, setProfileIdList] = useState([]);
  const [status, setStatus] = useState('');
  const [hasUserMaintenanceModule, setHasUserMaintenanceModule] = useState(false);
  const [hasProfileMaintenanceModule, setHasProfileMaintenanceModule] = useState(false);
  const location = useLocation();

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
            setHasUserMaintenanceModule(modules.some(mod => mod.moduleName === 'User Maintenance'));
            setHasProfileMaintenanceModule(modules.some(mod => mod.moduleName === 'Profile Maintenance'));
          })
          .catch(error => console.error('Error fetching profile details:', error));
      }
    }
  }, [location.state]);

  return (
    <div className="dashboard-content">
      <h2>Welcome to the Dashboard</h2>
      <p>Username: {username}</p>
      <p>Status: {status}</p>
      <p>Profile IDs: {profileIdList.join(', ')}</p>
    </div>
  );
}

export default Dashboard;
