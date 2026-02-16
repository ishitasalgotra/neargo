import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation, Clock, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import MapComponent from "@/components/MapComponent";
import { useToast } from "@/hooks/use-toast";

const RiderDashboard = () => {
  const { toast } = useToast();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [rideStatus, setRideStatus] = useState<'idle' | 'searching' | 'found' | 'active'>('idle');

 const handleBookRide = async () => {
  if (!pickup || !destination) {
    toast({
      title: "Missing information",
      description: "Please enter both pickup and destination",
      variant: "destructive"
    });
    return;
  }

  setIsSearching(true);
  setRideStatus("searching");

  try {
    const res = await fetch("http://localhost:5000/api/rides", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        riderName: "Ishita", // you can later replace this with logged-in user
        pickup,
        destination,
        mode: "ride"
      })
    });

    const data = await res.json();
    console.log("✅ Ride Created:", data);

    // simulate found driver
    setTimeout(() => {
      setIsSearching(false);
      setRideStatus("found");
      toast({
        title: "Driver Found! 🎉",
        description: "Your driver is on the way",
      });
    }, 2000);
  } catch (error) {
    console.error("❌ Error booking ride:", error);
    toast({
      title: "Error",
      description: "Could not book ride. Try again later.",
      variant: "destructive",
    });
  }
};

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
