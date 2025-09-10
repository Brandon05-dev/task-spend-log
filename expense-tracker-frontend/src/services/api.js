import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || 'http://127.0.0.1:8001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Legacy functions for backward compatibility
export const fetchProjects = async () => {
    const response = await api.get('/projects/');
    return response.data;
};

export const createProject = async (projectData) => {
    const response = await api.post('/projects/', projectData);
    return response.data;
};

export const fetchProjectDetails = async (projectId) => {
    const response = await api.get(`/projects/${projectId}/`);
    return response.data;
};

export const fetchExpenses = async (projectId) => {
    const response = await api.get(`/expenses/?project=${projectId}`);
    return response.data;
};

export const addExpense = async (expenseData) => {
    const response = await api.post('/expenses/', expenseData);
    return response.data;
};

export const downloadPDFStatement = async (projectId) => {
    const response = await api.get(`/projects/${projectId}/statement/`, {
        responseType: 'blob',
    });
    return response.data;
};

export const downloadExcelStatement = async (projectId) => {
    const response = await api.get(`/projects/${projectId}/statement/?format=excel`, {
        responseType: 'blob',
    });
    return response.data;
};

// New enhanced API functions
export const projectsAPI = {
  getAll: (page = 1) => api.get(`/projects/?page=${page}`),
  getById: (id) => api.get(`/projects/${id}/`),
  create: (projectData) => api.post('/projects/', projectData),
  update: (id, projectData) => api.put(`/projects/${id}/`, projectData),
  delete: (id) => api.delete(`/projects/${id}/`),
  downloadPDF: (id) => api.get(`/projects/${id}/statement/`, {
    responseType: 'blob',
    headers: { 'Accept': 'application/pdf' },
  }),
  downloadExcel: (id) => api.get(`/projects/${id}/statement/?format=excel`, {
    responseType: 'blob',
    headers: { 'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
  }),
};

export const expensesAPI = {
  getAll: (projectId = null, page = 1) => {
    const params = new URLSearchParams({ page: page.toString() });
    if (projectId) params.append('project', projectId.toString());
    return api.get(`/expenses/?${params}`);
  },
  getById: (id) => api.get(`/expenses/${id}/`),
  create: (expenseData) => api.post('/expenses/', expenseData),
  update: (id, expenseData) => api.put(`/expenses/${id}/`, expenseData),
  delete: (id) => api.delete(`/expenses/${id}/`),
};

// Utility function to handle file downloads
export const downloadFile = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export default api;