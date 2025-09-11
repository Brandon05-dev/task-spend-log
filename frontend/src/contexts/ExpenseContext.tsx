import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Project, Expense } from '../services/api';

interface ExpenseState {
  projects: Project[];
  expenses: Expense[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
}

type ExpenseAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_PROJECTS'; payload: Project[] }
  | { type: 'SET_EXPENSES'; payload: Expense[] }
  | { type: 'SET_CURRENT_PROJECT'; payload: Project | null }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'DELETE_PROJECT'; payload: number }
  | { type: 'ADD_EXPENSE'; payload: Expense }
  | { type: 'UPDATE_EXPENSE'; payload: Expense }
  | { type: 'DELETE_EXPENSE'; payload: number };

const initialState: ExpenseState = {
  projects: [],
  expenses: [],
  currentProject: null,
  loading: false,
  error: null,
};

function expenseReducer(state: ExpenseState, action: ExpenseAction): ExpenseState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload };
    case 'SET_EXPENSES':
      return { ...state, expenses: action.payload };
    case 'SET_CURRENT_PROJECT':
      return { ...state, currentProject: action.payload };
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.id ? action.payload : project
        ),
        currentProject: state.currentProject?.id === action.payload.id ? action.payload : state.currentProject,
      };
    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(project => project.id !== action.payload),
        currentProject: state.currentProject?.id === action.payload ? null : state.currentProject,
      };
    case 'ADD_EXPENSE':
      return { ...state, expenses: [...state.expenses, action.payload] };
    case 'UPDATE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map(expense =>
          expense.id === action.payload.id ? action.payload : expense
        ),
      };
    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense.id !== action.payload),
      };
    default:
      return state;
  }
}

interface ExpenseContextValue extends ExpenseState {
  dispatch: React.Dispatch<ExpenseAction>;
}

const ExpenseContext = createContext<ExpenseContextValue | undefined>(undefined);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  return (
    <ExpenseContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpense() {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
}
