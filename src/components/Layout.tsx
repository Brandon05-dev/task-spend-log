import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DollarSign, FileText, Plus } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="rounded-lg bg-gradient-primary p-2">
                <DollarSign className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">ExpenseTracker</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Project Expense Management</p>
              </div>
            </Link>

            <nav className="flex items-center space-x-1">
              <Link
                to="/"
                className={`flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-smooth hover:bg-muted ${
                  isActive('/') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <Link
                to="/create-project"
                className={`flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-smooth hover:bg-muted ${
                  isActive('/create-project') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">New Project</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;