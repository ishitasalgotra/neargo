import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { IndianRupee, Clock, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import MapComponent from "@/components/MapComponent";
import RideCard from "@/components/RideCard";
import { useToast } from "@/hooks/use-toast";

const DriverDashboard = () => {
  const { toast } = useToast();
  const [isOnline, setIsOnline] = useState(false);
  const [pendingRequests, setPendingRequests] = useState([
    {
      id: 1,
      pickup: "Metro Station Gate 2",
      destination: "Green Park Apartments",
      distance: "2.3 km",
      estimatedTime: "8 mins",
      price: 45
    },
    {
      id: 2,
      pickup: "Central Bus Stand",
      destination: "Tech Park, Block A",
      distance: "3.5 km",
      estimatedTime: "12 mins",
      price: 65
    }
  ]);

  const handleToggleOnline = (checked: boolean) => {
    setIsOnline(checked);
    toast({
      title: checked ? "You're now online! 🚗" : "You're now offline",
      description: checked ? "You can receive ride requests" : "You won't receive new requests"
    });
  };

  const handleAcceptRide = (id: number) => {
    setPendingRequests(pendingRequests.filter(req => req.id !== id));
    toast({
      title: "Ride Accepted! 🎉",
      description: "Navigate to pickup location"
    });
  };

  const handleRejectRide = (id: number) => {
    setPendingRequests(pendingRequests.filter(req => req.id !== id));
    toast({
      title: "Ride Rejected",
      description: "Looking for other riders nearby..."
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Driver Dashboard 🚗</h1>
              <p className="text-muted-foreground text-lg">Manage your rides and earnings</p>
            </div>
            <Card className="shadow-float border-2 border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-semibold text-lg">
                      {isOnline ? "🟢 Online" : "⚪ Offline"}
                    </p>
                  </div>
                  <Switch 
                    checked={isOnline}
                    onCheckedChange={handleToggleOnline}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-soft hover:shadow-float transition-all animate-scale-in border-2 border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Today's Earnings</p>
                  <p className="text-3xl font-bold flex items-center text-primary">
                    <IndianRupee className="h-6 w-6" />
                    850
                  </p>
                </div>
                <div className="bg-gradient-hero p-3 rounded-lg">
                  <IndianRupee className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-float transition-all animate-scale-in border-2 border-border" style={{ animationDelay: '100ms' }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Rides Completed</p>
                  <p className="text-3xl font-bold text-primary">18</p>
                </div>
                <div className="bg-gradient-card p-3 rounded-lg">
                  <MapPin className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-float transition-all animate-scale-in border-2 border-border" style={{ animationDelay: '200ms' }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Hours Online</p>
                  <p className="text-3xl font-bold text-primary">6.5</p>
                </div>
                <div className="bg-gradient-accent p-3 rounded-lg">
                  <Clock className="h-8 w-8 text-accent-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Ride Requests */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-2xl font-bold mb-4">
              Pending Requests ({pendingRequests.length})
            </h2>
            
            {!isOnline && (
              <Card className="shadow-soft border-2 border-muted animate-fade-in">
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground">
                    Go online to receive ride requests
                  </p>
                </CardContent>
              </Card>
            )}

            {isOnline && pendingRequests.length === 0 && (
              <Card className="shadow-soft border-2 border-border animate-fade-in">
                <CardContent className="pt-6 text-center">
                  <div className="pulse-soft text-4xl mb-2">👀</div>
                  <p className="text-muted-foreground">
                    Looking for riders nearby...
                  </p>
                </CardContent>
              </Card>
            )}

            {isOnline && pendingRequests.map((request, index) => (
              <div key={request.id} style={{ animationDelay: `${index * 100}ms` }}>
                <RideCard
                  {...request}
                  onAccept={() => handleAcceptRide(request.id)}
                  onReject={() => handleRejectRide(request.id)}
                />
              </div>
            ))}
          </div>

          {/* Map */}
          <div className="lg:col-span-2 animate-fade-in">
            <Card className="overflow-hidden shadow-float border-2 border-border">
              <CardHeader>
                <CardTitle>Your Location</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <MapComponent 
                  className="h-[600px] rounded-none"
                  markers={isOnline ? [
                    { position: [28.6139, 77.2090] as [number, number], popup: "Your Location" }
                  ] : []}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
