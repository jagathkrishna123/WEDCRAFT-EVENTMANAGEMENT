import express from "express";
import { createBooking, getAllBookings } from "../controller/Booking/booking.js";
import { verifyToken } from "../../middleware/verifyToken.js";


const router = express.Router();
router.post("/createBooking", verifyToken, createBooking);
router.get("/getAllBookings", verifyToken, getAllBookings);

export default router