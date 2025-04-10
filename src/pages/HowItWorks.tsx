
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  LineChart, Users, Sparkles, DollarSign, 
  CheckCircle, BarChart3, BookOpen, Award, 
  ChevronRight
} from "lucide-react";
import MorphCard from "@/components/ui/MorphCard";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Sign Up",
      description: "Create your free account with email or Google",
    },
    {
      icon: <LineChart className="h-8 w-8 text-gold-500" />,
      title: "Browse Competitions",
      description: "Find daily, weekly, or thematic competitions that interest you",
    },
    {
      icon: <Sparkles className="h-8 w-8 text-mint-600" />,
      title: "Select Your Stocks",
      description: "Create your own basket or predict predefined basket performance",
    },
    {
      icon: <DollarSign className="h-8 w-8 text-primary" />,
      title: "Enter Competition",
      description: "Pay the entry fee and confirm your participation",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-gold-500" />,
      title: "Track Performance",
      description: "Watch how your selections perform during the competition period",
    },
    {
      icon: <Award className="h-8 w-8 text-mint-600" />,
      title: "Win Prizes",
      description: "Top performers share the prize pool based on final rankings",
    },
  ];

  const features = [
    {
      title: "Real Market Data",
      description: "All competitions use actual stock market performance data from major exchanges",
      icon: <LineChart className="h-6 w-6 text-primary" />
    },
    {
      title: "Skill-Based Competition",
      description: "Success requires market knowledge, analysis, and prediction skill",
      icon: <BookOpen className="h-6 w-6 text-mint-600" />
    },
    {
      title: "Fair & Transparent",
      description: "Clear rules and scoring based solely on stock performance",
      icon: <CheckCircle className="h-6 w-6 text-gold-500" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                How MindStock Works
              </h1>
              <p className="text-lg text-muted-foreground">
                A step-by-step guide to participating in our fantasy stock competitions
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">The Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <MorphCard
                  key={i}
                  className="relative p-6 animate-fade-up"
                  style={{animationDelay: `${i * 100}ms`}}
                >
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    {i + 1}
                  </div>
                  <div className="rounded-full p-3 bg-secondary inline-flex mb-5">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </MorphCard>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-secondary/20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Competition Types</h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">Equity Basket</h3>
                    <p className="text-muted-foreground">
                      In Custom Basket competitions, you select 5 stocks from our curated list. 
                      Your performance is based on the average return of your selected stocks over 
                      the competition period. The participants with the highest average returns win.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">Opinion Trading</h3>
                    <p className="text-muted-foreground">
                    Predict the future, one question at a time.
                    Trade your opinions on real-world events like sports, finance, and politics.
                    Win rewards for being right and climb the leaderboard of sharp minds.
                    </p>
                  </div>
                </div>
                <div className="mt-8">
                  <Link to="/competitions">
                    <Button size="lg">
                      Browse Competitions <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {features.map((feature, i) => (
                  <MorphCard key={i} className="p-6 animate-fade-up" style={{animationDelay: `${i * 100}ms`}}>
                    <div className="flex items-start">
                      <div className="rounded-full p-2 bg-secondary mr-4">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </MorphCard>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Start?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of users making predictions and winning prizes on MindStock. 
                Put your market knowledge to the test!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/competitions">
                  <Button size="lg">
                    Browse Competitions
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="lg">
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
