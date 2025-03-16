
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Competitions from "./pages/Competitions";
import Leaderboard from "./pages/Leaderboard";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import CustomBasketGame from "./pages/CustomBasketGame";
import PredefinedBasketGame from "./pages/PredefinedBasketGame";
import CompetitionConfirmation from "./pages/CompetitionConfirmation";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ContestLeaderboard from "./pages/ContestLeaderboard";
import HelpCenter from "./pages/HelpCenter";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { AuthCheck } from "./components/AuthCheck";
import { useAuth } from "@clerk/clerk-react";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ element }: { element: React.ReactNode }) => (
  <AuthCheck>{element}</AuthCheck>
);

const App = () => {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/competitions" element={<Competitions />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/custom-basket" element={<ProtectedRoute element={<CustomBasketGame />} />} />
            <Route path="/predefined-basket" element={<ProtectedRoute element={<PredefinedBasketGame />} />} />
            <Route path="/competition-confirmation" element={<ProtectedRoute element={<CompetitionConfirmation />} />} />
            <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contest-leaderboard/:contestId" element={<ContestLeaderboard />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
