
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/userDetails/view';

export const getUsers = async () => {
  try {
    const response = await axios.post(API_URL);
    return response.data; // Adjust according to the structure of your API response
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};
