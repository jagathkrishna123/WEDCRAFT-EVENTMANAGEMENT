import express from "express";
import {
  AddAuditorium,
  editAuditorium,
  fetchAuditorium,
  DeleteAuditorium,
  fetchAuditoriumById,
} from "../controller/addAuditorium.js";
import { protectProvider } from "../../middleware/ProtectProvider.js";
import { sendToAdmin, getProviderNotifications } from "../controller/notificationController.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import {
  AddCateringService,
  fetchCatering,
  editCatering,
  DeleteCatering,
  fetchCateringById,
} from "../controller/addCatering.js";
import {
  AddDecorationService,
  fetchDecorationServices,
  deleteDecorationService,
  editDecorationService,
  fetchDecorationServiceById,
} from "../controller/addStage&Deceration.js";
import upload from "../../middleware/multer.js";
import {
  AddPhotographyService,
  fetchPhotographyServices,
  editPhotographyService,
  deletePhotographyService,
  fetchPhotographyById,
} from "../controller/addPhotography.js";
import { getProviderServices } from "../controller/getProviderServices.js";
import { getProviderBookings } from "../controller/getProviderBookings.js";
import { getDashboardStats } from "../controller/getDashboardStats.js";

const router = express.Router();

//Auditoruim
router.post(
  "/addAuditorium",
  protectProvider,
  upload.array("images", 10), // <--- MUST use .array("images") for multiple files
  AddAuditorium,
);

router.get("/fecthAuditorium", fetchAuditorium);
router.get("/fetchAuditoriumById/:id", fetchAuditoriumById);

router.put(
  "/editAuditorium/:id",
  protectProvider,
  upload.array("images", 10),
  editAuditorium,
);

router.delete("/delete-auditorium/:id", protectProvider, DeleteAuditorium);

//Catering

router.post(
  "/addCatering",
  protectProvider,
  upload.array("images", 10), // <--- MUST use .array("images") for multiple files
  AddCateringService,
);
router.get("/fetchCatering", fetchCatering);
router.get("/fetchCateringById/:id", fetchCateringById);

router.put(
  "/editCatering/:id",
  protectProvider,
  upload.array("images", 10),
  editCatering,
);
router.delete("/delete-catering/:id", protectProvider, DeleteCatering);

//Decoration And Stages

router.post(
  "/addstage-decoration",
  protectProvider,
  upload.array("images", 10), // <--- MUST use .array("images") for multiple files
  AddDecorationService,
);

router.get("/fetchDeceration", fetchDecorationServices);
router.get("/fetchDecerationById/:id", fetchDecorationServiceById);

router.put(
  "/editDeceration/:id",
  protectProvider,
  upload.array("images", 10),
  editDecorationService,
);

router.delete(
  "/delete-deceration/:id",
  protectProvider,
  deleteDecorationService,
);

//Photography

router.post(
  "/addPhotography",
  protectProvider,
  upload.array("images", 10), // <--- MUST use .array("images") for multiple files
  AddPhotographyService,
);

router.get("/fetchPhotography", fetchPhotographyServices);
router.get("/fetchPhotographyById/:id", fetchPhotographyById);

router.put(
  "/editPhotography/:id",
  protectProvider,
  upload.array("images", 10),
  editPhotographyService,
);

router.delete(
  "/delete-photography/:id",
  protectProvider,
  deletePhotographyService,
);

// Unified Provider Services
router.get("/provider-services", protectProvider, getProviderServices);
router.get("/provider-bookings", protectProvider, getProviderBookings);
router.get("/dashboard-stats", protectProvider, getDashboardStats);

// Notification routes for provider
router.post("/message/send", protectProvider, sendToAdmin);
router.get("/messages", protectProvider, getProviderNotifications);

export default router;
