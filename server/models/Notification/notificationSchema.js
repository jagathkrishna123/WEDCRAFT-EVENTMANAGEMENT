import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'senderModel'
        },
        senderModel: {
            type: String,
            required: true,
            enum: ['Admin', 'Provider']
        },
        senderName: {
            type: String,
            required: true,
        },
        receiverId: {
            type: String, // Can be an ObjectId or 'all' for broadcasts to all providers
            required: true,
        },
        message: {
            type: String,
            required: true,
            trim: true
        },
        isRead: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Notification", notificationSchema);
