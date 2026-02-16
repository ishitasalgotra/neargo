import Ride from "../models/rideModel.js";

// 🚗 Rider: create a new ride
export const createRide = async (req, res) => {
  try {
    const { start, destination, date, time, mode, riderName, share } = req.body;

    console.log("Incoming Ride Request:", req.body);

    if (!start || !destination || !date || !time || !mode || !riderName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const ride = await Ride.create({
      start,
      destination,
      date,
      time,
      mode,
      riderName,
      share: share || 0,
      participants: [{ riderName, share: share || 0 }],
    });

    res.status(201).json({
      message: "Ride created successfully",
      ride,
    });
  } catch (error) {
    console.error("Error creating ride:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 👤 Get rides for the logged-in user
export const getRidesForUser = async (req, res) => {
  try {
    const uid = req.user.id;
    const rides = await Ride.find({
      $or: [{ riderId: uid }, { "participants.userId": uid }, { driverId: uid }],
    });
    res.json(rides);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// 💸 Split fare participants
export const addSplitParticipants = async (req, res) => {
  try {
    const { id } = req.params;
    const { participants } = req.body;
    const ride = await Ride.findById(id);
    if (!ride) return res.status(404).json({ message: "Ride not found" });

    if (req.user.id !== ride.riderId && req.user.id !== ride.driverId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const existing = ride.participants.map((p) => p.userId);
    const newUsers = participants
      .map((p) => p.userId)
      .filter((u) => !existing.includes(u));
    const totalPeople = ride.participants.length + newUsers.length;
    const share = +(ride.fare / totalPeople).toFixed(2);

    ride.participants = ride.participants.map((p) => ({
      ...p.toObject(),
      share,
    }));
    newUsers.forEach((u) =>
      ride.participants.push({ userId: u, share, paymentStatus: "pending" })
    );
    ride.numPeople = totalPeople;
    ride.splitFareEnabled = true;
    await ride.save();

    res.json(ride);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// 🚕 Driver: view all pending rides
export const listPendingRides = async (req, res) => {
  try {
    const rides = await Ride.find({ status: "pending" });
    res.json(rides);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// 🚕 Driver: accept a ride
export const acceptRide = async (req, res) => {
  try {
    const { id } = req.params; // ride id
    const driverId = req.user.id;
    const driverName = req.user.name;

    const ride = await Ride.findById(id);
    if (!ride) return res.status(404).json({ message: "Ride not found" });

    if (ride.status !== "pending") {
      return res.status(400).json({ message: "Ride is not available" });
    }

    ride.status = "accepted";
    ride.driverId = driverId;
    ride.driverName = driverName;

    await ride.save();
    res.json({ message: "Ride accepted successfully", ride });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
