import express from "express";
const router = express.Router();
import { dashboard } from "../controllers/dashboard.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

router.get("/", verifyToken, dashboard);

export default router;
