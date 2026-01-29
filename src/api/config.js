const API_BASE_URL = import.meta.env.VITE_DUMMY_BASE_URL;
const APP_ID = import.meta.env.VITE_DUMMY_APP_ID;

export const apiConfig = {
  baseURL: API_BASE_URL,
  headers: {
    'app-id': APP_ID,
    'Content-Type': 'application/json',
  },
};

export const createApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;
