import User from "../../models/user/userSchema.js";

export const ViewUser = async (req, res) => {
  try {
    console.log("hell User");

    const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching users",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
     
    const { id } = req.params;
 
    

    // 🔎 Validate ID format
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await User.findByIdAndDelete(id);

    // ❌ If user not found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Success response
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error deleting user:", error);

    res.status(500).json({
      success: false,
      message: "Server error while deleting user",
      error: error.message,
    });
  }
};
