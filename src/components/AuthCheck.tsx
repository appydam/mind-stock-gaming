
import { useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

type AuthCheckProps = {
  children: React.ReactNode;
};

export const AuthCheck = ({ children }: AuthCheckProps) => {
  const { isLoaded, userId } = useAuth();
  
  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!userId) {
    toast.error('Please sign in to access this page', {
      id: 'auth-required',
    });
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};
