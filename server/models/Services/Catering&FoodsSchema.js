import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  packageName: { type: String, required: true },
  foodType: { type: String, enum: ["veg", "non-veg", "both"], default: "veg" },
  pricePerPerson: { type: Number, required: true },
  description: { type: String },
});

const CateringServiceSchema = new mongoose.Schema(
  {
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
    },

    companyName: { type: String, required: true, trim: true },
    ownerName: { type: String, required: true, trim: true },
    contactNumber: { type: String, required: true },
    location: { type: String, required: true },

    packages: [packageSchema], // ✅ Multiple packages

    images: [
      {
        type: String, // store file path or URL
      },
    ],
    category: {
      type: String,
      required: true,
      default: "catering",
    },
  },
  { timestamps: true }
);

export default mongoose.model("CateringService", CateringServiceSchema);
