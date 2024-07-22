// src/login/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginService } from '../services/LoginService'; // Adjust path as necessary
import '../styles/LoginPage.css'; // Import CSS for styling

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please fill in both fields.');
      return;
    }
    setLoading(true);
    try {
      const response = await loginService({ username, password });
      console.log('Login successful:', response.data);
      // Redirect to dashboard with data
      setLoading(false);
      navigate('/dashboard', { state: { userData: response.data } });
    } catch (error) {
      setLoading(false);
      if (error.response) {
        // Use the error message from the backend response
        setError(error.response.data || 'Login failed. Please try again later.');
      } else if (error.request) {
        // The request was made but no response was received
        setError('Network error. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('Unexpected error. Please try again later.');
      }
      console.error('Error logging in:', error);
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
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoComplete="off" // Disable suggestions
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="off" // Disable suggestions
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
