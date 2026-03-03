import Provider from "../../models/provider/providerSchema.js";
import Booking from "../../models/Booking/bookingSchema.js";
import User from "../../models/user/userSchema.js";

export const getDashboardData = async (req, res) => {
    try {
        const [users, providers, bookings] = await Promise.all([
            User.find().sort({ createdAt: -1 }),
            Provider.find().sort({ createdAt: -1 }),
            Booking.find().sort({ createdAt: -1 }),
        ]);

        res.status(200).json({
            users,
            providers,
            bookings,
        });
    } catch (error) {
        console.error("Dashboard Fetch Error:", error);
        res.status(500).json({
            message: "Failed to fetch dashboard data",
            error: error.message,
        });
    }
};