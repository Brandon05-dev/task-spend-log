import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Project API calls
export const getProjects = async () => {
    const response = await apiClient.get('/projects/');
    return response.data;
};

export const createProject = async (projectData) => {
    const response = await apiClient.post('/projects/', projectData);
    return response.data;
};

export const getProjectDetails = async (projectId) => {
    const response = await apiClient.get(`/projects/${projectId}/`);
    return response.data;
};

// Expense API calls
export const getExpenses = async (projectId) => {
    const response = await apiClient.get(`/expenses/?project=${projectId}`);
    return response.data;
};

export const addExpense = async (expenseData) => {
    const response = await apiClient.post('/expenses/', expenseData);
    return response.data;
};

// Download statements
export const downloadPDFStatement = async (projectId) => {
    const response = await apiClient.get(`/projects/${projectId}/statement/`, {
        responseType: 'blob',
    });
    return response.data;
};

export const downloadExcelStatement = async (projectId) => {
    const response = await apiClient.get(`/projects/${projectId}/statement/?format=excel`, {
        responseType: 'blob',
    });
    return response.data;
};