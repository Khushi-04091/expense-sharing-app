import { useEffect, useState } from "react";
import api from "../api/api";

function AddMember() {
  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState("");
  const [email, setEmail] = useState("");

  // 🔹 Fetch all groups
  useEffect(() => {
    const fetchGroups = async () => {
      const res = await api.get("/groups");
      setGroups(res.data);
    };

    fetchGroups();
  }, []);

  // 🔹 Add member handler
  const handleAdd = async () => {
    if (!groupId || !email) {
      alert("Please fill all fields");
      return;
    }

    try {
      await api.post("/groups/add-member", {
        groupId,
        email
      });

      alert("Member added successfully");
      setEmail("");
      setGroupId("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add member");
    }
  };

  return (
    <div className="add-member-page">
      <div className="card">
        <h2>Add Member</h2>

        {/* ✅ Email input */}
        <input
          type="email"
          placeholder="Member Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* ✅ Group dropdown */}
        <select
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
        >
          <option value="">Select Group</option>

          {groups.map((group) => (
            <option key={group._id} value={group._id}>
              {group.name}
            </option>
          ))}
        </select>

        {/* ✅ Button */}
        <button onClick={handleAdd}>Add Member</button>
      </div>
    </div>
  );
}

export default AddMember;


