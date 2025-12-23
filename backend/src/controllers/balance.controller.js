import Expense from "../models/Expense.js";

export const getMyBalance = async (req, res) => {
  try {
    const userId = req.user;

const expenses = await Expense.find({ isSettled: false }).lean();


    let youOwe = 0;
    let youGet = 0;

    for (const exp of expenses) {
      for (const s of exp.splits) {
        if (String(s.userId) === String(userId)) {
          if (String(exp.paidBy) !== String(userId)) {
            youOwe += s.amount;
          }
        }

        if (String(exp.paidBy) === String(userId)) {
          if (String(s.userId) !== String(userId)) {
            youGet += s.amount;
          }
        }
      }
    }

    res.json({
      youOwe,
      youGet,
      net: youGet - youOwe
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

