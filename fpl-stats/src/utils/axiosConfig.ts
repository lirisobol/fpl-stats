import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'https://fantasy.premierleague.com/api/bootstrap-static/';
console.log(`API Base URL: ${baseURL}`);

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
