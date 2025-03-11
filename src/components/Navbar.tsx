
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Trophy, BarChart3, LogOut, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Competitions", path: "/competitions" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Help Center", path: "/help" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Mock check for auth state - in a real app this would check localStorage, cookies, or a state management store
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      setIsAuthenticated(!!token);
    };
    
    checkAuth();
    
    // For demo: if URL has login param, set as authenticated
    if (location.search.includes('login=true')) {
      localStorage.setItem('authToken', 'demo-token');
      setIsAuthenticated(true);
    }
  }, [location]);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear auth state
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
      
      // Show success message
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
        variant: "default",
      });
      
      // Redirect to home page
      navigate('/');
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "An error occurred during logout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "py-3 bg-white/80 dark:bg-black/50 backdrop-blur-md shadow-sm"
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2 font-display text-2xl font-bold"
          >
            <BarChart3 className="w-8 h-8 text-gold-500" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-mint-600">
              MindStock
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors relative",
                  isActive(link.path)
                    ? "text-primary dark:text-primary-foreground"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold-500 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/leaderboard">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Trophy className="w-5 h-5" />
              </Button>
            </Link>
            {isAuthenticated ? (
              <Button
                onClick={handleLogout}
                variant="outline"
                className="rounded-full px-6 border-red-500 text-red-500 hover:bg-red-50"
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <LogOut className="w-4 h-4 mr-2" />
                )}
                Logout
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="rounded-full px-6">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="rounded-full px-6">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="rounded-full"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg animate-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "py-2 px-3 rounded-lg text-sm font-medium",
                  isActive(link.path)
                    ? "bg-secondary text-primary"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-primary"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-2 mt-2 border-t border-border">
              <Link to="/profile">
                <Button variant="outline" size="sm" className="rounded-full">
                  <User className="w-4 h-4 mr-2" /> Profile
                </Button>
              </Link>
              {isAuthenticated ? (
                <Button
                  onClick={handleLogout}
                  size="sm"
                  variant="outline"
                  className="rounded-full border-red-500 text-red-500"
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <LogOut className="w-4 h-4 mr-2" />
                  )}
                  Logout
                </Button>
              ) : (
                <div className="space-x-2">
                  <Link to="/login">
                    <Button variant="outline" size="sm" className="rounded-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm" className="rounded-full">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
