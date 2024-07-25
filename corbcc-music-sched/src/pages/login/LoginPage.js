import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { loginService } from '../../services/LoginService';
import '../../styles/LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      NotificationManager.error('Please fill in both fields.');
      return;
    }
    setLoading(true);
    try {
      const response = await loginService({ username, password });
      console.log('Login successful:', response.data);
      localStorage.setItem('userData', JSON.stringify(response.data));
      setLoading(false);
      navigate('/', { state: { userData: response.data } });
    } catch (error) {
      NotificationManager.error(error.response?.data || 'Login failed');
      console.error('Error logging in:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin();
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
