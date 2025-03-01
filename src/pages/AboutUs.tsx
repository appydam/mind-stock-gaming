
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Building2, Users, LineChart, Target, BookOpen } from "lucide-react";
import MorphCard from "@/components/ui/MorphCard";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Arpit",
      role: "Role: take care of everything",
      bio: "lode ki bio. ex - amazon, adobe, etc..."
    },
    {
      name: "Yuvraj",
      role: "Role: take care of everything",
      bio: "kya hee hoti hai bio"
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
                About MindStock
              </h1>
              <p className="text-lg text-muted-foreground">
                Combining market knowledge and prediction skills in a competitive platform
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-muted-foreground mb-6">
                  MindStock was founded on the belief that stock prediction is both an art and a science.
                  Our mission is to create a platform where financial enthusiasts can test their market
                  intuition and analytical skills without the risk of actual trading losses.
                </p>
                <p className="text-muted-foreground">
                  We aim to democratize access to market prediction competitions, providing
                  both educational value and entertainment through our innovative approach to
                  fantasy stock trading.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <MorphCard className="p-6 flex flex-col items-center text-center animate-fade-up" style={{ animationDelay: "100ms" }}>
                  <Target className="h-12 w-12 text-primary mb-4" />
                  <h3 className="font-medium text-lg mb-2">Focus on Skill</h3>
                  <p className="text-sm text-muted-foreground">Rewarding market knowledge and prediction accuracy</p>
                </MorphCard>
                <MorphCard className="p-6 flex flex-col items-center text-center animate-fade-up" style={{ animationDelay: "200ms" }}>
                  <Users className="h-12 w-12 text-gold-500 mb-4" />
                  <h3 className="font-medium text-lg mb-2">Community</h3>
                  <p className="text-sm text-muted-foreground">Building a network of market enthusiasts</p>
                </MorphCard>
                <MorphCard className="p-6 flex flex-col items-center text-center animate-fade-up" style={{ animationDelay: "300ms" }}>
                  <BookOpen className="h-12 w-12 text-mint-600 mb-4" />
                  <h3 className="font-medium text-lg mb-2">Educational</h3>
                  <p className="text-sm text-muted-foreground">Learning through competition and analysis</p>
                </MorphCard>
                <MorphCard className="p-6 flex flex-col items-center text-center animate-fade-up" style={{ animationDelay: "400ms" }}>
                  <LineChart className="h-12 w-12 text-primary mb-4" />
                  <h3 className="font-medium text-lg mb-2">Data-Driven</h3>
                  <p className="text-sm text-muted-foreground">Using real market data for competitions</p>
                </MorphCard>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-secondary/20">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="font-display text-3xl font-bold mb-10 text-center">Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, i) => (
                <MorphCard
                  key={i}
                  className="p-6 animate-fade-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-medium text-lg text-center mb-1">{member.name}</h3>
                  <p className="text-sm text-primary text-center mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground text-center">{member.bio}</p>
                </MorphCard>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <Building2 className="h-12 w-12 text-primary mx-auto mb-6" />
              <h2 className="font-display text-3xl font-bold mb-6">Our Company</h2>
              <p className="text-muted-foreground mb-6">
                Founded in 2023, MindStock has quickly grown to become a leading platform for fantasy
                stock trading competitions. We are headquartered in New York City with a distributed team
                of financial experts and developers around the world.
              </p>
              <p className="text-muted-foreground mb-8">
                As we continue to grow, we remain committed to our core values of transparency, fair competition,
                and educational enrichment. We believe that by creating engaging competitions, we can help
                more people develop their market analysis skills and financial literacy.
              </p>
              <Link to="/contact" className="text-primary font-medium hover:underline">
                Get in touch with us →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
