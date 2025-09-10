export const API_BASE_URL = "http://127.0.0.1:8000/api";

export const ENDPOINTS = {
    PROJECTS: `${API_BASE_URL}/projects/`,
    EXPENSES: `${API_BASE_URL}/expenses/`,
    PROJECT_STATEMENT: (projectId) => `${API_BASE_URL}/projects/${projectId}/statement/`,
    PROJECT_STATEMENT_EXCEL: (projectId) => `${API_BASE_URL}/projects/${projectId}/statement/?format=excel`,
};