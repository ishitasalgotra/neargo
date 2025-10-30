import { useState } from "react";

interface RideRequest {
  id: number;
  pickup: string;
  destination: string;
  seats: number;
}

const ShareRide = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [seats, setSeats] = useState(1);
  const [rides, setRides] = useState<RideRequest[]>([]);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRide: RideRequest = {
      id: Date.now(),
      pickup,
      destination,
      seats,
    };

    // Check for an existing ride with the same destination
    const matchedRide = rides.find(
      (ride) => ride.destination.toLowerCase() === destination.toLowerCase()
    );

    if (matchedRide) {
      setMessage(
        `🎉 Ride matched! Connect with ride from ${matchedRide.pickup} to ${matchedRide.destination}.`
      );
      // Remove the matched ride since they are now connected
      setRides(rides.filter((ride) => ride.id !== matchedRide.id));
    } else {
      setMessage(
        `Ride created from ${pickup} to ${destination}. Waiting for a match...`
      );
      setRides([...rides, newRide]);
    }

    // Reset form
    setPickup("");
    setDestination("");
    setSeats(1);
  };

  return (
    <div className="flex flex-col items-center p-8">
      <h2 className="text-2xl font-bold mb-4">Share a Ride (Auto-Match)</h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white border rounded-lg p-6 shadow-lg flex flex-col gap-4"
      >
        <div>
          <label className="block text-gray-700">Pickup Location</label>
          <input
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="border rounded w-full px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Destination</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="border rounded w-full px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Number of Passengers</label>
          <input
            type="number"
            value={seats}
            min={1}
            max={6}
            onChange={(e) => setSeats(parseInt(e.target.value))}
            className="border rounded w-full px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
        >
          Request Ride
        </button>
      </form>

      {message && (
        <p className="mt-6 text-green-600 font-semibold text-center">{message}</p>
      )}

      {rides.length > 0 && (
        <div className="mt-6 w-full max-w-md">
          <h3 className="text-lg font-bold mb-2">Pending Ride Requests:</h3>
          <ul className="list-disc pl-5">
            {rides.map((ride) => (
              <li key={ride.id}>
                {ride.pickup} → {ride.destination} ({ride.seats} passenger
                {ride.seats > 1 && "s"})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShareRide;
