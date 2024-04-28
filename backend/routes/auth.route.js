import express from "express";

const router = express.Router();
import { signup, verifyUser } from "../controllers/auth.controller.js";

router.post("/signup", signup);
router.get("/verify", verifyUser);

export default router;
