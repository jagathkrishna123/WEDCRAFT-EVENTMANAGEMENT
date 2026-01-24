import express from "express";
import {
  AddAuditorium,
  editAuditorium,
  fetchAuditorium,
  DeleteAuditorium,
  fetchAuditoriumById,
} from "../controller/addAuditorium.js";
import { protectProvider } from "../../middleware/ProtectProvider.js";
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

const router = express.Router();

//Auditoruim
router.post(
  "/addAuditorium",
  protectProvider,
  upload.array("images", 10), // <--- MUST use .array("images") for multiple files
  AddAuditorium
);

router.get("/fecthAuditorium", verifyToken, fetchAuditorium);
router.get("/fecthAuditorium/:id", verifyToken, fetchAuditoriumById);

router.put(
  "/editAuditorium/:id",
  protectProvider,
  upload.array("images", 10),
  editAuditorium
);

router.delete("/delete-auditorium/:id",protectProvider, DeleteAuditorium);

//Catering

router.post(
  "/addCatering",
  protectProvider,
  upload.array("images", 10), // <--- MUST use .array("images") for multiple files
  AddCateringService
);
router.get("/fetchCatering", verifyToken, fetchCatering);
router.get("/fetchCatering/:id", verifyToken, fetchCateringById);

router.put(
  "/editCatering/:id",
  protectProvider,
  upload.array("images", 10), // <--- MUST use .array("images") for multiple files
  editCatering
);
router.delete("/delete-catering/:id", protectProvider, DeleteCatering);

//Decoration And Stages

router.post(
  "/addstage-decoration",
  protectProvider,
  upload.array("images", 10), // <--- MUST use .array("images") for multiple files
  AddDecorationService
);

router.get("/fetchDeceration", verifyToken, fetchDecorationServices);
router.get("/fetchDeceration/:id", verifyToken, fetchDecorationServiceById);

router.put(
  "/editDeceration/:id",
  protectProvider,
  upload.array("images", 10), // <--- MUST use .array("images") for multiple files
  editDecorationService
);

router.delete("/delete-deceration/:id", protectProvider, deleteDecorationService);

//Photography

router.post(
  "/addPhotography",
  protectProvider,
  upload.array("images", 10), // <--- MUST use .array("images") for multiple files
  AddPhotographyService
);

router.get("/fetchPhotography", verifyToken, fetchPhotographyServices);
router.get("/fetchPhotography/:id", verifyToken, fetchPhotographyById);

router.put(
  "/editPhotography/:id",
  protectProvider,
  upload.array("images", 10), // <--- MUST use .array("images") for multiple files
  editPhotographyService
);

router.delete("/delete-photography/:id", protectProvider, deletePhotographyService);

export default router;
