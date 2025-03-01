
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  UserButton,
  useUser
} from "@clerk/clerk-react";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/competitions", label: "Competitions" },
    { path: "/leaderboard", label: "Leaderboard" },
    { path: "/how-it-works", label: "How It Works" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
            <span className="font-bold text-xl">StockMind</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground ml-auto md:hidden"
          onClick={toggleMobileMenu}
        >
          <span className="sr-only">Open main menu</span>
          <Menu className="h-6 w-6" />
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-foreground/80 ${
                isActive(item.path)
                  ? "text-foreground"
                  : "text-foreground/60"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Authentication buttons */}
        <div className="hidden md:flex items-center space-x-4 ml-auto">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Button variant="outline" size="sm" onClick={() => navigate("/sign-in")}>
              Sign In
            </Button>
            <Button size="sm" onClick={() => navigate("/sign-up")}>
              Sign Up
            </Button>
          </SignedOut>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container py-4">
              <div className="flex justify-between items-center mb-4">
                <Link to="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
                  <span className="font-bold text-xl">StockMind</span>
                </Link>
                <button
                  className="inline-flex items-center justify-center rounded-md p-2 text-foreground"
                  onClick={toggleMobileMenu}
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`block py-2 text-lg font-medium ${
                        isActive(item.path)
                          ? "text-foreground"
                          : "text-foreground/60"
                      }`}
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="pt-4 border-t">
                  <SignedIn>
                    <div className="flex items-center space-x-4">
                      <UserButton afterSignOutUrl="/" />
                      <span className="text-sm font-medium">
                        {user?.firstName || 'User'}
                      </span>
                    </div>
                  </SignedIn>
                  <SignedOut>
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          navigate("/sign-in");
                          closeMobileMenu();
                        }}
                      >
                        Sign In
                      </Button>
                      <Button
                        className="w-full"
                        onClick={() => {
                          navigate("/sign-up");
                          closeMobileMenu();
                        }}
                      >
                        Sign Up
                      </Button>
                    </div>
                  </SignedOut>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
