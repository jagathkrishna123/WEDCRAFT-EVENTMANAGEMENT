import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        provider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Provider",
            required: true,
        },
        booking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
            required: true,
            unique: true, // Only one review per booking
        },
        service: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: "categoryModel",
        },
        serviceName: {
            type: String,
            required: true,
        },
        categoryModel: {
            type: String,
            required: true,
            enum: ["Auditorium", "Catering", "Photography", "Decoration"],
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            required: true,
            trim: true,
        },
        images: [
            {
                type: String,
            },
        ],
    },
    { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
