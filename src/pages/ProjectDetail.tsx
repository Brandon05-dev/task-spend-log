import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Download, Plus, Calendar, DollarSign, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useExpense } from '@/contexts/ExpenseContext';
import { useToast } from '@/hooks/use-toast';
import ExpenseForm from '@/components/ExpenseForm';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state } = useExpense();
  const { toast } = useToast();
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const project = state.projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-foreground mb-4">Project Not Found</h1>
        <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist.</p>
        <Link to="/">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  const handleGenerateStatement = () => {
    console.log('Generating statement for project:', project.name);
    console.log('Project expenses:', project.expenses);
    toast({
      title: "Statement Generated",
      description: `Statement for ${project.name} has been prepared. Check console for details.`,
    });
  };

  const sortedExpenses = [...project.expenses].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/')}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Button>
      </div>

      {/* Project Info */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {project.name}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {project.description}
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    onClick={() => setShowExpenseForm(true)}
                    className="bg-gradient-primary hover:bg-primary/90"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Expense
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleGenerateStatement}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Statement
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Expenses Table */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Expense History</span>
                <Badge variant="secondary" className="ml-2">
                  {project.expenses.length} total
                </Badge>
              </CardTitle>
              <CardDescription>
                All expenses recorded for this project
              </CardDescription>
            </CardHeader>
            <CardContent>
              {project.expenses.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <DollarSign className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No expenses yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                    Start tracking expenses for this project by adding your first expense entry.
                  </p>
                  <Button
                    onClick={() => setShowExpenseForm(true)}
                    className="bg-gradient-primary hover:bg-primary/90"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add First Expense
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[120px]">Date</TableHead>
                        <TableHead className="w-[120px] text-right">Amount</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="w-[80px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedExpenses.map((expense) => (
                        <TableRow key={expense.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">
                            {new Date(expense.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right font-semibold text-accent">
                            ${expense.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            {expense.description}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                console.log('Delete expense:', expense.id);
                                toast({
                                  title: "Expense deleted",
                                  description: "Expense entry has been removed.",
                                });
                              }}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Project Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Spent</span>
                <span className="text-2xl font-bold text-accent">
                  ${project.totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Expenses</span>
                <span className="text-lg font-semibold text-foreground">
                  {project.expenses.length}
                </span>
              </div>
              {project.expenses.length > 0 && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Average</span>
                    <span className="text-lg font-semibold text-foreground">
                      ${(project.totalSpent / project.expenses.length).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Last Expense</span>
                    <span className="text-sm text-foreground">
                      {new Date(Math.max(...project.expenses.map(e => new Date(e.date).getTime()))).toLocaleDateString()}
                    </span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Expense Form Modal */}
      {showExpenseForm && (
        <ExpenseForm
          projectId={project.id}
          onClose={() => setShowExpenseForm(false)}
        />
      )}
    </div>
  );
};

export default ProjectDetail;