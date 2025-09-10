import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, DollarSign, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/contexts/ExpenseContext';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const lastExpenseDate = project.expenses.length > 0 
    ? new Date(Math.max(...project.expenses.map(e => new Date(e.date).getTime())))
    : null;

  return (
    <Link to={`/project/${project.id}`} className="block">
      <Card className="h-full transition-smooth hover:shadow-hover hover:scale-[1.02] bg-gradient-card">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <CardTitle className="text-lg font-semibold text-foreground line-clamp-2">
                {project.name}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </CardDescription>
            </div>
            <div className="rounded-full bg-primary/10 p-2 ml-3">
              <FileText className="h-4 w-4 text-primary" />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-muted-foreground">Total Spent</span>
              </div>
              <div className="text-xl font-bold text-accent">
                ${project.totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {lastExpenseDate 
                    ? `Last activity: ${lastExpenseDate.toLocaleDateString()}`
                    : 'No expenses yet'
                  }
                </span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {project.expenses.length} expense{project.expenses.length !== 1 ? 's' : ''}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProjectCard;