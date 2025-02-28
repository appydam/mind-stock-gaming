
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Trophy, Brain, BrainCircuit } from "lucide-react";
import MorphCard from "./ui/MorphCard";

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background gradient */}
      <div className="absolute top-0 -left-40 right-0 h-[500px] bg-gradient-to-br from-mint-100/30 via-secondary/50 to-transparent rounded-full blur-3xl -z-10" />
      
      {/* Orbiting elements (decorative) */}
      <div className="absolute top-40 right-20 w-64 h-64 bg-gold-200/20 rounded-full blur-3xl animate-float -z-10" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-mint-200/20 rounded-full blur-3xl animate-float animation-delay-2000 -z-10" />

      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Chip */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary border border-border mb-8 animate-fade-in">
            <span className="text-xs font-medium text-muted-foreground">
              The Mind Sport of Stock Trading
            </span>
          </div>
          
          {/* Main headline */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-up">
            Win at the Markets with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-mint-600">
              Strategy & Skill
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-up">
            Join fantasy stock competitions where smart predictions earn real rewards. 
            No actual trading required — just your market insights and strategy.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto animate-fade-up">
            <Link to="/competitions" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto rounded-full">
                Browse Competitions <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/#how-it-works" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full">
                How It Works
              </Button>
            </Link>
          </div>
          
          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            {[
              {
                icon: <BrainCircuit className="h-6 w-6 text-mint-600" />,
                title: "Skill-Based",
                description: "Showcase your market knowledge and strategy"
              },
              {
                icon: <TrendingUp className="h-6 w-6 text-primary" />,
                title: "Real Market Data",
                description: "Compete with actual stock performance metrics"
              },
              {
                icon: <Trophy className="h-6 w-6 text-gold-500" />,
                title: "Win Prizes",
                description: "Top performers earn real rewards from prize pools"
              }
            ].map((feature, i) => (
              <MorphCard 
                key={i} 
                className="animate-fade-up"
                style={{animationDelay: `${(i + 1) * 100}ms`}}
                highlightBorder={i === 1}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full p-3 bg-secondary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-medium text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </MorphCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
