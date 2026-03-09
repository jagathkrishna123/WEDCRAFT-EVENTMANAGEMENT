import AuditoriumSchema from "../../models/Services/AuditoriumSchema.js";
import CateringService from "../../models/Services/Catering&FoodsSchema.js";
import PhotographySchema from "../../models/Services/PhotographySchema.js";
import DecorationService from "../../models/Services/Stage&Decerations.js";

export const getProviderServices = async (req, res) => {
    try {
        const { id } = req.provider;

        // Fetch all types of services in parallel
        const [auditoriums, caterings, photographies, decorations] = await Promise.all([
            AuditoriumSchema.find({ providerId: id }),
            CateringService.find({ providerId: id }),
            PhotographySchema.find({ providerId: id }),
            DecorationService.find({ providerId: id }),
        ]);

        // Format and combine
        const allServices = [
            ...auditoriums.map(s => ({ ...s._doc, serviceType: "auditorium" })),
            ...caterings.map(s => ({ ...s._doc, serviceType: "catering" })),
            ...photographies.map(s => ({ ...s._doc, serviceType: "photography" })),
            ...decorations.map(s => ({ ...s._doc, serviceType: "stage-decoration" })),
        ];

        // Sort by creation date (newest first)
        allServices.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.status(200).json({
            success: true,
            count: allServices.length,
            data: allServices,
        });
    } catch (error) {
        console.error("getProviderServices error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching provider services",
            error: error.message,
        });
    }
};
