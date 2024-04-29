import express from "express";

const router = express.Router();
import { signin, signup, verifyUser } from "../controllers/auth.controller.js";

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/verify", verifyUser);

export default router;
