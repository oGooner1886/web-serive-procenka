import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000;

export const favoritApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    Accept: 'application/json',
  },
  paramsSerializer: {
    encode: (param) => encodeURIComponent(param),
  },
});

favoritApi.interceptors.request.use((config) => {
  if (!API_KEY) {
    return Promise.reject(
      new Error('API key is not configured. Check VITE_API_KEY in .env')
    );
  }

  config.params = {
    key: API_KEY,
    ...config.params,
  };
  return config;
});

favoritApi.interceptors.response.use(
  (response) => {
    if (response.data && response.data.error) {
      return Promise.reject(new Error(String(response.data.error)));
    }
    return response;
  },
  (error) => {
    let safeMessage = 'Error connecting to parts pricing service';

    if (error.response?.data?.error) {
      safeMessage = String(error.response.data.error);
    } else if (error.code === 'ECONNABORTED') {
      safeMessage = 'Server response timeout';
    } else if (error.response?.status === 404) {
      safeMessage = 'Pricing service endpoint not found (404)';
    } else if (error.response?.status >= 500) {
      safeMessage = 'Supplier internal server error';
    } else if (error.message && !error.message.includes('object Object')) {
      safeMessage = error.message;
    }

    return Promise.reject(new Error(safeMessage));
  }
);
