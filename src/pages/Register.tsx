
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SignUp } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";

const Register = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  
  useEffect(() => {
    if (isSignedIn) {
      navigate("/profile");
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <SignUp 
        routing="path" 
        path="/register" 
        signInUrl="/login"
        appearance={{
          elements: {
            rootBox: "mx-auto w-full max-w-md",
            card: "shadow-lg rounded-xl border border-border bg-background p-6",
            headerTitle: "text-2xl font-bold",
            headerSubtitle: "text-muted-foreground",
            formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
            socialButtonsBlockButton: "border border-input bg-background hover:bg-accent",
            socialButtonsBlockButtonText: "text-foreground font-medium",
            formFieldLabel: "text-foreground font-medium",
            formFieldInput: "bg-background border border-input",
            footerActionLink: "text-primary hover:underline",
            identityPreviewEditButton: "text-primary hover:underline",
          }
        }}
      />
    </div>
  );
};

export default Register;
