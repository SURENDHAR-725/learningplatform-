import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center px-4">
        <div className="text-8xl mb-4">🤷‍♂️</div>
        <h1 className="mb-4 text-6xl font-bold font-display text-foreground">404</h1>
        <p className="mb-2 text-2xl text-foreground font-medium">
          Oops! You've Wandered Off! 🧭
        </p>
        <p className="mb-8 text-muted-foreground max-w-md mx-auto">
          Looks like this page went on vacation without telling anyone. 
          Don't worry, we'll help you find your way back!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg" className="group">
              <Home className="w-5 h-5 mr-2" />
              Take Me Home! 🏠
            </Button>
          </Link>
          <Link to="/courses">
            <Button variant="outline" size="lg" className="group">
              <Search className="w-5 h-5 mr-2" />
              Window Shopping 🛍️
            </Button>
          </Link>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          <button 
            onClick={() => window.history.back()} 
            className="inline-flex items-center gap-1 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Oops, Go Back! ⬅️
          </button>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
