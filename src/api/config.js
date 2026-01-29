const API_BASE_URL = import.meta.env.VITE_DUMMY_BASE_URL;
const APP_ID = import.meta.env.VITE_DUMMY_APP_ID;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const apiConfig = {
  baseURL: API_BASE_URL,
  headers: {
    'app-id': APP_ID,
    'Content-Type': 'application/json',
  },
};

export const backendConfig = {
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const createApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

export const createBackendUrl = (endpoint) => `${BACKEND_URL}${endpoint}`;
