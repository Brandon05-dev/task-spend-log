import React, { useEffect, useState } from 'react';
import { apiService, Project } from '../services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await apiService.getProjects();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button asChild>
          <a href="/create-project">Create New Project</a>
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Projects Yet</CardTitle>
            <CardDescription>
              Get started by creating your first project to track expenses.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <a href="/create-project">Create Your First Project</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Budget:</span>
                    <span className="font-medium">${project.budget}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Expenses:</span>
                    <span className="font-medium">${project.total_expenses || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Remaining:</span>
                    <span className={`font-medium ${(project.budget - (project.total_expenses || 0)) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${project.budget - (project.total_expenses || 0)}
                    </span>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline" asChild>
                  <a href={`/project/${project.id}`}>View Details</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
