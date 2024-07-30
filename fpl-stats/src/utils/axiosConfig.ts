import axios from "axios";
import { appConfig } from "./appConfig";

// Base URL for your Express server
const api = axios.create({
  baseURL: appConfig.GeneralInformationEndpoint,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;