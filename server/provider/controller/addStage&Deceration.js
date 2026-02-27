import DecorationService from "../../models/Services/Stage&Decerations.js";

export const AddDecorationService = async (req, res) => {
  try {
    const { id, role } = req.provider; // set by auth middleware

    // 🔐 Only provider can add
    if (role !== "provider") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only providers can add decoration services",
      });
    }

    const {
      companyName,
      address,
      location,
      phone,
      description,
      packages, // JSON string
    } = req.body;

   
    

    /* ---------- Basic Validation ---------- */
    if (!companyName || !address || !location || !phone) {
      return res.status(400).json({
        success: false,
        message: "companyName, address, location and phone are required",
      });
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be 10–15 digits",
      });
    }

    /* ---------- Prevent Duplicate Service (Recommended) ---------- */
    // const existingService = await DecorationService.findOne({
    //   providerId: id,
    // });

    // if (existingService) {
    //   return res.status(409).json({
    //     success: false,
    //     message: "You already added a decoration service",
    //   });
    // }

    /* ---------- Parse Packages ---------- */
    let parsedDecorations = [];

    if (packages) {
      try {
        parsedDecorations = JSON.parse(packages);
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "Invalid packages JSON format",
        });
      }
    }

    if (!parsedDecorations.length) {
      return res.status(400).json({
        success: false,
        message: "At least one decoration package is required",
      });
    }

    /* ---------- Validate Each Package ---------- */
    for (const pkg of parsedDecorations) {
      if (!pkg.title || !pkg.pricePerDay) {
        return res.status(400).json({
          success: false,
          message: "Each package must have title and pricePerDay",
        });
      }

      if (pkg.pricePerDay < 0) {
        return res.status(400).json({
          success: false,
          message: "pricePerDay must be a positive number",
        });
      }
    }

    /* ---------- Images ---------- */
    if (!req.files || !req.files.length) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    // 👉 Store clean public paths
     const imagePaths = req.files?.map((file) => file.path) || [];

    /* ---------- Create Service ---------- */
    const service = await DecorationService.create({
      providerId: id,
      companyName,
      address,
      location,
      phone,
      description,
      decorations: parsedDecorations,
      images: imagePaths,
    });

    return res.status(201).json({
      success: true,
      message: "Decoration service added successfully",
      data: service,
    });
  } catch (error) {
    console.error("AddDecorationService error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while adding decoration service",
      error: error.message,
    });
  }
};

export const fetchDecorationServices = async (req, res) => {
  try {
    const services = await DecorationService.find();

    

    return res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    console.error("fetchDecorationServices error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching decoration services",
    });
  }
};

export const fetchDecorationServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id,"audi");
    

    // Fetch decoration service by ID
    const service = await DecorationService.findById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Decoration service not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error("fetchDecorationServiceById error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching decoration service",
    });
  }
};
/**
 * Edit a decoration service (provider-only, no ID check)
 */
export const editDecorationService = async (req, res) => {
  try {
    const { role } = req.user;

    // Only providers
    if (role !== "provider") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only providers can edit decoration services",
      });
    }

    const { id } = req.params;

    const service = await DecorationService.findById(id);
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }

    const { companyName, address, location, phone, description, packages } =
      req.body;

    // Update only provided fields
    service.companyName = companyName ?? service.companyName;
    service.address = address ?? service.address;
    service.location = location ?? service.location;
    service.phone = phone ?? service.phone;
    service.description = description ?? service.description;

    // Parse and update decorations if provided
    if (packages) {
      let parsedDecorations = [];
      try {
        parsedDecorations = Array.isArray(packages)
          ? packages
          : JSON.parse(packages);

        // Attach images if uploaded
        if (req.files && req.files.length > 0) {
          parsedDecorations = parsedDecorations.map((pkg, index) => ({
            ...pkg,
            image: req.files[index]?.path || null,
          }));
        }

        service.decorations = parsedDecorations;
      } catch {
        return res
          .status(400)
          .json({ success: false, message: "Invalid packages format" });
      }
    }

    await service.save();

    return res.status(200).json({
      success: true,
      message: "Decoration service updated successfully",
      data: service,
    });
  } catch (error) {
    console.error("editDecorationService error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while editing decoration service",
      error: error.message,
    });
  }
};

/**
 * Delete a decoration service (provider-only)
 */
export const deleteDecorationService = async (req, res) => {
  try {
    const { role } = req.user;

    // Only providers
    if (role !== "provider") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only providers can delete decoration services",
      });
    }

    const { id } = req.params;

    const service = await DecorationService.findById(id);
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }

    await DecorationService.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Decoration service deleted successfully",
    });
  } catch (error) {
    console.error("deleteDecorationService error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting decoration service",
      error: error.message,
    });
  }
};
