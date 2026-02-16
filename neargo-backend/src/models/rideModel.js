import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  riderName: { type: String },
  share: { type: Number, default: 0 },
  paymentStatus: { type: String, default: "pending" },
});

const rideSchema = new mongoose.Schema(
  {
    start: { type: String, required: true },
    destination: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    mode: { type: String },
    riderName: { type: String },
    share: { type: Number, default: 0 },
    participants: [participantSchema],

    // 🆕 ride management fields
    status: { type: String, default: "pending" }, // pending, accepted, completed
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    driverName: { type: String },
  },
  { timestamps: true }
);

const Ride = mongoose.model("Ride", rideSchema);
export default Ride;
