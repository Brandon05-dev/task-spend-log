import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export const getExpenses = async (projectId) => {
    const response = await axios.get(`${API_URL}/expenses/?project=${projectId}`);
    return response.data;
};

export const addExpense = async (expenseData) => {
    const response = await axios.post(`${API_URL}/expenses/`, expenseData);
    return response.data;
};

export const downloadPDFStatement = async (projectId) => {
    const response = await axios.get(`${API_URL}/projects/${projectId}/statement/`, {
        responseType: 'blob',
    });
    return response.data;
};

export const downloadExcelStatement = async (projectId) => {
    const response = await axios.get(`${API_URL}/projects/${projectId}/statement/?format=excel`, {
        responseType: 'blob',
    });
    return response.data;
};