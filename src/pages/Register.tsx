
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center pt-24 pb-16">
        <div className="w-full max-w-md px-4">
          <SignUp 
            appearance={{
              elements: {
                formButtonPrimary: 
                  "bg-primary hover:bg-primary/90 text-primary-foreground",
                card: "shadow-md rounded-lg",
                headerTitle: "text-2xl font-bold",
                headerSubtitle: "text-muted-foreground"
              }
            }}
            routing="path"
            path="/register"
            signInUrl="/login"
            redirectUrl="/"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
