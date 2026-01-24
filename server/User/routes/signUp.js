import express from "express";
import { signup} from "../controller/Auth/SignUp.js"
import {adminSignup } from "../controller/Auth/AdminSignUp.js"

const router = express.Router();

router.post("/signup", signup);
router.post("/adminsignup", adminSignup);

export default router;
