import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Shield, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const navigate = useNavigate(); // ✅ navigation hook

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Your Last Mile,{" "}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Simplified
                  </span>
                  💛
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Connect with nearby drivers for short, affordable rides from metro or bus stops to your final destination. Quick, easy, and always nearby.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/rider">
                  <Button size="lg" variant="hero" className="w-full sm:w-auto">
                    Book a Ride
                  </Button>
                </Link>

                <Link to="/driver">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Become a Driver
                  </Button>
                </Link>

                {/* ✅ Share a Ride Button */}
                <button
                  onClick={() => navigate("/share-ride")}
                  className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-all"
                >
                  Share a Ride (Split Fare)
                </button>
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-hero opacity-20 blur-3xl rounded-full" />
              <img
                src={heroImage}
                alt="NearGo ride sharing illustration"
                className="relative rounded-2xl shadow-float floating"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Why Choose NearGo?</h2>
            <p className="text-xl text-muted-foreground">Fast, affordable, and always nearby</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-card border-2 border-border shadow-soft hover:shadow-float transition-all group animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-gradient-card p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Simple steps to your destination</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div
                key={index}
                className="text-center space-y-4 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="bg-gradient-hero text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto shadow-float">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-hero">
        <div className="container mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold text-primary-foreground">Ready to Get Started?</h2>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Join thousands of commuters who've made their last mile easier with NearGo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/rider">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-background">
                Start Riding Now
              </Button>
            </Link>
            <Link to="/driver">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Drive and Earn
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 NearGo. Making your last mile delightful. 💛</p>
        </div>
      </footer>
    </div>
  );
};

const features = [
  { icon: Zap, title: "Instant Matching", description: "Get connected with nearby drivers in seconds" },
  { icon: MapPin, title: "Short Rides", description: "Perfect for 1-5 km trips from transit stops" },
  { icon: Clock, title: "Save Time", description: "No more waiting for buses or long walks" },
  { icon: Shield, title: "Safe & Secure", description: "Verified drivers and real-time tracking" }
];

const steps = [
  { title: "Request a Ride", description: "Enter your pickup and destination points" },
  { title: "Get Matched", description: "We'll find the nearest available driver" },
  { title: "Reach Your Goal", description: "Track your ride and arrive safely" }
];

export default Index;
