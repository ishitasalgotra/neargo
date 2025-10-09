import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, User } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-hero p-2 rounded-lg shadow-soft group-hover:shadow-float transition-all">
              <Car className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              NearGo
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/rider">
              <Button 
                variant={location.pathname === '/rider' ? 'default' : 'ghost'}
                className="gap-2"
              >
                <User className="h-4 w-4" />
                I'm a Rider
              </Button>
            </Link>
            <Link to="/driver">
              <Button 
                variant={location.pathname === '/driver' ? 'secondary' : 'ghost'}
                className="gap-2"
              >
                <Car className="h-4 w-4" />
                I'm a Driver
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
