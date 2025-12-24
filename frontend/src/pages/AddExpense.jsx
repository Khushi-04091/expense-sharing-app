import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function AddExpense() {
  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState("");
  const [amount, setAmount] = useState("");
  const [splitType, setSplitType] = useState("EQUAL");
  const [values, setValues] = useState({});

  const navigate = useNavigate();

  const selectedGroup = groups.find(g => g._id === groupId);
  const members = selectedGroup ? selectedGroup.members : [];

  useEffect(() => {
    const fetchGroups = async () => {
      const res = await api.get("/groups");
      setGroups(res.data);
    };
    fetchGroups();
  }, []);

  const handleSubmit = async () => {
    if (!groupId || !amount) {
      alert("Please fill all fields");
      return;
    }

    await api.post("/expenses", {
      groupId,
      amount: Number(amount),
      paidBy: selectedGroup.createdBy,
      splitType,
      values
    });

    navigate("/dashboard");
  };

  return (
    <div className="page-bg bg-add-expense">
      <div className="card">
        <h2>Add Expense</h2>

        {/* GROUP SELECT */}
        <select value={groupId} onChange={(e) => setGroupId(e.target.value)}>
          <option value="">Select Group</option>
          {groups.map((g) => (
            <option key={g._id} value={g._id}>
              {g.name}
            </option>
          ))}
        </select>

        {/* AMOUNT */}
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* SPLIT TYPE */}
        <select
          value={splitType}
          onChange={(e) => setSplitType(e.target.value)}
        >
          <option value="EQUAL">Equal</option>
          <option value="EXACT">Exact</option>
          <option value="PERCENT">Percentage</option>
        </select>

        {/*  CONDITIONAL SPLIT UI */}
        {splitType !== "EQUAL" && members.length > 0 && (
          <div>
            <h4>
              {splitType === "EXACT"
                ? "Enter exact amounts"
                : "Enter percentages"}
            </h4>

            {members.map((m) => (
              <div key={m._id}>
                <label>{m.name}</label>
                <input
                  type="number"
                  placeholder={splitType === "EXACT" ? "Amount" : "%"}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      [m._id]: Number(e.target.value)
                    })
                  }
                />
              </div>
            ))}
          </div>
        )}

        <button onClick={handleSubmit}>Add Expense</button>
      </div>
    </div>
  );
}

export default AddExpense;
