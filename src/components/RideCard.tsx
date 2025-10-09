import { MapPin, Clock, IndianRupee } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RideCardProps {
  pickup: string;
  destination: string;
  distance: string;
  estimatedTime: string;
  price: number;
  onAccept?: () => void;
  onReject?: () => void;
  type?: 'request' | 'active';
}

const RideCard = ({
  pickup,
  destination,
  distance,
  estimatedTime,
  price,
  onAccept,
  onReject,
  type = 'request'
}: RideCardProps) => {
  return (
    <Card className="overflow-hidden shadow-float hover:shadow-soft transition-all animate-scale-in border-2 border-border">
      <div className="h-2 bg-gradient-card" />
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Pickup</p>
              <p className="font-semibold text-foreground">{pickup}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-accent/20 p-2 rounded-lg">
              <MapPin className="h-5 w-5 text-accent-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Destination</p>
              <p className="font-semibold text-foreground">{destination}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{estimatedTime}</span>
              <span className="text-muted-foreground">• {distance}</span>
            </div>
            <div className="flex items-center gap-1 text-xl font-bold text-primary">
              <IndianRupee className="h-5 w-5" />
              <span>{price}</span>
            </div>
          </div>

          {type === 'request' && (onAccept || onReject) && (
            <div className="flex gap-2 pt-2">
              {onReject && (
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={onReject}
                >
                  Reject
                </Button>
              )}
              {onAccept && (
                <Button 
                  variant="hero" 
                  className="flex-1"
                  onClick={onAccept}
                >
                  Accept Ride
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RideCard;
