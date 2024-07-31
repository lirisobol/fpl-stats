import axios from 'axios';

const baseURL = '/api/general-information'; // Use the Netlify function endpoint
console.log(`API Base URL: ${baseURL}`);

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;