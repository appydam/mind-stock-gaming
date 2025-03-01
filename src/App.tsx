
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn, SignUp, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Index from "./pages/Index";
import Competitions from "./pages/Competitions";
import Leaderboard from "./pages/Leaderboard";
import HowItWorks from "./pages/HowItWorks";
import GamePage from "./pages/GamePage";
import NotFound from "./pages/NotFound";
import AuthLayout from "./components/layouts/AuthLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          <Route
            path="/sign-in/*"
            element={
              <AuthLayout>
                <SignIn routing="path" path="/sign-in" />
              </AuthLayout>
            }
          />
          
          <Route
            path="/sign-up/*"
            element={
              <AuthLayout>
                <SignUp routing="path" path="/sign-up" />
              </AuthLayout>
            }
          />
          
          <Route 
            path="/competitions" 
            element={
              <>
                <SignedIn>
                  <Competitions />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            } 
          />
          
          <Route 
            path="/leaderboard" 
            element={<Leaderboard />} 
          />
          
          <Route 
            path="/how-it-works" 
            element={<HowItWorks />} 
          />
          
          <Route 
            path="/game/:competitionId" 
            element={
              <>
                <SignedIn>
                  <GamePage />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            } 
          />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
