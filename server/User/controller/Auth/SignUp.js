import bcrypt from "bcrypt";
import User from "../../../models/user/userSchema.js";
import Provider from "../../../models/provider/providerSchema.js";

export async function signup(req, res) {
  try {
    const { name, email, password, role, phone } = req.body;
    console.log(role,"role");
    
    /* ---------- Validation ---------- */
    if (!name || !email || !password || !role || !phone) {
      return res.status(400).json({
        message: "Name, email, password, role, and phone are required",
      });
    }

    if (name.length < 3) {
      return res.status(400).json({
        message: "Name must be at least 3 characters long",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    if (!["user", "provider"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    // ✅ Phone validation
    // Accepts only digits, 10-15 characters
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        message: "Invalid phone number. Must be 10-15 digits",
      });
    }

    /* ---------- Hash Password ---------- */
    const hashedPassword = await bcrypt.hash(password, 10);

    /* ---------- USER SIGNUP ---------- */
    if (role === "user") {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          message: "Email already registered as user",
        });
      }

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "user",
        phone, // ✅ save phone
      });

      return res.status(201).json({
        message: "User signup successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
        },
      });
    }

    /* ---------- PROVIDER SIGNUP ---------- */
    if (role === "provider") {
      const existingProvider = await Provider.findOne({ email });
      if (existingProvider) {
        return res.status(409).json({
          message: "Email already registered as provider",
        });
      }

      const provider = await Provider.create({
        name,
        email,
        password: hashedPassword,
        role: "provider",
        phone, // ✅ save phone
      });

      return res.status(201).json({
        message: "Provider signup successful",
        provider: {
          id: provider._id,
          name: provider.name,
          email: provider.email,
          role: provider.role,
          phone: provider.phone,
        },
      });
    }
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      message: "Signup failed",
      error: error.message,
    });
  }
}

