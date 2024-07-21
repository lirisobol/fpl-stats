import axios from "axios";

// Base URL for your Express server
const api = axios.create({
  baseURL: "http://localhost:3001/api/",
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;