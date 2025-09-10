import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Expense {
  id: string;
  amount: number;
  description: string;
  date: string;
  projectId: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  totalSpent: number;
  expenses: Expense[];
}

interface ExpenseState {
  projects: Project[];
}

type ExpenseAction = 
  | { type: 'ADD_PROJECT'; payload: Omit<Project, 'id' | 'totalSpent' | 'expenses'> }
  | { type: 'ADD_EXPENSE'; payload: Omit<Expense, 'id'> }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'DELETE_EXPENSE'; payload: { projectId: string; expenseId: string } };

const initialState: ExpenseState = {
  projects: [
    {
      id: '1',
      name: 'Website Redesign',
      description: 'Complete overhaul of company website with modern design',
      totalSpent: 4250.00,
      expenses: [
        { id: '1', amount: 2500.00, description: 'UI/UX Design Services', date: '2024-01-15', projectId: '1' },
        { id: '2', amount: 750.00, description: 'Stock Photography License', date: '2024-01-20', projectId: '1' },
        { id: '3', amount: 1000.00, description: 'Development Tools & Software', date: '2024-01-25', projectId: '1' },
      ]
    },
    {
      id: '2',
      name: 'Marketing Campaign Q1',
      description: 'Digital marketing push for Q1 product launch',
      totalSpent: 1875.50,
      expenses: [
        { id: '4', amount: 1200.00, description: 'Google Ads Campaign', date: '2024-02-01', projectId: '2' },
        { id: '5', amount: 675.50, description: 'Social Media Graphics', date: '2024-02-05', projectId: '2' },
      ]
    }
  ]
};

const expenseReducer = (state: ExpenseState, action: ExpenseAction): ExpenseState => {
  switch (action.type) {
    case 'ADD_PROJECT': {
      const newProject: Project = {
        ...action.payload,
        id: Date.now().toString(),
        totalSpent: 0,
        expenses: []
      };
      return {
        ...state,
        projects: [...state.projects, newProject]
      };
    }
    case 'ADD_EXPENSE': {
      const newExpense: Expense = {
        ...action.payload,
        id: Date.now().toString()
      };
      return {
        ...state,
        projects: state.projects.map(project => 
          project.id === action.payload.projectId
            ? {
                ...project,
                expenses: [...project.expenses, newExpense],
                totalSpent: project.totalSpent + action.payload.amount
              }
            : project
        )
      };
    }
    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(project => project.id !== action.payload)
      };
    case 'DELETE_EXPENSE':
      return {
        ...state,
        projects: state.projects.map(project => 
          project.id === action.payload.projectId
            ? {
                ...project,
                expenses: project.expenses.filter(expense => expense.id !== action.payload.expenseId),
                totalSpent: project.totalSpent - (project.expenses.find(e => e.id === action.payload.expenseId)?.amount || 0)
              }
            : project
        )
      };
    default:
      return state;
  }
};

const ExpenseContext = createContext<{
  state: ExpenseState;
  dispatch: React.Dispatch<ExpenseAction>;
} | null>(null);

export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
};