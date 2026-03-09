import mongoose from "mongoose";

/* ---------- PACKAGE SCHEMA ---------- */
const photographyPackageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    pricePerHour: {
      type: Number,
      required: true,
    },

    duration: {
      type: String,
      default: "Per Hour",
    },
  },
  { _id: false }
);

/* ---------- MAIN SCHEMA ---------- */
const PhotographyServiceSchema = new mongoose.Schema(
  {
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
      index: true,
    },

    studioName: {
      type: String,
      required: true,
      trim: true,
    },

    photographerName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    serviceTypes: {
      type: [String],
      default: [],
    },

    packages: {
      type: [photographyPackageSchema],
      required: true,
      validate: [(val) => val.length > 0, "At least one package is required"],
    },

    images: [
      {
        type: String,
      },
    ],
    category: {
      type: String,
      required: true,
      default: "photography",
    },
  },
  { timestamps: true }
);

export default mongoose.model("PhotographyService", PhotographyServiceSchema);
