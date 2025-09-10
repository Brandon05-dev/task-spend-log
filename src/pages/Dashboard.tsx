import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, TrendingUp, DollarSign, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ProjectCard from '@/components/ProjectCard';
import { useExpense } from '@/contexts/ExpenseContext';

const Dashboard = () => {
  const { state } = useExpense();
  
  const totalProjects = state.projects.length;
  const totalSpent = state.projects.reduce((sum, project) => sum + project.totalSpent, 0);
  const totalExpenses = state.projects.reduce((sum, project) => sum + project.expenses.length, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Project Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage expenses across all your projects
          </p>
        </div>
        <Link to="/create-project">
          <Button className="bg-gradient-primary hover:bg-primary/90 shadow-card">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Projects
            </CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalProjects}</div>
            <p className="text-xs text-muted-foreground">
              {totalProjects === 1 ? 'Active project' : 'Active projects'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Spent
            </CardTitle>
            <DollarSign className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              ${totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all projects
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Expenses
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalExpenses}</div>
            <p className="text-xs text-muted-foreground">
              {totalExpenses === 1 ? 'Expense entry' : 'Expense entries'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Projects Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Your Projects</h2>
            <p className="text-muted-foreground">
              Click on a project to view expenses and add new ones
            </p>
          </div>
        </div>

        {state.projects.length === 0 ? (
          <Card className="p-12 text-center bg-gradient-card shadow-card">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle className="text-xl mb-2">No projects yet</CardTitle>
            <CardDescription className="mb-6 max-w-md mx-auto">
              Get started by creating your first project. You can then track expenses, 
              generate reports, and manage your budget effectively.
            </CardDescription>
            <Link to="/create-project">
              <Button className="bg-gradient-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Project
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {state.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;