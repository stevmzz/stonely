import axios from 'axios';
const API_URL = 'http://localhost:3000/api';

// configure axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// interceptor to add authorization token to requests
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// interceptor to handle responses and errors
api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.status === 401) {
            // token is invalid or expired
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// function to register a new user
export const register = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        return {
            success: true,
            message: 'user registered successfully',
            data: response.data
        };

    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// function to login a user
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    
    if (response.data.success && response.data.token) {
      // save the token to localStorage
      localStorage.setItem('token', response.data.token);
      return {
        success: true,
        message: 'login successful',
        token: response.data.token,
      };
    }
    
    return {
      success: false,
      error: 'did not receive a valid token',
    };

  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'login failed',
    };
  }
};

// function to get the current user's profile
export const getProfile = async () => {
  try {
    const response = await api.get('/user/profile');
    return {
      success: true,
      user: response.data.user,
    };

  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'failed to fetch profile',
    };
  }
};

// function to logout the user
export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};  

// function to check if the user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; // returns true if token exists, false otherwise
};

// function to get the current authentication token
export const getAuthToken = () => {
  return localStorage.getItem('token');
};  

// function to check server health
export const checkServerHealth = async () => {
  try {
    const response = await api.get('/health');
    return {
      success: true,
      message: 'server is healthy',
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'server is not healthy',
    };
  }
};