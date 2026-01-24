import jwt from "jsonwebtoken";
import Provider from "../models/provider/providerSchema.js";

export const protectProvider = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const provider = await Provider.findById(decoded.id).select("-password");

    if (!provider || provider.role !== "provider") {
      
        
      return res.status(403).json({
        success: false,
        message: "Access denied. Provider only.",
      });
    }

    // attach provider to request
    req.provider = provider;
    next();
  } catch (error) {
    console.error("Provider auth error:", error);

    res.status(401).json({
      success: false,
      message: "Not authorized",
    });
  }
};
