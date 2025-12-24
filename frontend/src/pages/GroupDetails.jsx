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
  <div className="page-bg bg-view-groups">
    <div className="card" style={{ width: "100%", maxWidth: "700px" }}>
      <h2>Group Expenses</h2>

      {expenses.length === 0 && (
        <p>No expenses yet</p>
      )}

      {expenses.map((exp) => (
        <div
          key={exp._id}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "14px",
            marginBottom: "16px"
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

          {!exp.isSettled && (
            <button
              style={{ width: "auto", marginTop: "8px" }}
              onClick={async () => {
                await api.post(`/expenses/${exp._id}/settle`);
                const res = await api.get(
                  `/expenses/group/${groupId}`
                );
                setExpenses(res.data);
              }}
            >
              Settle Up
            </button>
          )}

          {exp.isSettled && (
            <p
              style={{
                color: "green",
                marginTop: "8px",
                fontWeight: "600"
              }}
            >
              ✔ Settled
            </p>
          )}
        </div>
      ))}
    </div>
  </div>
);

}

export default GroupDetails;


