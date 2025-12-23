import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
<button
  onClick={() => {
    api.get("/groups").then((res) => setGroups(res.data));
  }}
>
  Refresh Groups
</button>

function AddExpense() {
  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState("");
  const [amount, setAmount] = useState("");
  const [splitType, setSplitType] = useState("EQUAL");
  const [values, setValues] = useState({});


  const navigate = useNavigate();
  const selectedGroup = groups.find(g => g._id === groupId);
const members = selectedGroup ? selectedGroup.members : [];


  // fetch groups for dropdown
 useEffect(() => {
  const fetchGroups = async () => {
    const res = await api.get("/groups");
    console.log("GROUPS FROM API 👉", res.data); // 👈 YAHAN
    setGroups(res.data);
  };

  fetchGroups();
}, []);



  const handleSubmit = async () => {
    if (!groupId || !amount) {
      alert("Please fill all fields");
      return;
    }

    const selectedGroup = groups.find((g) => g._id === groupId);

await api.post("/expenses", {
  groupId,
  amount: Number(amount),
  paidBy: selectedGroup.createdBy,
  splitType,
  values
});

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



    alert("Expense added successfully");
    navigate("/dashboard");
  };

  return (
  <div style={{ padding: "20px", maxWidth: "400px" }}>
    <h2>Add Expense</h2>

    {/* Group */}
    <label>Group</label>
    <br />
    <select
  value={groupId}
  onChange={(e) => setGroupId(e.target.value)}
  style={{ width: "100%", padding: "8px" }}
>
  <option value="" disabled>
    -- Select Group --
  </option>

  {groups.map((g) => (
    <option key={g._id} value={g._id}>
      {g.name}
    </option>
  ))}
</select>


    {/* Amount */}
    <label>Amount</label>
    <br />
    <input
      type="number"
      placeholder="Enter amount"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      style={{
        width: "100%",
        padding: "8px",
        marginTop: "5px",
        marginBottom: "15px"
      }}
    />

    {/* Split Type */}
    <label>Split Type</label>
    <br />
    <select
      value={splitType}
      onChange={(e) => setSplitType(e.target.value)}
      style={{
        width: "100%",
        padding: "8px",
        marginTop: "5px",
        marginBottom: "20px"
      }}
    >
      <option value="EQUAL">Equal</option>
      <option value="EXACT">Exact</option>
      <option value="PERCENT">Percentage</option>
    </select>

    <button
      onClick={handleSubmit}
      style={{
        padding: "10px",
        width: "100%",
        cursor: "pointer"
      }}
    >
      Add Expense
    </button>
  </div>
);

}

export default AddExpense;


    