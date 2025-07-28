import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthPage } from './AuthPage';
import { DashboardPage } from './DashboardPage';
import { Header } from '@/components/layout/Header';

const Index = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-pulse">
            <img 
              src="/lovable-uploads/dec5cc3d-2b68-4c06-919a-d3296d1c3cad.png" 
              alt="TshwaneFix Logo" 
              className="h-16 w-auto mx-auto mb-4"
            />
          </div>
          <p className="text-muted-foreground">Loading TshwaneFix...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <DashboardPage />
    </div>
  );
};

export default Index;
