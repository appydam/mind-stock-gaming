
import { useEffect } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import GameTypes from "@/components/GameTypes";
import Footer from "@/components/Footer";
import { initSupabaseTables } from "@/utils/initSupabase";

const Index = () => {
  useEffect(() => {
    // Initialize Supabase tables with mock data
    initSupabaseTables();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <Features />
      <GameTypes />
      <Footer />
    </div>
  );
};

export default Index;
