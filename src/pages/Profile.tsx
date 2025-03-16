
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

const Profile = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is not signed in, redirect to login
    if (!isSignedIn) {
      navigate("/login");
    }
  }, [isSignedIn, navigate]);

  return (
    <>
      <SignedIn>
        <div className="min-h-screen bg-background">
          <header className="pt-20 pb-8 bg-gradient-to-b from-muted/50 to-background text-center">
            <div className="container px-4 md:px-6">
              <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
              <p className="mt-2 text-muted-foreground">
                Welcome back, {user?.fullName || user?.username || user?.primaryEmailAddress?.emailAddress?.split('@')[0] || 'User'}
              </p>
            </div>
          </header>
          
          <main className="container px-4 md:px-6 py-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Profile Content */}
              <div className="col-span-full lg:col-span-2 space-y-6">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold">Account Information</h2>
                    <div className="grid gap-4">
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Name</span>
                        <p>{user?.fullName || 'Not provided'}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Email</span>
                        <p>{user?.primaryEmailAddress?.emailAddress || 'Not provided'}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Username</span>
                        <p>{user?.username || 'Not provided'}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Joined</span>
                        <p>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Not available'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default Profile;
