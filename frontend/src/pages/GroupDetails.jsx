import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

function GroupDetails() {
  const { groupId } = useParams();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    api.get(`/expenses/group/${groupId}`).then((res) => {
      setExpenses(res.data);
    });
  }, [groupId]);

  const handleSettle = async (expenseId) => {
    await api.post(`/expenses/${expenseId}/settle`);
    alert("Expense settled");

    const res = await api.get(`/expenses/group/${groupId}`);
    setExpenses(res.data);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h2>Group Expenses</h2>

      {expenses.length === 0 && <p>No expenses yet</p>}

      {expenses.map((exp) => (
        <div
          key={exp._id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "12px",
            borderRadius: "6px"
          }}
        >
          <p>
            <b>Paid by:</b> {exp.paidBy.name} — ₹{exp.amount}
          </p>

          <p><b>Split:</b></p>
          <ul>
            {exp.splits.map((s, i) => (
              <li key={i}>
                {s.userId.name} owes ₹{s.amount}
              </li>
            ))}
          </ul>

          {/* ✅ SETTLE UP LOGIC — CORRECT PLACE */}
          {!exp.isSettled ? (
            <button
              onClick={() => handleSettle(exp._id)}
              style={{ marginTop: "8px" }}
            >
              Settle Up
            </button>
          ) : (
            <p style={{ color: "green", marginTop: "8px" }}>
              ✔ Settled
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default GroupDetails;


