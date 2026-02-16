import express from "express";
import {
  createRide,
  getRidesForUser,
  acceptRide,
  listPendingRides,
} from "../controllers/rideController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

// 🚗 Rider-only: create a ride
router.post("/", requireAuth, requireRole("rider"), createRide);

// 👤 Any authenticated user: get their rides
router.get("/me", requireAuth, getRidesForUser);

// 🚕 Driver-only: view pending rides
router.get("/pending", requireAuth, requireRole("driver"), listPendingRides);

// 🚕 Driver-only: accept a ride
router.post("/:id/accept", requireAuth, requireRole("driver"), acceptRide);

export default router;
