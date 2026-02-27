import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    // Link to the booking
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },

    // Link to the user making the payment
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Payment method
    paymentMethod: {
      type: String,
      enum: ["card", "upi"],
      required: true,
    },

    // Card details (if card payment)
    cardDetails: {
      number: { type: String },
      expiry: { type: String },
      cvv: { type: String },
      name: { type: String },
    },

    // UPI details (if UPI payment)
    upiId: { type: String },

    // Amount
    amount: { type: Number, required: true },

    // Payment status
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);    