import axios from 'axios';

const netlifyProxy = '/api/'; // Use the Netlify function endpoint
export const netlifyProxyApi = axios.create({
  baseURL: netlifyProxy,
  headers: {
    'Content-Type': 'application/json',
  },
});
const serverProxy = "http://localhost:3001/api/"
export const localServerApi = axios.create({
    baseURL: serverProxy,
    headers: {
        'Content-Type': 'application/json',
    },
})