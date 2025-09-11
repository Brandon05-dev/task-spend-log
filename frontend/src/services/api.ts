const API_BASE_URL = 'http://localhost:8000/api';

export interface Project {
  id?: number;
  name: string;
  description: string;
  budget: number;
  created_at?: string;
  total_expenses?: number;
}

export interface Expense {
  id?: number;
  project: number;
  description: string;
  amount: number;
  date: string;
  category: string;
  created_at?: string;
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Project endpoints
  async getProjects(): Promise<Project[]> {
    const data = await this.request<{ count: number; results: Project[] }>('/projects/');
    return data.results;
  }

  async getProject(id: number): Promise<Project> {
    return this.request<Project>(`/projects/${id}/`);
  }

  async createProject(project: Omit<Project, 'id' | 'created_at' | 'total_expenses'>): Promise<Project> {
    return this.request<Project>('/projects/', {
      method: 'POST',
      body: JSON.stringify(project),
    });
  }

  async updateProject(id: number, project: Partial<Project>): Promise<Project> {
    return this.request<Project>(`/projects/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(project),
    });
  }

  async deleteProject(id: number): Promise<void> {
    await this.request(`/projects/${id}/`, {
      method: 'DELETE',
    });
  }

  // Expense endpoints
  async getExpenses(projectId?: number): Promise<Expense[]> {
    const endpoint = projectId ? `/expenses/?project=${projectId}` : '/expenses/';
    return this.request<Expense[]>(endpoint);
  }

  async getExpense(id: number): Promise<Expense> {
    return this.request<Expense>(`/expenses/${id}/`);
  }

  async createExpense(expense: Omit<Expense, 'id' | 'created_at'>): Promise<Expense> {
    return this.request<Expense>('/expenses/', {
      method: 'POST',
      body: JSON.stringify(expense),
    });
  }

  async updateExpense(id: number, expense: Partial<Expense>): Promise<Expense> {
    return this.request<Expense>(`/expenses/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(expense),
    });
  }

  async deleteExpense(id: number): Promise<void> {
    await this.request(`/expenses/${id}/`, {
      method: 'DELETE',
    });
  }

  // Statement endpoints
  async downloadStatement(projectId: number, format: 'pdf' | 'excel' = 'pdf'): Promise<Blob> {
    const url = `${API_BASE_URL}/projects/${projectId}/statement/?format=${format}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Statement download failed: ${response.statusText}`);
    }
    
    return response.blob();
  }
}

export const apiService = new ApiService();
