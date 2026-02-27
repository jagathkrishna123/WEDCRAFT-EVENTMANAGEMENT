import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    // Link to the customer (User who booked)
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // ✅ NEW: Link to the provider (service owner)
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Change to "Provider" if you have separate model
      required: true,
      index: true,
    },

    // Snapshot of user info at booking time
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },

    // Event details
    eventDate: { type: Date, required: true },
    eventTime: { type: String, required: true },
    guests: { type: Number, default: 50 },
    hours: { type: Number, default: 4 },
    specialRequests: { type: String },

    // Service info
    category: {
      type: String,
      enum: ["auditorium", "catering", "photography", "stage-decoration"],
      required: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "categoryModel",
      required: true,
    },
    categoryModel: {
      type: String,
      required: true,
      enum: ["Auditorium", "Catering", "Photography", "Decoration"],
    },

    // Selected package snapshot
    selectedPackage: {
      _id: { type: String, },
      packageName: { type: String,},
      description: { type: String },
      pricePerPerson: { type: Number },
      pricePerHour: { type: Number },
      pricePerDay: { type: Number },
      foodType: { type: String },
    },

    // Auditorium pricing type
    auditoriumPricing: {
      type: String,
      enum: ["daily", "hourly"],
    },

    // Calculated total price
    totalPrice: { type: Number, required: true },

    // Booking status
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Booking", bookingSchema);
