import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Task API service
export const taskApi = {
  // Get all tasks
  getAllTasks: async () => {
    try {
      const response = await api.get('/tasks');
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  // Create a new task
  createTask: async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  // Update a task
  updateTask: async (taskId, taskData) => {
    try {
      const response = await api.put(`/tasks/${taskId}`, taskData);
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  // Delete a task
  deleteTask: async (taskId) => {
    try {
      const response = await api.delete(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },

  // Toggle task status
  toggleTaskStatus: async (taskId) => {
    try {
      const response = await api.patch(`/tasks/${taskId}/toggle`);
      return response.data;
    } catch (error) {
      console.error('Error toggling task status:', error);
      throw error;
    }
  },

  // Get tasks by category
  getTasksByCategory: async (category) => {
    try {
      const response = await api.get(`/tasks/category/${category}`);
      return response.data;
    } catch (error) {
      console.error('Error in getTasksByCategory:', error);
      throw error;
    }
  },

  // Get tasks by status
  getTasksByStatus: async (status) => {
    try {
      const response = await api.get(`/tasks/status/${status}`);
      return response.data;
    } catch (error) {
      console.error('Error in getTasksByStatus:', error);
      throw error;
    }
  },

  // Get tasks by deadline date
  getTasksByDeadline: async (date) => {
    try {
      const response = await api.get(`/tasks/deadline/${date}`);
      return response.data;
    } catch (error) {
      console.error('Error in getTasksByDeadline:', error);
      throw error;
    }
  },

  // Get upcoming tasks
  getUpcomingTasks: async () => {
    try {
      const response = await api.get('/tasks/upcoming');
      return response.data;
    } catch (error) {
      console.error('Error in getUpcomingTasks:', error);
      throw error;
    }
  },
};

// Auth API service
export const authApi = {
  // Login
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  // Register
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
  }
}; 