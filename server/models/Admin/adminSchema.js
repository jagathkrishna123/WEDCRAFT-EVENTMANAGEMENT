import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
      index: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [2, "Password must be at least 2 characters"],
      select: false, // 🔐 hide password by default
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^[0-9]{10,15}$/, "Phone number must be 10–15 digits"],
      trim: true,
    },

    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
