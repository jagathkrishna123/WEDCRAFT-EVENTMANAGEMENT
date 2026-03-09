import express from "express";

const router = express.Router();

import { ViewProviders } from "../controller/viewProviders.js";
import { UpdateProviderStatus } from "../controller/viewProviders.js"
import { deleteProviders } from "../controller/viewProviders.js"
import { getDashboardData } from "../controller/getDashboardData.js";
import { ViewUser } from "../controller/viewUsers.js";
import { deleteUser } from "../controller/viewUsers.js";
import { protectAdmin } from "../../middleware/ProtectedAdmin.js";

//Providers
router.get("/viewProvidres", protectAdmin, ViewProviders)
router.put("/updateProviderStatus/:id", protectAdmin, UpdateProviderStatus)
router.delete("/deleteProvider/:id", protectAdmin, deleteProviders)

// Users    
router.get("/viewUser", protectAdmin, ViewUser)
router.delete("/deleteUser/:id", protectAdmin, deleteUser)


// Dashboard
router.get("/dashboardData", protectAdmin, getDashboardData)

// Notifications
import { sendNotification, getAdminNotifications } from "../controller/notificationController.js";
router.post("/send-notification", protectAdmin, sendNotification);
router.get("/notifications", protectAdmin, getAdminNotifications);

export default router