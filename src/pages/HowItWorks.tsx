
import React from "react";
import { ArrowRight, Calendar, Award, TrendingUp, Users } from "lucide-react";
import MorphCard from "@/components/ui/MorphCard";

const HowItWorks = () => {
  const gameInstructions = [
    {
      title: "Custom Basket Game",
      steps: [
        "Sign up and browse available competitions",
        "Select a Custom Basket competition to join",
        "Choose 5 stocks from our curated list",
        "Pay the entry fee (if applicable)",
        "Monitor your basket's performance on the leaderboard",
        "Winners receive prizes based on their basket's performance"
      ],
      icon: TrendingUp
    },
    {
      title: "Predefined Basket Game",
      steps: [
        "Sign up and browse available competitions",
        "Select a Predefined Basket competition",
        "Choose whether the basket will have positive or negative returns",
        "Place your bet to join the competition",
        "Check the leaderboard after market close",
        "Winners share the prize pool"
      ],
      icon: Users
    }
  ];

  const rules = [
    "Competitions open daily at 4:00 AM",
    "Entry closes at 9:15 AM before market open",
    "No changes allowed after market opens",
    "Rankings determined by average basket return",
    "Prizes distributed after market close (3:30 PM)",
    "Entry fees are non-refundable once markets open"
  ];

  const faq = [
    {
      question: "How are winners determined?",
      answer: "For Custom Basket games, winners are determined by the highest average return across their selected 5 stocks. For Predefined Basket games, winners are those who correctly predict whether the basket will have positive or negative returns."
    },
    {
      question: "When can I join competitions?",
      answer: "New competitions open daily at 4:00 AM. You can join anytime between 4:00 AM and 9:15 AM before the market opens."
    },
    {
      question: "Can I modify my stock selections?",
      answer: "Yes, but only before the market opens at 9:15 AM. After that, your selections are locked for the competition."
    },
    {
      question: "How and when are prizes distributed?",
      answer: "Prizes are calculated after market close at 3:30 PM and distributed to winners' accounts automatically."
    },
    {
      question: "What happens if there's a market holiday?",
      answer: "Competitions aren't held on market holidays. Any scheduled competitions for those days will be canceled."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">How It Works</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Learn how to play and win in our stock market competitions
          </p>
          
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Game Instructions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {gameInstructions.map((game, i) => (
                <MorphCard key={i} className="flex flex-col">
                  <div className="flex items-center mb-6">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <game.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{game.title}</h3>
                  </div>
                  
                  <ol className="space-y-3 mb-6 flex-grow">
                    {game.steps.map((step, j) => (
                      <li key={j} className="flex items-start">
                        <div className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          {j + 1}
                        </div>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </MorphCard>
              ))}
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Competition Rules</h2>
            <MorphCard>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <Calendar className="h-6 w-6 text-primary mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-2">Competition Schedule</h3>
                    <ul className="space-y-2">
                      <li>• Competitions open daily at 4:00 AM</li>
                      <li>• Entry closes at 9:15 AM before market open</li>
                      <li>• Results after market close (3:30 PM)</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Award className="h-6 w-6 text-primary mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-2">Prizes & Winnings</h3>
                    <ul className="space-y-2">
                      <li>• Prizes based on entry fees collected</li>
                      <li>• Top performers receive the largest share</li>
                      <li>• Payouts processed after market close</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-bold mb-4">Important Rules</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  {rules.map((rule, i) => (
                    <li key={i} className="flex items-center">
                      <ArrowRight className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </MorphCard>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faq.map((item, i) => (
                <MorphCard key={i}>
                  <h3 className="font-bold mb-2">{item.question}</h3>
                  <p className="text-muted-foreground">{item.answer}</p>
                </MorphCard>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
