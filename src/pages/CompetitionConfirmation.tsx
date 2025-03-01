
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, Trophy, ArrowRight, Home } from "lucide-react";
import MorphCard from "@/components/ui/MorphCard";

const CompetitionConfirmation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(5);
  
  // Get params from URL
  const competitionType = searchParams.get('type') || 'custom';
  const basketId = searchParams.get('basketId');
  const prediction = searchParams.get('prediction');
  
  // Set confirmation details based on the competition type
  const confirmationDetails = {
    title: competitionType === 'custom' 
      ? "You've joined the Custom Basket Challenge!" 
      : "You've joined the Predefined Basket Challenge!",
    description: competitionType === 'custom'
      ? "Your stock selections have been recorded. You'll be competing against other traders with your custom basket."
      : `Your prediction (${prediction === 'positive' ? 'positive' : 'negative'} returns) for the ${basketId?.replace('-', ' ')} basket has been recorded.`,
    nextStep: "You can track your performance on the leaderboard once the competition begins."
  };

  // Countdown to redirect to the competitions page
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate('/competitions');
    }
  }, [countdown, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <MorphCard className="p-8 sm:p-12 animate-fade-up">
              <div className="flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <CheckCircle className="h-12 w-12 text-primary" />
                </div>
                
                <h1 className="text-2xl sm:text-3xl font-bold mb-3">
                  {confirmationDetails.title}
                </h1>
                
                <p className="text-muted-foreground mb-6 max-w-md">
                  {confirmationDetails.description}
                </p>
                
                <div className="flex items-center justify-center text-primary mb-6">
                  <Trophy className="h-5 w-5 mr-2" />
                  <span>{confirmationDetails.nextStep}</span>
                </div>
                
                <div className="w-full max-w-xs bg-secondary/30 h-2 rounded-full mb-6 overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${(countdown / 5) * 100}%` }}
                  />
                </div>
                
                <p className="text-sm text-muted-foreground mb-6">
                  Redirecting to competitions in {countdown} seconds...
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={() => navigate('/competitions')}>
                    <ArrowRight className="h-4 w-4 mr-2" />
                    View All Competitions
                  </Button>
                  
                  <Button variant="outline" onClick={() => navigate('/')}>
                    <Home className="h-4 w-4 mr-2" />
                    Return to Home
                  </Button>
                </div>
              </div>
            </MorphCard>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CompetitionConfirmation;
