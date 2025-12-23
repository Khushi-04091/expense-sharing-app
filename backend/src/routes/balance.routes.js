import express from "express";
import auth from "../middlewares/auth.middleware.js";
import { getMyBalance } from "../controllers/balance.controller.js";

const router = express.Router();

router.get("/me", auth, getMyBalance);

export default router;

