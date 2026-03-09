import Booking from "../../models/Booking/bookingSchema.js";

export const getProviderBookings = async (req, res) => {
    try {
        const providerId = req.provider._id;

        const bookings = await Booking.find({ provider: providerId })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings,
        });
    } catch (error) {
        console.error("getProviderBookings error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching provider bookings",
            error: error.message,
        });
    }
};
