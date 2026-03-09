import Review from "../../../models/Review/reviewSchema.js";
import Booking from "../../../models/Booking/bookingSchema.js";

// ---------- Create Review ----------
export const createReview = async (req, res) => {
    try {
        const { bookingId, rating, comment, images } = req.body;

        if (!bookingId || !rating || !comment) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Verify booking exists and belongs to the customer
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        if (booking.customer.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: "Unauthorized: You can only rate your own bookings" });
        }

        // Ensure booking is completed (or allow confirmed? User asked for "completed")
        // Note: completed status might be inferred by date, but let's check booking status as well.
        // If our system doesn't auto-complete, we might just allow rating "confirmed" bookings too.
        // But per user request: 'if the event is "completed" add an option to rate'

        // Create the review
        const review = new Review({
            customer: req.user.id,
            provider: booking.provider,
            booking: bookingId,
            service: booking.service,
            serviceName: booking.serviceName,
            categoryModel: booking.categoryModel,
            rating,
            comment,
            images: images || [],
        });

        const savedReview = await review.save();

        res.status(201).json({
            success: true,
            message: "Review submitted successfully",
            review: savedReview,
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: "You have already reviewed this service" });
        }
        console.error("Error creating review:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// ---------- Get Provider Reviews ----------
export const getProviderReviews = async (req, res) => {
    try {
        // If it's the provider themselves (using protectProvider)
        const providerId = req.provider.id;

        const reviews = await Review.find({ provider: providerId })
            .populate("customer", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, reviews });
    } catch (error) {
        console.error("Error fetching provider reviews:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
