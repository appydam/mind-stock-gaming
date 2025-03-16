
import { useAuth, useClerk, useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const SignInButton = () => {
  const navigate = useNavigate();
  
  return (
    <Button 
      variant="outline" 
      className="rounded-full px-6"
      onClick={() => navigate('/login')}
    >
      <LogIn className="w-4 h-4 mr-2" />
      Login
    </Button>
  );
};

export const SignUpButton = () => {
  const navigate = useNavigate();
  
  return (
    <Button 
      className="rounded-full px-6"
      onClick={() => navigate('/register')}
    >
      <UserPlus className="w-4 h-4 mr-2" />
      Register
    </Button>
  );
};

export const UserButton = () => {
  const { signOut } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Successfully logged out');
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to log out');
    }
  };
  
  return (
    <Button
      variant="outline"
      className="rounded-full px-6 border-red-500 text-red-500 hover:bg-red-50"
      onClick={handleLogout}
    >
      <LogOut className="w-4 h-4 mr-2" />
      Logout
      {user && user.firstName && (
        <span className="ml-1">({user.firstName})</span>
      )}
    </Button>
  );
};
