import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Booking from './models/Booking/bookingSchema.js';

dotenv.config();

const checkBookings = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const bookings = await Booking.find().limit(5);
        console.log('Total bookings count:', await Booking.countDocuments());
        console.log('Sample bookings:', JSON.stringify(bookings, null, 2));

        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

checkBookings();
