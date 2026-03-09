import mongoose from "mongoose";

const auditoriumSchema = new mongoose.Schema(
  {
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider", // or "User" depending on your auth model
      required: true,
    },

    auditoriumName: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
    },

    ownerContact: {
      type: String,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    pricePerHour: {
      type: Number,
      required: true,
    },

    overtimePrice: {
      type: Number,
      required: true,
    },

    acType: {
      type: String,
      enum: ["AC", "Non-AC"],
      required: true,
    },

    description: {
      type: String,
    },

    openingTime: {
      type: String,
      required: true,
    },

    closingTime: {
      type: String,
      required: true,
    },

    cancellationPolicy: {
      type: String,
    },

    images: [
      {
        type: String,
      },
    ],
    category: {
      type: String,
      required: true,
      default: "auditorium",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Auditorium", auditoriumSchema);
