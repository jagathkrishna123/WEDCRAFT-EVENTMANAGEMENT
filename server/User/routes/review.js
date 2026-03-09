import express from "express";
import { createReview, getProviderReviews } from "../controller/Review/reviewController.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import { protectProvider } from "../../middleware/ProtectProvider.js";

const router = express.Router();

// User routes
router.post("/reviews", verifyToken, createReview);

// Provider routes
router.get("/reviews/provider", protectProvider, getProviderReviews);

export default router;
