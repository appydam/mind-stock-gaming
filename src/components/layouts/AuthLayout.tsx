
import React from "react";
import { Link } from "react-router-dom";
import MorphCard from "@/components/ui/MorphCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        
        <div className="flex justify-center items-center py-8">
          <MorphCard className="w-full max-w-md p-8">
            {children}
          </MorphCard>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
