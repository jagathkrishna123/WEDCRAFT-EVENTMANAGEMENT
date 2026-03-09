import Notification from "../../models/Notification/notificationSchema.js";

export const sendNotification = async (req, res) => {
    try {
        const { receiverId, message } = req.body;
        const adminId = req.admin._id;
        const adminName = req.admin.name || "Admin";

        if (!receiverId || !message) {
            return res.status(400).json({ success: false, message: "Receiver and message are required" });
        }

        const newNotification = await Notification.create({
            senderId: adminId,
            senderModel: 'Admin',
            senderName: adminName,
            receiverId,
            message,
        });

        res.status(201).json({ success: true, data: newNotification });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAdminNotifications = async (req, res) => {
    try {
        const adminId = req.admin._id;
        // Admin sees all messages they sent and all messages sent to 'admin'
        const notifications = await Notification.find({
            $or: [
                { senderId: adminId, senderModel: 'Admin' },
                { receiverId: 'admin' }
            ]
        }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: notifications });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
