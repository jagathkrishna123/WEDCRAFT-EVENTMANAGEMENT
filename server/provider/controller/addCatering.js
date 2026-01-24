import CateringService from "../../models/Services/Catering&FoodsSchema.js";

// Controller to add catering service
export async function AddCateringService(req, res) {
  try {
    const { role, id } =  req.provider // From verifyToken middleware

    // 🔐 Only provider can add
    if (role !== "provider") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only providers can add services.",
      });
    }

    // Destructure basic service info
    const { companyName, ownerName, contactNumber, location, packages } =
      req.body;

    // Validate packages
    if (!packages) {
      return res
        .status(400)
        .json({ message: "At least one package is required." });
    }

    let parsedPackages = [];
    try {
      // If sent as JSON string from frontend
      parsedPackages =
        typeof packages === "string" ? JSON.parse(packages) : packages;
    } catch (err) {
      return res.status(400).json({ message: "Invalid packages format" });
    }

    if (!Array.isArray(parsedPackages) || parsedPackages.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one valid package is required." });
    }

    // Check if images were uploaded
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required." });
    }

    // Map uploaded files to paths
    const imagePaths = req.files.map((file) => file.path);

    // Create new catering service
    const service = await CateringService.create({
      providerId: id,
      companyName,
      ownerName,
      contactNumber,
      location,
      packages: parsedPackages,
      images: imagePaths,
    });

    return res.status(201).json({
      success: true,
      message: "Catering service added successfully",
      data: service,
    });
  } catch (error) {
    console.error("AddCateringService error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}

export async function fetchCatering(req, res) {
  try {
    // 1️⃣ Fetch all catering services
    const caterings = await CateringService.find();

    // 2️⃣ Send response
    res.status(200).json({
      success: true,
      count: caterings.length,
      data: caterings,
    });
  } catch (error) {
    console.error("Error fetching catering services:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching catering services",
    });
  }
}
export async function fetchCateringById(req, res) {
  try {
    const { id } = req.params;

    // Fetch catering service by ID
    const catering = await CateringService.findById(id);

    if (!catering) {
      return res.status(404).json({
        success: false,
        message: "Catering service not found",
      });
    }

    // Send response
    res.status(200).json({
      success: true,
      data: catering,
    });
  } catch (error) {
    console.error("Error fetching catering service:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching catering service",
    });
  }
}


export async function editCatering(req, res) {
  try {
    const { id } = req.params;
    const { role } = req.user; // From verifyToken middleware

    // 🔐 Only provider can add
    if (role !== "provider") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only providers can add services.",
      });
    }

    // 1️⃣ Find the existing catering service
    const catering = await CateringService.findById(id);
    if (!catering) {
      return res
        .status(404)
        .json({ success: false, message: "Catering service not found" });
    }

    // 2️⃣ Destructure request body
    const { companyName, ownerName, contactNumber, location, packages } =
      req.body;

    // 3️⃣ Update only provided fields using nullish coalescing
    catering.companyName = companyName ?? catering.companyName;
    catering.ownerName = ownerName ?? catering.ownerName;
    catering.contactNumber = contactNumber ?? catering.contactNumber;
    catering.location = location ?? catering.location;

    // 4️⃣ Update packages if provided
    if (packages) {
      // Expecting packages as JSON string from frontend
      catering.packages =
        typeof packages === "string" ? JSON.parse(packages) : packages;
    }

    // 5️⃣ Update images if new files are uploaded
    if (req.files && req.files.length > 0) {
      const imagePaths = req.files.map((file) => file.path);
      catering.images = imagePaths; // Replace old images with new ones
    }

    // 6️⃣ Save changes
    await catering.save();

    res.status(200).json({
      success: true,
      message: "Catering service updated successfully",
      data: catering,
    });
  } catch (error) {
    console.error("Error updating catering service:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating catering service",
    });
  }
}

export async function DeleteCatering(req, res) {
  try {
    const { id } = req.params;

    const { role } = req.user; // From verifyToken middleware

    // 🔐 Only provider can add
    if (role !== "provider") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only providers can add services.",
      });
    }

    // Check if the catering service exists
    const catering = await CateringService.findById(id);
    if (!catering) {
      return res.status(404).json({
        success: false,
        message: "Catering service not found",
      });
    }

    // Delete the catering service from DB only
    await CateringService.findByIdAndDelete(id);

    // Respond
    res.status(200).json({
      success: true,
      message: "Catering service deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting catering service:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting catering service",
    });
  }
}
