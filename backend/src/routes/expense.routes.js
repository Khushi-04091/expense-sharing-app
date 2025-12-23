import express from "express";
import auth from "../middlewares/auth.middleware.js";

import {
  addExpense,
  getGroupExpenses,
  settleExpense
} from "../controllers/expense.controller.js";

const router = express.Router();

// add expense
router.post("/", auth, addExpense);

// get all expenses of a group
router.get("/group/:groupId", auth, getGroupExpenses);

// settle expense
router.post("/:expenseId/settle", auth, settleExpense);

export default router;
