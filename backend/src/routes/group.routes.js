
import express from "express";
import auth from "../middlewares/auth.middleware.js";
import {
  createGroup,
  getGroups,
  addMemberToGroup
} from "../controllers/group.controller.js";

const router = express.Router();

router.post("/", auth, createGroup);
router.get("/", auth, getGroups);
router.post("/add-member", auth, addMemberToGroup);

export default router;

