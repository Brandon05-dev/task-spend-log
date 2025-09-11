import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">
              Expense Tracker
            </h1>
            <div className="space-x-4">
              <a href="/" className="text-foreground hover:text-primary transition-colors">
                Dashboard
              </a>
              <a href="/create-project" className="text-foreground hover:text-primary transition-colors">
                Create Project
              </a>
            </div>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
