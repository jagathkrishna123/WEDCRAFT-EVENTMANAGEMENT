import mongoose from "mongoose";

/* ---------- Decoration Package Schema ---------- */
const decorationPackageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    category: {
      type: String,
      enum: ["Affordable", "Premium", "Luxury"],
      default: "Affordable",
    },
    pricePerDay: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

/* ---------- Main Decoration Service Schema ---------- */
const DecorationServiceSchema = new mongoose.Schema(
  {
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
      index: true,
    },

    companyName: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    phone: {
      type: String,
      required: true,
      match: [/^[0-9]{10,15}$/, "Phone must be 10–15 digits"],
    },
    description: { type: String, trim: true },

    images: [
      {
        type: String, 
        required: true,
      },
    ],

    decorations: {
      type: [decorationPackageSchema],
      validate: [(v) => v.length > 0, "At least one package is required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("DecorationService", DecorationServiceSchema);
