import axios from 'axios';

// Environment variables
const API_KEY = process.env.REACT_APP_RAWG_API_KEY;
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;

/**
 * Axios instance with predefined configuration
 * Implements error handling and request/response interceptors
 */
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds
  params: {
    key: API_KEY,
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You could add loading state here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case 401:
          throw new Error('Invalid API key. Please check your configuration.');
        case 404:
          throw new Error('Resource not found.');
        case 429:
          throw new Error('Rate limit exceeded. Please try again later.');
        default:
          throw new Error('An error occurred while fetching data.');
      }
    } else if (error.request) {
      // Request made but no response received
      throw new Error('No response received from server. Please check your connection.');
    } else {
      // Error in request configuration
      throw new Error('Error in request configuration.');
    }
  }
);

// API endpoints configuration
export const endpoints = {
  games: '/games',
  game: (id) => `/games/${id}`,
  screenshots: (id) => `/games/${id}/screenshots`,
  platforms: '/platforms',
  genres: '/genres',
};

// Helper function to build query parameters
export const buildQueryParams = (params = {}) => {
  const defaultParams = {
    page_size: process.env.REACT_APP_DEFAULT_PAGE_SIZE,
  };

  return {
    params: {
      ...defaultParams,
      ...params,
    },
  };
};

// Export the configured instance
export default api;