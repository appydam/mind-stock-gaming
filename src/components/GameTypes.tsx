
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MorphCard from "./ui/MorphCard";

const GameTypes = () => {
  const gameTypes = [
    {
      title: "Custom Basket",
      description: "Select 5 stocks from our curated list and compete based on their average return",
      features: [
        "Choose your own basket of 5 stocks",
        "Track performance in real-time",
        "Win based on highest average return",
        "Compete against other players"
      ],
      cta: "Join Custom Basket Game",
      path: "/custom-basket",
      color: "from-mint-300 to-mint-600"
    },
    {
      title: "Predefined Basket",
      description: "Predict whether predefined stock baskets will have positive or negative returns",
      features: [
        "Select from midcap, largecap, or smallcap baskets",
        "Predict positive or negative performance",
        "Winners share the betting pool",
        "Multiple prediction options available"
      ],
      cta: "Join Predefined Basket Game",
      path: "/predefined-basket",
      color: "from-gold-300 to-gold-600"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background element */}
      <div className="absolute -bottom-60 -right-60 w-96 h-96 bg-gold-100/20 rounded-full blur-3xl -z-10" />

      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Choose Your Game Format
          </h2>
          <p className="text-muted-foreground text-lg">
            Select the game type that matches your prediction style and expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {gameTypes.map((game, i) => (
            <MorphCard
              key={i}
              className="flex flex-col animate-fade-up overflow-hidden"
              style={{animationDelay: `${i * 150}ms`}}
              hoverEffect
            >
              {/* Header with gradient */}
              <div className={`-mx-6 -mt-6 px-6 py-6 mb-6 bg-gradient-to-r ${game.color} text-white`}>
                <h3 className="text-2xl font-bold">{game.title}</h3>
                <p className="mt-2 text-white/90">{game.description}</p>
              </div>
              
              {/* Features */}
              <div className="flex-grow mb-6">
                <ul className="space-y-3">
                  {game.features.map((feature, j) => (
                    <li key={j} className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-primary shrink-0 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* CTA */}
              <div className="mt-auto">
                <Link to={game.path}>
                  <Button className="w-full rounded-md">
                    {game.cta}
                  </Button>
                </Link>
              </div>
            </MorphCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameTypes;
