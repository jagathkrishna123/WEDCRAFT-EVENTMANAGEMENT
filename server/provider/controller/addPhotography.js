import photographyPackageSchema from "../../models/Services/PhotographySchema.js";

export async function AddPhotographyService(req, res) {
  try {
    const { role, id } =  req.provider

    // 🔐 Provider-only access
    if (role !== "provider") {
      return res.status(403).json({
        success: false,
        message: "Only providers can add photography services",
      });
    }

    const {
      studioName,
      photographerName,
      phone,
      email,
      location,
      description,
      serviceTypes,
      packages,
    } = req.body;

    // ❗ Required field check
    if (!studioName || !photographerName || !phone || !email || !location) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // 📦 Parse packages
    let parsedPackages;
    try {
      parsedPackages = JSON.parse(packages);
      if (!Array.isArray(parsedPackages) || parsedPackages.length === 0) {
        throw new Error();
      }
    } catch {
      return res.status(400).json({
        success: false,
        message: "Packages must be a non-empty array",
      });
    }

    // 🧾 Parse service types
    let parsedServiceTypes = [];
    if (serviceTypes) {
      try {
        parsedServiceTypes = Array.isArray(serviceTypes)
          ? serviceTypes
          : JSON.parse(serviceTypes);
      } catch {
        return res.status(400).json({
          success: false,
          message: "Invalid serviceTypes format",
        });
      }
    }

    // 🖼 Images
    const imagePaths = req.files?.map((file) => file.path) || [];

    // ✅ Create document
    const service = await photographyPackageSchema.create({
      providerId: id,
      studioName,
      photographerName,
      phone,
      email,
      location,
      description,
      serviceTypes: parsedServiceTypes,
      packages: parsedPackages,
      images: imagePaths,
    });

    return res.status(201).json({
      success: true,
      message: "Photography service added successfully",
      data: service,
    });
  } catch (error) {
    console.error("AddPhotographyService error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}

export async function fetchPhotographyServices(req, res) {
  try {
    const services = await photographyPackageSchema.find();
  
    

    return res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    console.error("fetchPhotographyServices error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching photography services",
    });
  }
}
export async function fetchPhotographyById(req, res) {
  try {
    const { id } = req.params;

    // Fetch the photography service by ID
    const service = await photographyPackageSchema.findById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Photography service not found",
      });
    }

    // Send response
    return res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error("fetchPhotographyById error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching photography service",
    });
  }
}

export async function editPhotographyService(req, res) {
  try {
    const { id } = req.params;
    const { role } = req.user;

    // Only providers can edit
    if (role !== "provider") {
      return res.status(403).json({
        success: false,
        message: "Only providers can edit photography services",
      });
    }

    const service = await photographyPackageSchema.findById(id);
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }

    // Destructure fields
    const {
      studioName,
      photographerName,
      phone,
      email,
      location,
      description,
      serviceTypes,
      packages,
    } = req.body;

    // Update only provided fields (nullish coalescing)
    service.studioName = studioName ?? service.studioName;
    service.photographerName = photographerName ?? service.photographerName;
    service.phone = phone ?? service.phone;
    service.email = email ?? service.email;
    service.location = location ?? service.location;
    service.description = description ?? service.description;

    // Parse and update packages if provided
    if (packages) {
      let parsedPackages = [];
      try {
        parsedPackages = Array.isArray(packages)
          ? packages
          : JSON.parse(packages);
        service.packages = parsedPackages;
      } catch {
        return res
          .status(400)
          .json({ success: false, message: "Invalid packages format" });
      }
    }

    // Parse and update serviceTypes if provided
    if (serviceTypes) {
      let parsedServiceTypes = [];
      try {
        parsedServiceTypes = Array.isArray(serviceTypes)
          ? serviceTypes
          : JSON.parse(serviceTypes);
        service.serviceTypes = parsedServiceTypes;
      } catch {
        return res
          .status(400)
          .json({ success: false, message: "Invalid serviceTypes format" });
      }
    }

    // Update images if new files uploaded
    if (req.files && req.files.length > 0) {
      service.images = req.files.map((file) => file.path);
    }

    await service.save();

    return res.status(200).json({
      success: true,
      message: "Photography service updated successfully",
      data: service,
    });
  } catch (error) {
    console.error("editPhotographyService error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating photography service",
      error: error.message,
    });
  }
}

/**
 * Delete a photography service
 */
export async function deletePhotographyService(req, res) {
  try {
    const { id } = req.params;
    const { role } = req.user;

    if (role !== "provider") {
      return res.status(403).json({
        success: false,
        message: "Only providers can delete photography services",
      });
    }

    const service = await photographyPackageSchema.findById(id);
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }

    // Ensure provider owns this service

    // Delete service from DB
    await photographyPackageSchema.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Photography service deleted successfully",
    });
  } catch (error) {
    console.error("deletePhotographyService error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting photography service",
      error: error.message,
    });
  }
}
