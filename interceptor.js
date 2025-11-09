import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://192.168.1.20:8000',
  timeout: 10000,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Do something before request is sent, e.g., add auth token
    const token = AsyncStorage.getItem('userToken');; // Get token from storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  async (error) => {
    // Do something with response error, e.g., handle 401 Unauthorized
    if (error.response && error.response.status === 401) {
      // Handle token refresh or logout
      console.log('Unauthorized request. Refreshing token or logging out...');
      // Example: await refreshToken();
    }
    return Promise.reject(error);
  }
);


export default api;