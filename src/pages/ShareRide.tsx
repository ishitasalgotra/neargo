import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation, Clock, Loader2, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import MapComponent from "@/components/MapComponent";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch"; // make sure you have this component or replace with a checkbox

const RiderDashboard = () => {
  const { toast } = useToast();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [rideStatus, setRideStatus] = useState<'idle' | 'searching' | 'found' | 'active'>('idle');

  // Split fare feature states
  const [splitFareEnabled, setSplitFareEnabled] = useState(false);
  const [numPeople, setNumPeople] = useState(2); // by default split between 2 people
  const [fare, setFare] = useState(240); // example total fare

  const handleBookRide = () => {
    if (!pickup || !destination) {
      toast({
        title: "Missing information",
        description: "Please enter both pickup and destination",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    setRideStatus('searching');

    // Simulate finding a driver
    setTimeout(() => {
      setIsSearching(false);
      setRideStatus('found');
      toast({
        title: "Driver Found! 🎉",
        description: "Your driver is on the way",
      });
    }, 2000);
  };

  // Split fare calculation
  const perPersonFare = splitFareEnabled && numPeople > 0 ? (fare / numPeople).toFixed(2) : fare;

  const markers = rideStatus !== 'idle' ? [
    { position: [28.6139, 77.2090] as [number, number], popup: "Pickup Location" },
    { position: [28.6189, 77.2190] as [number, number], popup: "Destination" }
  ] : [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Book Your Ride 🚗</h1>
          <p className="text-muted-foreground text-lg">Where would you like to go today?</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Booking Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-float border-2 border-border animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Trip Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Pickup Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Enter pickup location"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Destination</label>
                  <div className="relative">
                    <Navigation className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Where to?"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Split Fare Toggle */}
                <div className="flex items-center justify-between border rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="font-medium">Split Fare</span>
                  </div>
                  <Switch 
                    checked={splitFareEnabled} 
                    onCheckedChange={setSplitFareEnabled} 
                  />
                </div>

                {/* Split Fare Inputs */}
                {splitFareEnabled && (
                  <div className="space-y-2 mt-2 animate-fade-in">
                    <label className="text-sm font-medium">Number of People</label>
                    <Input 
                      type="number"
                      min={2}
                      value={numPeople}
                      onChange={(e) => setNumPeople(Number(e.target.value))}
                    />
                    <p className="text-sm text-muted-foreground">
                      Each pays <strong>₹{perPersonFare}</strong> of total ₹{fare}
                    </p>
                  </div>
                )}

                <Button 
                  className="w-full" 
                  size="lg"
                  variant="hero"
                  onClick={handleBookRide}
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Finding Driver...
                    </>
                  ) : (
                    'Book Ride Now'
                  )}
                </Button>
              </CardContent>
            </Card>

            {rideStatus === 'found' && (
              <Card className="shadow-float border-2 border-primary animate-scale-in">
                <CardHeader className="bg-gradient-card">
                  <CardTitle className="text-primary-foreground">Driver Found!</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Driver Name</span>
                    <span className="font-semibold">Rajesh Kumar</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Vehicle</span>
                    <span className="font-semibold">Maruti Swift</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">ETA</span>
                    <span className="font-semibold flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      3 mins
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="font-semibold">⭐ 4.8</span>
                  </div>
                  <Button className="w-full" variant="outline">
                    Contact Driver
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Map */}
          <div className="lg:col-span-2 animate-fade-in">
            <Card className="overflow-hidden shadow-float border-2 border-border">
              <CardHeader>
                <CardTitle>Live Map</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <MapComponent 
                  className="h-[600px] rounded-none"
                  markers={markers}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderDashboard;
