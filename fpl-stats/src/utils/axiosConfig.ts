import axios from "axios";

// Base URL for your Express server
const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;