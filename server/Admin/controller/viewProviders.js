import Provider from "../../models/provider/providerSchema.js";
import auditoriumSchema from "../../models/Services/AuditoriumSchema.js";
import CateringServiceSchema from "../../models/Services/Catering&FoodsSchema.js";
import PhotographyServiceSchema from "../../models/Services/PhotographySchema.js";
import DecorationServiceSchema from "../../models/Services/Stage&Decerations.js";

export const ViewProviders = async (req, res) => {
  try {


    const providers = await Provider.find();

    if (!providers.length) {
      return res.status(404).json({
        success: false,
        message: "No providers found",
      });
    }

    const enrichedProviders = await Promise.all(
      providers.map(async (provider) => {
        const providerId = provider._id;

        const [auditorium, catering, photography, decoration] =
          await Promise.all([
            auditoriumSchema.exists({
              providerId: providerId,
            }),
            CateringServiceSchema.exists({ providerId: providerId }),
            PhotographyServiceSchema.exists({ providerId: providerId }),
            DecorationServiceSchema.exists({ providerId: providerId }),
          ]);

        const services = [];
        if (auditorium) services.push("Auditorium");
        if (catering) services.push("Catering");
        if (photography) services.push("Photography");
        if (decoration) services.push("Decoration");
        console.log(services, "dserv");

        return {
          ...provider.toObject(),
          services, // ✅ return as ARRAY
        };
      })
    );

    res.status(200).json({
      success: true,
      count: enrichedProviders.length,
      data: enrichedProviders,
    });
  } catch (error) {
    console.error("Error fetching providers:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching providers",
      error: error.message,
    });
  }
};

export const UpdateProviderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // "Approved" | "Rejected" | "Pending"
    console.log(status, id, " id,status");

    const provider = await Provider.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `Provider status updated to ${status}`,
      data: provider,
    });
  } catch (error) {
    console.error("Error updating provider status:", error);

    res.status(500).json({
      success: false,
      message: "Server error while updating provider status",
      error: error.message,
    });
  }
};

export const deleteProviders = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id,"id");
    
    console.log("delete");
    

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid provider ID",
      });
    }

    // Find provider
    const provider = await Provider.findById(id);
    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }

    // Delete provider
    await Provider.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Provider deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting provider:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting provider",
      error: error.message,
    });
  }
};