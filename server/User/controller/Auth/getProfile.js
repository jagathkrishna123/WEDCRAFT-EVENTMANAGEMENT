import User from "../../../models/user/userSchema.js";
import Provider from "../../../models/provider/providerSchema.js";
import Admin from "../../../models/Admin/adminSchema.js";

export async function getProfile(req, res) {
    try {
        const { id, role } = req.user; // Set by verifyToken middleware

        let account;

        if (role === "admin") {
            account = await Admin.findById(id).select("-password");
        } else if (role === "provider") {
            account = await Provider.findById(id).select("-password");
        } else {
            account = await User.findById(id).select("-password");
        }

        if (!account) {
            return res.status(404).json({
                success: false,
                message: "Account not found",
            });
        }

        res.status(200).json({
            success: true,
            user: {
                id: account._id,
                name: account.name,
                email: account.email,
                role: account.role,
            },
        });
    } catch (error) {
        console.error("getProfile error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
}
