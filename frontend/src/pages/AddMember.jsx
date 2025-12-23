import { useEffect, useState } from "react";
import api from "../api/api";

function AddMember() {
  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    api.get("/groups").then((res) => {
      setGroups(res.data);
      if (res.data.length > 0) {
        setGroupId(res.data[0]._id);
      }
    });
  }, []);

  const handleAdd = async () => {
    if (!groupId || !email) {
      alert("Fill all fields");
      return;
    }

    await api.post("/groups/add-member", {
      groupId,
      email
    });

    alert("Member added successfully");
    setEmail("");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Add Member</h2>

      <label>Group</label>
      <select
        value={groupId}
        onChange={(e) => setGroupId(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      >
        {groups.map((g) => (
          <option key={g._id} value={g._id}>
            {g.name}
          </option>
        ))}
      </select>

      <label>User Email</label>
      <input
        placeholder="Enter user email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "15px" }}
      />

      <button onClick={handleAdd} style={{ width: "100%", padding: "10px" }}>
        Add Member
      </button>
    </div>
  );
}

export default AddMember;
