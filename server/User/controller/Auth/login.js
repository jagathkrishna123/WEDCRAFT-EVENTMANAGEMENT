import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../../models/user/userSchema.js";
import Provider from "../../../models/provider/providerSchema.js";
import Admin from "../../../models/Admin/adminSchema.js";

export async function Login(req, res) {
  try {


    const { email, password } = req.body;

    console.log(email, "ema", password);


    /* ---------- Validation ---------- */
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    /* ---------- Check User ---------- */
    let account =
      (await User.findOne({ email }).select("+password")) ||
      (await Provider.findOne({ email }).select("+password")) ||
      (await Admin.findOne({ email }).select("+password"));
    console.log(account, "acc");


    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    /* ---------- Compare Password ---------- */
    const isPasswordMatch = await bcrypt.compare(password, account.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    /* ---------- Check Provider Status ---------- */
    if (account.role === "provider" && account.status !== "Approved") {
      return res.status(403).json({
        message: `Your account is currently ${account.status}. Please wait for admin approval before logging in.`,
      });
    }

    /* ---------- Generate JWT ---------- */
    const token = jwt.sign(
      {
        id: account._id,
        role: account.role,
        email: account.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
      }
    );

    /* ---------- Success ---------- */
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: account._id,
        name: account.name,
        email: account.email,
        role: account.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}
