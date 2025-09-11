import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiService, Project, Expense } from '../services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjectData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const [projectData, expensesData] = await Promise.all([
          apiService.getProject(parseInt(id)),
          apiService.getExpenses(parseInt(id))
        ]);
        setProject(projectData);
        setExpenses(expensesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    loadProjectData();
  }, [id]);

  if (loading) {
    return <div>Loading project details...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBudget = project.budget - totalExpenses;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{project.name}</h1>
        <Button asChild>
          <a href="/">Back to Dashboard</a>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Description</p>
              <p>{project.description}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Budget</p>
              <p className="text-2xl font-bold">${project.budget}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Expenses</p>
              <p className="text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Remaining Budget</p>
              <p className={`text-2xl font-bold ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${remainingBudget.toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Budget Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Used: ${totalExpenses.toFixed(2)}</span>
                <span>Budget: ${project.budget}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${remainingBudget >= 0 ? 'bg-blue-600' : 'bg-red-600'}`}
                  style={{ width: `${Math.min((totalExpenses / project.budget) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground">
                {((totalExpenses / project.budget) * 100).toFixed(1)}% of budget used
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Expenses</CardTitle>
          <CardDescription>
            {expenses.length} expense{expenses.length !== 1 ? 's' : ''} recorded
          </CardDescription>
        </CardHeader>
        <CardContent>
          {expenses.length === 0 ? (
            <p className="text-muted-foreground">No expenses recorded yet.</p>
          ) : (
            <div className="space-y-2">
              {expenses.map((expense) => (
                <div key={expense.id} className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {expense.category} • {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="font-bold">${expense.amount}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectDetail;
