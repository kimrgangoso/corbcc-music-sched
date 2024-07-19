import axios from 'axios';

const API_URL = 'http://localhost:8080/api/login';

export const loginService = async (credentials) => {
  try {
    const response = await axios.post(API_URL, credentials);
    return response;
  } catch (error) {
    throw error; // Propagate the error to be handled by the caller
  }
};
