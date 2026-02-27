import express from "express";
import { createBooking } from "../controller/Booking/booking.js";
import {verifyToken} from "../../middleware/verifyToken.js";


const router = express.Router();
router.post("/createBooking",verifyToken, createBooking);

export default router