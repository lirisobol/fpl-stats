import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://fantasy.premierleague.com/api/bootstrap-static/',
    headers: {
    'Content-Type': 'application/json',
  },
});

export default api;