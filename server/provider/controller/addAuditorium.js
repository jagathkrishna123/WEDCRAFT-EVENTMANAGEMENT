import AuditoriumSchema from "../../models/Services/AuditoriumSchema.js";

export async function AddAuditorium(req, res) {
  try {
    // 🔹 Get role and provider ID from authenticated user

    const { role, id } = req.provider

    // 🔐 Role check
    if (role !== "provider") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only providers can add auditoriums.",
      });
    }

    // 🔹 Destructure fields from request body

    const {
      auditoriumName,
      location,
      ownerContact,
      capacity,
      pricePerDay,
      pricePerHour,
      overtimePrice,
      acType,
      description,
      openingTime,
      closingTime,
      cancellationPolicy,
      category,
    } = req.body;

    // 🔹 Check if images were uploaded
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required." });
    }

    // 🔹 Map uploaded files to paths
    const imagePaths = req.files.map((file) => file.path);

    // 🔹 Create new auditorium document
    const auditorium = await AuditoriumSchema.create({
      providerId: id,
      auditoriumName,
      location,
      ownerContact,
      capacity,
      price: pricePerDay,
      pricePerHour,
      overtimePrice,
      acType,
      description,
      openingTime,
      closingTime,
      cancellationPolicy,
      images: imagePaths,
      category,
    });

    return res.status(201).json({
      success: true,
      message: "Auditorium added successfully",
      data: auditorium,
    });
  } catch (error) {
    console.error("AddAuditorium error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}
export async function fetchAuditorium(req, res) {
  try {
    // Fetch all auditoriums from DB
    const auditoriums = await AuditoriumSchema.find();

    // Send response
    res.status(200).json({
      success: true,
      count: auditoriums.length,
      data: auditoriums,
    });
  } catch (error) {
    console.error("Failed to fetch auditoriums:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching auditoriums",
    });
  }
}


export async function fetchAuditoriumById(req, res) {
  try {
    const { id } = req.params;
    console.log(id, "paramss");
    console.log("krhwefdd");



    // Fetch auditorium by ID
    const auditorium = await AuditoriumSchema.findById(id);



    if (!auditorium) {
      return res.status(404).json({
        success: false,
        message: "Auditorium not found",
      });
    }

    // Send response
    res.status(200).json({
      success: true,
      data: auditorium,
    });
  } catch (error) {
    console.error("Failed to fetch auditorium:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching auditorium",
    });
  }
}


export async function editAuditorium(req, res) {
  console.log("edit");

  const { role } = req.provider; // From protectProvider middleware

  // 🔐 Only provider can add
  if (role !== "provider") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Only providers can add services.",
    });
  }

  try {
    const { id } = req.params;

    // 1️⃣ Find existing auditorium
    const auditorium = await AuditoriumSchema.findById(id);

    if (!auditorium) {
      return res.status(404).json({ message: "Auditorium not found" });
    }

    // 2️⃣ Destructure body
    const {
      auditoriumName,
      location,
      ownerContact,
      capacity,
      pricePerDay,
      pricePerHour,
      overtimePrice,
      acType,
      description,
      openingTime,
      closingTime,
      cancellationPolicy,
    } = req.body;

    // 3️⃣ Update only provided fields
    auditorium.auditoriumName = auditoriumName ?? auditorium.auditoriumName;
    auditorium.location = location ?? auditorium.location;
    auditorium.ownerContact = ownerContact ?? auditorium.ownerContact;
    auditorium.capacity = capacity ?? auditorium.capacity;
    auditorium.pricePerDay = pricePerDay ?? auditorium.pricePerDay;
    auditorium.pricePerHour = pricePerHour ?? auditorium.pricePerHour;
    auditorium.overtimePrice = overtimePrice ?? auditorium.overtimePrice;
    auditorium.acType = acType ?? auditorium.acType;
    auditorium.description = description ?? auditorium.description;
    auditorium.openingTime = openingTime ?? auditorium.openingTime;
    auditorium.closingTime = closingTime ?? auditorium.closingTime;
    auditorium.cancellationPolicy =
      cancellationPolicy ?? auditorium.cancellationPolicy;

    // 4️⃣ If new images uploaded → update images
    if (req.files && req.files.length > 0) {
      const imagePaths = req.files.map((file) => file.path);
      auditorium.images = imagePaths;
    }

    // 5️⃣ Save updated data
    await auditorium.save();

    return res.status(200).json({
      message: "Auditorium updated successfully",
      data: auditorium,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}


export async function DeleteAuditorium(req, res) {
  const { role } = req.provider; // From protectProvider middleware

  // 🔐 Only provider can add
  if (role !== "provider") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Only providers can add services.",
    });
  }
  try {
    const { id } = req.params;

    // 1️⃣ Check if the auditorium exists
    const auditorium = await AuditoriumSchema.findById(id);
    if (!auditorium) {
      return res.status(404).json({
        success: false,
        message: "Auditorium not found",
      });
    }

    // 2️⃣ Delete the auditorium
    await AuditoriumSchema.findByIdAndDelete(id);

    // 3️⃣ Respond
    res.status(200).json({
      success: true,
      message: "Auditorium deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting auditorium:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting auditorium",
    });
  }
}
