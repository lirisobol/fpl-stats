import axios from 'axios';

const netlifyProxy = '/api/general-information'; // Use the Netlify function endpoint
export const netlifyProxyApi = axios.create({
  baseURL: netlifyProxy,
  headers: {
    'Content-Type': 'application/json',
  },
});
const serverProxy = "http://localhost:3001/api/general-information"
export const localServerApi = axios.create({
    baseURL: serverProxy,
    headers: {
        'Content-Type': 'application/json',
    },
})