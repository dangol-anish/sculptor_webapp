import express from "express";
const router = express.Router();
import {
  signin,
  signout,
  signup,
  verifyUser,
  google,
} from "../controllers/auth.controller.js";

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/verify", verifyUser);
router.get("/signout", signout);
router.post("/google", google);

export default router;
