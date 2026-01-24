import bcrypt from "bcrypt";
import Admin from "../../../models/Admin/adminSchema.js";

export const adminSignup = async (req, res) => {
  try {
    /* ---------- Defaults ---------- */
    const name = "SuperAdmin"; // 👈 default name
    const email = "admin@gmail.com";
    const role = "admin"; // 👈 default role
    const phone = "9562919403"; // 👈 default role
   const password = "123"

    /* ---------- Validation ---------- */
    if (!email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and phone are required",
      });
    }

    if (name.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Name must be at least 3 characters long",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number. Must be 10–15 digits",
      });
    }

    if (password.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    /* ---------- Force Admin Role (Security) ---------- */
    if (role !== "admin") {
      role = "admin"; // 🔐 never trust client role
    }

    /* ---------- Check Existing Admin ---------- */
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: "Email already registered as admin",
      });
    }

    /* ---------- Hash Password ---------- */
    const hashedPassword = await bcrypt.hash(password, 10);

    /* ---------- Create Admin ---------- */
    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role, // always "admin"
      //   status, // default "active"
    });

    /* ---------- Response ---------- */
    res.status(201).json({
      success: true,
      message: "Admin signup successful",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        role: admin.role,
        status: admin.status,
      },
    });
  } catch (error) {
    console.error("Admin signup error:", error);

    res.status(500).json({
      success: false,
      message: "Admin signup failed",
      error: error.message,
    });
  }
};
