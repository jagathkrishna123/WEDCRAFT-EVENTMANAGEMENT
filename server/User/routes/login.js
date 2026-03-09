import express from "express";
import { Login } from "../controller/Auth/login.js";
import { getProfile } from "../controller/Auth/getProfile.js";
import { verifyToken } from "../../middleware/verifyToken.js";

const router = express.Router();

router.post("/login", Login);
router.get("/get-profile", verifyToken, getProfile);

export default router;
