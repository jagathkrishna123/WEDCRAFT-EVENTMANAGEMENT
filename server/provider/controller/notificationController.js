import Notification from "../../models/Notification/notificationSchema.js";

export const sendToAdmin = async (req, res) => {
    try {
        const { message } = req.body;
        const providerId = req.provider._id;
        const providerName = req.provider.name;

        if (!message) {
            return res.status(400).json({ success: false, message: "Message is required" });
        }

        const newNotification = await Notification.create({
            senderId: providerId,
            senderModel: 'Provider',
            senderName: providerName,
            receiverId: 'admin',
            message,
        });

        res.status(201).json({ success: true, data: newNotification });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getProviderNotifications = async (req, res) => {
    try {
        const providerId = req.provider._id.toString();

        // Provider sees messages sent to them specifically OR broadcasts ('all')
        // AND messages they sent to admin
        const notifications = await Notification.find({
            $or: [
                { receiverId: providerId },
                { receiverId: 'all' },
                { senderId: req.provider._id, senderModel: 'Provider' }
            ]
        }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: notifications });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
