import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const register = (userData) => API.post('/auth/register', userData);
export const login = (credentials) => API.post('/auth/login', credentials);
export const getCurrentUser = () => API.get('/auth/me');

export const fetchTasks = (filters = {}) => API.get('/tasks', { params: filters });
export const createTask = (taskData) => API.post('/tasks', taskData);
export const updateTaskStatus = (id, status) => API.put(`/tasks/${id}/status`, { status });

export const fetchUsers = () => API.get('/users');