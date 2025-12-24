
import Expense from "../models/Expense.js";
import Group from "../models/Group.js";



export const addExpense = async (req, res) => {
  try {
    const { groupId, amount, paidBy, splitType, values = {} } = req.body;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    const members = group.members;
    let splits = [];

    if (splitType === "EQUAL") {
      const perHead = amount / members.length;
      splits = members.map((id) => ({
        userId: id,
        amount: perHead
      }));
    }

    if (splitType === "EXACT") {
      const total = Object.values(values).reduce((a, b) => a + b, 0);
      if (total !== amount) {
        return res.status(400).json({ message: "Exact split mismatch" });
      }

      splits = Object.entries(values).map(([userId, val]) => ({
        userId,
        amount: val
      }));
    }

    if (splitType === "PERCENT") {
      const totalPercent = Object.values(values).reduce((a, b) => a + b, 0);
      if (totalPercent !== 100) {
        return res.status(400).json({ message: "Percent must sum to 100" });
      }

      splits = Object.entries(values).map(([userId, percent]) => ({
        userId,
        amount: (amount * percent) / 100
      }));
    }

    const expense = await Expense.create({
      groupId,
      amount,
      paidBy,
      splitType,
      splits
    });

    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

    


export const getGroupExpenses = async (req, res) => {
  try {
    const { groupId } = req.params;

    const expenses = await Expense.find({ groupId })
      .populate("paidBy", "name email")
      .populate("splits.userId", "name email")
      .sort({ createdAt: -1 });

    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const settleExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;

    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    expense.isSettled = true;
    expense.settledAt = new Date();
    await expense.save();

    res.json({ message: "Expense settled", expense });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
