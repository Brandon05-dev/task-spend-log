import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-md mx-auto text-center">
        <CardHeader>
          <CardTitle className="text-6xl font-bold text-muted-foreground mb-4">404</CardTitle>
          <CardTitle>Page Not Found</CardTitle>
          <CardDescription>
            The page you're looking for doesn't exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <a href="/">Go Back Home</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
