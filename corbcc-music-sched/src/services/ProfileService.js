// src/services/ProfileService.js
import axios from 'axios';

export const getProfileDetails = async (profileId) => {
  try {
    const response = await axios.post('http://localhost:8080/api/profileDetails/view', { profileId });
    return response.data;
  } catch (error) {
    console.error('Error fetching profile details:', error);
    throw error;
  }
};
