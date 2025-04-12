import axios from 'axios';
import { toast } from 'react-toastify';
import { Base_URL } from '@/utils/constants';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: Base_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (optional: attach tokens, etc.)
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if needed
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('[Request Error]', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || 'Something went wrong';

    // Show user-friendly error
    toast.error(`Error: ${message}`);

    // Developer-friendly debug log
    console.error(`[API Error - ${status}]`, {
      url: error.config?.url,
      method: error.config?.method,
      data: error.config?.data,
      response: error.response,
    });

    return Promise.reject(error);
  }
);

// Generic request method
export const apiRequest = async ({ method, url, data = null, params = null }:any) => {
  try {
    const response = await apiClient({
      method,
      url,
      data,
      params,
    });
    return response.data;
  } catch (error) {
    // Already handled in interceptor
    throw error;
  }
};

export default apiClient;
