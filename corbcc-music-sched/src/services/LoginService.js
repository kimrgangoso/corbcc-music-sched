import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.example.com', // Replace with your API base URL 1
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = (credentials) => {
  return apiClient.post('/login', credentials); // Replace '/login' with your API login endpoint
};

export default apiClient;
