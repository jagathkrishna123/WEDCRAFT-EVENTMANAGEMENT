import express from "express";
import { createBooking, getAllBookings, checkAvailability, updateBookingStatus } from "../controller/Booking/booking.js";
import { verifyToken } from "../../middleware/verifyToken.js";


const router = express.Router();
router.post("/createBooking", verifyToken, createBooking);
router.get("/getAllBookings", verifyToken, getAllBookings);
router.put("/cancel/:id", verifyToken, updateBookingStatus);
router.get("/checkAvailability/:serviceId/:eventDate", checkAvailability);

export default router